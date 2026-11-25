// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const projectRoot = __dirname;

// Exclude project-root native build outputs & exported dist folders from Metro file crawling
// (Anchored to projectRoot so node_modules/*/dist is NEVER blocked!)
config.resolver = config.resolver || {};
config.resolver.blockList = [
  new RegExp(`^${escapeRegExp(path.join(projectRoot, 'android', '.gradle'))}[/\\\\].*`),
  new RegExp(`^${escapeRegExp(path.join(projectRoot, 'android', 'build'))}[/\\\\].*`),
  new RegExp(`^${escapeRegExp(path.join(projectRoot, 'android', 'app', 'build'))}[/\\\\].*`),
  new RegExp(`^${escapeRegExp(path.join(projectRoot, 'ios', 'build'))}[/\\\\].*`),
  new RegExp(`^${escapeRegExp(path.join(projectRoot, 'dist'))}[/\\\\].*`),
];

module.exports = config;
