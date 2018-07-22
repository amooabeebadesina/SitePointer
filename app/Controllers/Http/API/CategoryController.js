'use strict';

const CategoryRepository = use('App/Repositories/CategoryRepository');
const BaseController = use('App/Controllers/Http/BaseController');

class CategoryController extends BaseController {

  constructor () {
    super();
    this.categoryRepo = CategoryRepository;
  }

  async index () {
    const catRepo = new CategoryRepository();
    return this.sendSuccess(await catRepo.getCategories());
  }

}

module.exports = CategoryController;
