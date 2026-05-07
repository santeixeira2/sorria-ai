import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import type { GraphQLContext } from '../context.js';
import { prisma } from '../context.js';

export const builder = new SchemaBuilder<{
  Context: GraphQLContext;
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

// Initialize Query, Mutation, and Subscription root types
builder.queryType({});
builder.mutationType({});
builder.subscriptionType({});
