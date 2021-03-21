const withPlugins = require("next-compose-plugins");
const withImages = require('next-images');
const withSass = require('@zeit/next-sass')

module.exports = withPlugins([[withSass({
  distDir: "_next",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  }
}), withImages()]]);