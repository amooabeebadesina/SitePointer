'use strict';

const Category = use('App/Models/Category');
const Site = use('App/Models/Site');
const Database = use('Database');

class CategoryRepository {

  async getCategory(id) {
    return await Category.query().where('id', id).with('sites').first()
  }

  async getSites(data) {
    return await Database.from('sites').whereExists(function () {
        this.from('categories').where('categories.label', data.label.toLowerCase())
    }).paginate(data.page, data.perPage);
  }

  async  getCategories() {
    return await Category.all();
  }

  async categoriesCount() {
    return await Category.getCount();
  }

  async addCategory(data) {
    let category = new Category();
    category.label = data.label.toLowerCase();
    await category.save();
    return this.getCategories();
  }

}

module.exports = CategoryRepository;
