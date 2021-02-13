const validUrl = require('valid-url')

const checkUrl = (reqUrl) => {
  const urlRegex = new RegExp('^(http|https)://')

  return !!(urlRegex.test(reqUrl) && validUrl.isUri(reqUrl))
};

module.exports = checkUrl
