const checkLinkId = (id) => {
  let numberAndStringR = "^(?![A-Za-z]+$)[0-9A-Za-z]+$";
  let stringR = "^[a-zA-Z]+$";
  return id.match(numberAndStringR) || id.match(stringR)
}

module.exports = {
  checkLinkId
}