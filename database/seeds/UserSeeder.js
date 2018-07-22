'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory');
const Database = use('Database');

class UserSeeder {
  async run () {
    const user = await Factory.model('App/Models/User').create();
    await user.save();
  }
}

module.exports = UserSeeder;
