import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

const prisma = new PrismaClient();
const pubsub = new PubSub();

export interface GraphQLContext {
  prisma: PrismaClient;
  pubsub: PubSub;
}

export function createContext(): GraphQLContext {
  return { prisma, pubsub };
}

export { prisma, pubsub };
