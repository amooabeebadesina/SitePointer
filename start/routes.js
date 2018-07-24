'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route');

Route
  .group(() => {
    Route.get('ping', 'API/GeneralController.ping');
    Route.get('categories', 'API/CategoryController.index');
    Route.get('categories/:label/sites', 'API/CategoryController.getSites')
  })
  .prefix('api/v1');

Route.get('/', 'AdminController.index');
Route.post('login', 'AdminController.login').as('login');
Route.get('logout', 'AdminController.logout').as('logout');

Route
  .group(() => {
    Route.get('/', 'AdminController.dashboard').as('dashboard');
    Route.get('categories', 'AdminController.categories').as('categories');
    Route.post('categories', 'AdminController.addCategory').as('categories.post');
    Route.delete('categories/:id', 'AdminController.deleteCategory').as('category.delete');
    Route.get('categories/:id', 'AdminController.getCategory').as('category.view');
    Route.post('sites', 'AdminController.addSite').as('sites.post');
  })
  .prefix('dashboard')
  .middleware(['auth:session']);
