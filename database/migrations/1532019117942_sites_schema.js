'use strict';

const Schema = use('Schema');

class SitesSchema extends Schema {
  up () {
    this.create('sites', (table) => {
      table.increments();
      table.string('image_url');
      table.string('label');
      table.string('url');
      table.text('description').nullable();
      table.integer('category_id').unsigned().index().references('id').inTable('categories').onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('sites')
  }
}

module.exports = SitesSchema
