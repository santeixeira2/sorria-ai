// @ts-check
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Monorepo root
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// Resolve modules from both the project and workspace root node_modules
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ],
};

// Avoid clashes with other Metro apps on 8081
config.server = { ...config.server, port: 8091 };

module.exports = config;
