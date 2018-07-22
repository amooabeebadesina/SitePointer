'use strict';

const Category = use('App/Models/Category');

class CategoryRepository {

  async getCategory(id) {
    return await Category.query().where('id', id).with('sites').first()
  }

  async getSites(id) {
    return await Category.where('id', id).posts().fetch()
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
