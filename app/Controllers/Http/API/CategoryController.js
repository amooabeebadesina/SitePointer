'use strict';

const CategoryRepository = use('App/Repositories/CategoryRepository');
const BaseController = use('App/Controllers/Http/BaseController');

class CategoryController extends BaseController {

  constructor () {
    super();
    this.categoryRepo = new CategoryRepository();
  }

  async index () {
    return this.sendSuccess(await this.categoryRepo.getCategories());
  }

  async getSites ({ request, response, params}) {
    const queryParams = request.get();
    const data = {
      label: params.label,
      perPage: queryParams.perPage ? queryParams.perPage : 10,
      page: queryParams.page ? queryParams.page : 1
    };
    return this.sendSuccess(await this.categoryRepo.getSites(data))
  }

}

module.exports = CategoryController;
