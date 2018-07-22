'use strict';

class BaseController {

  constructor() {

  }

  sendSuccess(data) {
    return {
      status: 'success',
      data: data
    };
  }

  sendError(data) {
    return {
      status: 'error',
      data: data
    };
  }
}

module.exports = BaseController;
