'use strict';

const User = use('App/Models/Category');

class UserRepository {

  async find(id) {
    return await Category.find(id)
  }

  async getSites(id) {
    return await Category.where('id', id).posts().fetch()
  }

  async  getCategories() {
    return await Category.all();
  }

  async addCategory(data) {
    let category = new Category();
    category.label = data.label;
    await category.save();
    return this.getCategories();
  }

}

module.exports = CategoryRepository;
