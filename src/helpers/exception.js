// request validator
class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
    this.status = 400;
  }
}

// http validator
class HttpException extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 4xx Client Errors
class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class PaymentRequiredException extends HttpException {
  constructor(message = 'Payment Required') {
    super(message, 402);
  }
}

class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

class MethodNotAllowedException extends HttpException {
  constructor(message = 'Method Not Allowed') {
    super(message, 405);
  }
}

class NotAcceptableException extends HttpException {
  constructor(message = 'Not Acceptable') {
    super(message, 406);
  }
}

class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

class GoneException extends HttpException {
  constructor(message = 'Gone') {
    super(message, 410);
  }
}

class UnsupportedMediaTypeException extends HttpException {
  constructor(message = 'Unsupported Media Type') {
    super(message, 415);
  }
}

class UnprocessableEntityException extends HttpException {
  constructor(message = 'Unprocessable Entity') {
    super(message, 422);
  }
}

class TooManyRequestsException extends HttpException {
  constructor(message = 'Too Many Requests') {
    super(message, 429);
  }
}

// 5xx Server Errors
class InternalServerErrorException extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}

class NotImplementedException extends HttpException {
  constructor(message = 'Not Implemented') {
    super(message, 501);
  }
}

class BadGatewayException extends HttpException {
  constructor(message = 'Bad Gateway') {
    super(message, 502);
  }
}

class ServiceUnavailableException extends HttpException {
  constructor(message = 'Service Unavailable') {
    super(message, 503);
  }
}

class GatewayTimeoutException extends HttpException {
  constructor(message = 'Gateway Timeout') {
    super(message, 504);
  }
}

module.exports = {
  HttpException,
  BadRequestException,
  UnauthorizedException,
  PaymentRequiredException,
  ForbiddenException,
  NotFoundException,
  MethodNotAllowedException,
  NotAcceptableException,
  ConflictException,
  GoneException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  TooManyRequestsException,
  InternalServerErrorException,
  NotImplementedException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,

  ValidationError,
};
