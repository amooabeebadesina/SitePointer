'use strict';

const Site = use('App/Models/Site');

class SiteRepository {

  async sitesCount() {
    return await Site.getCount();
  }

  async addSite(data) {
    let site = new Site();
    site.category_id = data.category;
    site.description = data.description.length < 1 ? null : data.description;
    site.label = data.label;
    site.image_url = data.secure_url;
    site.url = data.url;
    await site.save();
  }

}

module.exports = SiteRepository;
