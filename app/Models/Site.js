'use strict';

const Model = use('Model');

class Site extends Model {

  categories () {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Site;
