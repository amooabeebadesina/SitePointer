'use strict';

const BaseController = use('App/Controllers/Http/BaseController');

class GeneralController extends BaseController {


  async ping () {
    const randomChar = Math.random().toString(36).substr(2, 5);
    const data = {up: randomChar};
    return this.sendSuccess(data)
  }

  async

}

module.exports = GeneralController;
