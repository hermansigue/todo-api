ninjaApiService = require('@modules/middleware/ninja-api/services/ninja-api.service');

class DashboardService {
  async getQuote() {
    
    const data = await ninjaApiService.getQuote();
    return data[0];
  }
}

module.exports = new DashboardService();