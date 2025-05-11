const { BadRequestException } = require('@helpers/exception');
const axios = require('axios');

class NinjaApiService {
  constructor() {
    this._quotesApiPath = '/v1/quotes';
  }

  async getQuote(){
    const response = await axios.get(
      `${process.env.API_NINJA_URL}${this._quotesApiPath}`,
      {
        headers: {
          'X-Api-Key': process.env.API_NINJA_KEY,
          'Content-Type': 'application/json',
        },
        timeout: 3000,
      },
    ).then((response) => {
      console.log('✅ Fetch success:', response.data);
      return response.data;
    }).catch((error) => {
      console.error('❌ Fetch failed:', error);
      throw new BadRequestException('Failed to fetch quote');
    });

    return response;
  }

}

module.exports = new NinjaApiService();
