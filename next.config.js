const withPlugins = require("next-compose-plugins");
const withImages = require('next-images');
const withSass = require('@zeit/next-sass')

module.exports = withPlugins([[withSass({
}), withImages()]]);
