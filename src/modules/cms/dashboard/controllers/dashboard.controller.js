dasboardService = require('../services/dashboard.service');


class DashboardController {
  async getQuote(req) {
    const data = await dasboardService.getQuote();
    return { data };
  }
}

module.exports = new DashboardController();