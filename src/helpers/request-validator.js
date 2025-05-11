const { ValidationError } = require('@helpers/exception');

function validateRequest(
  RequestClass, 
  body, 
  options = {
    recursive: false,
  }) {
  let  errors = [];
  let validate = true;
  const rules = RequestClass.rules;
  Object.entries(rules).forEach(([key, rule]) => {
    const value = body[key];

    // Skip if not required and empty
    if (!rule.required && (value === undefined || value === null || value === '')) {
      return;
    }

    // Required check
    if (rule.required && (value === undefined || value === null || value === '' || value.length === 0)) {
      errors.push({ field: key, message: `${key} is required` });
      return;
    }

    // Type checks
    switch (rule.type) {
    case 'string':
      if (typeof value !== 'string') {
        errors.push({ field: key, message: `${key} must be a string` });
      }

      // Max length
      if (value.length > rule.maxLength) {
        errors.push({
          field: key,
          message: `${key} must not exceed ${rule.maxLength} characters`,
        });
      }
      break;

    case 'email':
      if (
        typeof value !== 'string' ||
            !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
      ) {
        errors.push({
          field: key,
          message: `${key} must be a valid email address`,
        });
      }
      break;

    case 'password':
      if (typeof value !== 'string' || value.length < 6) {
        errors.push({
          field: key,
          message: `${key} must be a valid password (min 6 characters)`,
        });
      }
      break;

    case 'number':
      if (typeof value !== 'number') {
        errors.push({ field: key, message: `${key} must be a number` });
      }
      break;

    case 'boolean':
      if (typeof value !== 'boolean') {
        errors.push({ field: key, message: `${key} must be a boolean` });
      }
      break;

    case 'array':
      if (!Array.isArray(value)) {
        errors.push({ field: key, message: `${key} must be an array` });
      } else if (rule.itemType === 'number') {
        value.forEach((item, index) => {
          if (typeof item !== 'number') {
            errors.push({
              field: `${key}[${index}]`,
              message: `Item at index ${index} of ${key} must be a number`,
            });
          }
        });
      } else if (rule.itemType === 'custom'){
        value.forEach((item, index) => {
          const result = validateRequest(
            rule.itemRule, 
            item, 
            {recursive: true},
          );  
          console.log('result', result);
          if(!result.validate){
            errors = [...errors, {
              fields: `${key}[${index}]`,
              message: `Invalid item at ${key}[${index}]`,
              errors: result.errors,
            }];
          }
             
          
        });
      }
      break;

    case 'enum':
      if (!rule.enumType || !Array.isArray(rule.enumType)) {
        errors.push({
          field: key,
          message: `${key} enumType is not defined correctly`,
        });
      } else if (!rule.enumType.includes(value)) {
        errors.push({
          field: key,
          message: `${key} must be one of: ${rule.enumType.join(', ')}`,
        });
      }
      break;

    default:
      break;
    }
  });

  if (errors.length > 0) {
    validate = false;
    if(options.recursive) {
      return {
        validate,
        errors,
      };
    }
    throw new ValidationError('Invalid request body', errors);
  }

  const instance = new RequestClass();

  /** assign only key class request */
  const keys = Object.keys(RequestClass.rules);
  keys.forEach((key) => {
    instance[key] = body[key];
  });
  console.log('instance', instance);
  /** end of assign only key class request */
  // Object.assign(instance, body);
  if(options.recursive){
    return { validate, instance};
  }
  return instance;
}

module.exports = validateRequest;
