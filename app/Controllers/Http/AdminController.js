'use strict';

const CategoryRepository = use('App/Repositories/CategoryRepository');
const SiteRepository = use('App/Repositories/SiteRepository');
const Category = use('App/Models/Category');
const CloudinaryService = use('App/Services/CloudinaryService');
const Site = use('App/Models/Site');

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
    console.log(category.toJSON());
    return view.render('dashboard.category', {category: category.toJSON()});
  }

  async addSite( {request, response, session}) {
    const {label, url, description, category} = request.all();
    const file = request.file('image');
    try {
      const result = await CloudinaryService.v2.uploader.upload(file.tmpPath, {folder: 'sitepointer'});
      if (result.hasOwnProperty('public_id')) {
        const secure_url = result.secure_url;
        const data = {
          label, url, description, category, secure_url
        };
        await this.siteRepo.addSite(data);
        session.flash({success: 'Successfully added site'});
        return response.redirect('back');
      }
    } catch (e) {
      session.flash({error: 'Error Uploading Image'});
      return response.redirect('/')
    }
  }
}

module.exports = AdminController;
