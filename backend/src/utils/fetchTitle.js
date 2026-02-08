const axios = require("axios");
const cheerio = require("cheerio");

async function fetchTitle(url) {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(response.data);
    const title = $("title").first().text().trim();
    return title || null;
  } catch {
    return null;
  }
}

module.exports = { fetchTitle };
