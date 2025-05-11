function circularToJSON(circular) {
  return JSON.parse(JSON.stringify(circular));
}

module.exports = circularToJSON;