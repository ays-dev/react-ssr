/**
 * Configuration Error
 */

export class ConfigurationError extends Error {
  constructor(message, name = 'ConfigurationError') {
    super(`ConfigurationError: ${message}`);
    this.name = name;
  }
}

export class EnvironmentError extends ConfigurationError {
  constructor(environment, message) {
    super(`${environment} ${message}`);
    this.environment = environment;
  }
}

/**
 * HTTP Error
 */

export class HttpError extends Error {
  constructor(message, code, errors, name = 'HttpError') {
    super(message);
    this.code = code;
    this.errors = errors;
    this.name = name;
    this.stack = new Error(message).stack;
  }
}

export class NotFoundError extends HttpError {
  constructor(name) {
    super(`${name} not found`, 404);
  }
}
