const { parseSequelizeQuery } = require('@helpers/sequelize-query');
const validateRequest = require('@helpers/request-validator');


const todoService = require('../services/todo.service');
const TodoFilter = require('./filters/todo.filter');
const {TodoRequest, TodoStatusRequest} = require('./request/todo.request');
const getLoggedUser = require('@helpers/user-session');

class TodoController {
  async findAll(req) {
    const admin = getLoggedUser(req);
    const queryOptions = parseSequelizeQuery(req, TodoFilter, admin.id);
    return todoService.findAll(queryOptions);
  }

  async findOne(req, id) {
    const data = await todoService.findOne(id);
    return {data};
  }

  async create(req) {
    const admin = getLoggedUser(req);
    const dto = validateRequest(TodoRequest, req.body);
    return todoService.create({...dto, userId: admin.id});
  }

  async update(req, id){
    const dto = validateRequest(TodoRequest, req.body);
    console.log('dto', dto);
    return todoService.update(dto, id);
  }

  async updateStatus(req, id){
    const dto = validateRequest(TodoStatusRequest, req.body);
    return todoService.update(dto, id);
  }

  async destroy(req, id){
    return todoService.destroy(id);
  }
}

module.exports = new TodoController();
