'use strict';

const Category = use('App/Models/Category');
const Site = use('App/Models/Site');

class CategoryRepository {

  async getCategory(id) {
    return await Category.query().where('id', id).with('sites').first()
  }

  async getSites(data) {
    return await Site.query().where('category_id', data.id).paginate(data.page, data.perPage)
  }

  async  getCategories() {
    return await Category.all();
  }

  async categoriesCount() {
    return await Category.getCount();
  }

  async addCategory(data) {
    let category = new Category();
    category.label = data.label;
    await category.save();
    return this.getCategories();
  }

}

module.exports = CategoryRepository;
