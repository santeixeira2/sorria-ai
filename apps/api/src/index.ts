import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { createContext, type GraphQLContext } from './context.js';
import { schema } from './schema/index.js';

const PORT = Number(process.env.PORT) || 4000;

async function main() {
  const app = express();
  const httpServer = createServer(app);

  // WebSocket server for GraphQL subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer(
    {
      schema,
      context: () => createContext(),
    },
    wsServer,
  );

  // Apollo Server
  const apollo = new ApolloServer<GraphQLContext>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apollo.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apollo, {
      context: async () => createContext(),
    }),
  );

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  httpServer.listen(PORT, () => {
    console.log(`\n🦷 Sorria AI GraphQL API`);
    console.log(`   Playground: http://localhost:${PORT}/graphql`);
    console.log(`   Subscriptions: ws://localhost:${PORT}/graphql`);
    console.log(`   Health: http://localhost:${PORT}/health\n`);
  });
}

main().catch(console.error);
