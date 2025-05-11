const { Op } = require('sequelize');
const BaseFilter = require('@filters/base.filter');

class TodoFilter extends BaseFilter {
  static build(query) {
    const base = this.baseQuery(query);
    const userId = query.userId || null;
    let where = {};
    let order = [];
    let include = [];
    let attributes = [
      'id',
      'title',
      'isActive',
      'status',
    ];
    include = this._include(include);
    where = this._filterUser(where, userId);
    if (query.filters) {
      if (query.filters.search) {
        where = this._filterSearch(where, query.filters.search);
      }

      if(query.filters.isActive){
        where = this._filterIsActive(where, query.filters.isActive);
      }

      if(query.filters.status){
        where = this._filterStatus(where, query.filters.status);
      }
    }

    order = this._orderCreatedAt(order, 'DESC');

    return {
      ...base,
      where,
      order,
      include,
      attributes,
    };
  }

  static _filterSearch(where, search) {
    return {
      ...where,
      [Op.or]: [
        { title: { [Op.iLike]: `%${search}%` } }
      ],
    };
  }

  static _filterIsActive(where, isActive) {
    return {
      ...where,
      isActive,
    };
  }

  static _filterStatus(where, status) {
    return {
      ...where,
      status,
    };
  }

  static _filterUser(where, userId) {
    return {
      ...where,
      userId,
    };
  } 

  static _include(includable){
    return [
      ...includable, 
      { association: 'user', attributes: ['id', 'name', 'email'] },
    ];
  }

  static _orderCreatedAt(order, mode = 'ASC') {
    return [...order, ['createdAt', mode]];
  }
}

module.exports = TodoFilter;