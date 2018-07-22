'use strict';

const Site = use('App/Models/Site');

class SiteRepository {

  async sitesCount() {
    return await Site.getCount();
  }

}

module.exports = SiteRepository;
