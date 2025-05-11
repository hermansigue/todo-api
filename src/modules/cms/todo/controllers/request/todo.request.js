const EStatusTodo = require('@enums/todo-status.enum');

class TodoRequest {
  constructor() {}
    
  static get rules() {
    return {
      title: {
        required: true,
        type: 'string',
        maxLength: 255,
      },
      isActive: {
        required: false,
        type: 'boolean',
      },
    };
  }
}

class TodoStatusRequest {
  constructor() {}
    
  static get rules() {
    return {
      status: {
        required: true,
        type: 'enum',
        enumType: Object.values(EStatusTodo),
      },
    };
  }
}
    
module.exports = {TodoStatusRequest, TodoRequest};
    

    