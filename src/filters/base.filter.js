class BaseFilter {
  static baseQuery(query) {
    const limit = parseInt(query.size) || 10;

    let offset = 0;

    if (query.page) {
      const page = parseInt(query.page);
      offset = (page - 1) * limit;
    } else if (query.offset) {
      offset = parseInt(query.offset);
    }

    return {
      limit,
      offset,
    };
  }
}

module.exports = BaseFilter;
