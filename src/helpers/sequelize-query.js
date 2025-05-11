function parseSequelizeQuery(req, filterClass, userId = null) {
  let { query } = req || {};

  if(userId) {
    query = {
      ...query,
      userId
    };
  }
  const filterResult = filterClass.build(query);

  return filterResult;
}

module.exports = { parseSequelizeQuery };
