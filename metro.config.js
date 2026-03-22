// @ts-check
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Avoid clashes with other Metro apps on 8081 — wrong port causes Expo Go "could not connect to server".
config.server = { ...config.server, port: 8091 };

module.exports = config;
