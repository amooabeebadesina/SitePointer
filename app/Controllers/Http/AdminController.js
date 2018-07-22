'use strict';

const CategoryRepository = use('App/Repositories/CategoryRepository');
const SiteRepository = use('App/Repositories/SiteRepository');
const Category = use('App/Models/Category');
const CloudinaryService = use('App/Services/CloudinaryService');

class AdminController {

  constructor() {
    this.categoryRepo = new CategoryRepository();
    this.siteRepo = new SiteRepository();
  }

  index({ view }) {
    return view.render('index');
  }

  async login ({ request, auth, session, response }) {
    const { email, password} = request.all();
    try {
      await auth.attempt(email, password);
      return response.route('dashboard');
    } catch (e) {
      session.flash({error: 'Invalid credentials'});
      return response.redirect('/')
    }
  }

  async dashboard({ response, view, request, auth }) {

    const data = {
      user: auth.user,
      categories: await this.categoryRepo.categoriesCount(),
      sites: await this.siteRepo.sitesCount()
    };
    return view.render('dashboard.index', data)
  }

  async logout ( { response, auth }) {
    await auth.logout();
    return response.route('/')
  }

  async categories( {response, auth, view}) {
    const categories = await this.categoryRepo.getCategories();
    return view.render('dashboard.categories', {categories: categories.toJSON()});
  }

  async addCategory({ request, response, auth, view }) {
    const label = request.input('label');
    let category = new Category;
    category.label = label;
    await category.save();
    return response.redirect('back')
  }

  async deleteCategory( {params, request, response}) {
    await Category.query().where('id', params.id).delete();
    return response.redirect('back')
  }

  async getCategory( {params, view }) {
    const category = await this.categoryRepo.getCategory(params.id);
    return view.render('dashboard.category', {category: category.toJSON()});
  }

  async addSite( {request, response}) {
    console.log(request.request.file)
   /* request.multipart.file('image', {}, async (file) => {
      CloudinaryService.uploader.upload(file.stream, async (result) => {
        console.log(result);
      })
    });

    await request.multipart.process()*/
  }
}

module.exports = AdminController;
