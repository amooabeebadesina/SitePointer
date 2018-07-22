'use strict';

const Model = use('Model');

class Category extends Model {

  sites () {
    return this.hasMany('App/Models/Site')
  }
 }

module.exports = Category;
