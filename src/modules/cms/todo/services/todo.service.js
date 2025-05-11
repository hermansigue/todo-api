const db = require('@model');
const { Todo } = require('@model');
const EStatusTodo = require('@enums/todo-status.enum');
const { NotFoundException } = require('@helpers/exception');
const generatePaginationData = require('@helpers/meta-pagination');

class TodoService {
  async findAll(filters) {
    const {limit, offset} = filters;
    const {count, rows} = await Todo.findAndCountAll(filters);

    return {meta: generatePaginationData(count, limit, offset), data: rows};
  }

  async findOne(id) {
    const data = await Todo.findOne({
      where: { id },
      rejectOnEmpty: new NotFoundException('Todo Not Found'),
    });

    return data;
  }

  async create(dto) {
    const todo = await db.sequelize.transaction(async (transaction) => {
      const data = await Todo.create({...dto, isActive: true, status: EStatusTodo.TODO}, { transaction });
      return data;
    });
    return { message: 'Todo is created', data: todo };
  }

  async update(dto, id) {
    const todo = await this.findOne(id);
    const data = await db.sequelize.transaction(async (transaction) => {
      await todo.update(dto, {
        transaction,
      });
      
      return todo.reload({transaction});
    });
    return { message: 'Todo is updated', data };
  }

  async destroy(id) {
    const todo = await this.findOne(id);
    await db.sequelize.transaction(async (transaction) => {
      await todo.destroy({ where: { id }, transaction });
    });

    return { message: 'Todo is deleted' };
  }
}

module.exports = new TodoService();
