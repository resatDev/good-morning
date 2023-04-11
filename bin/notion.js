const { formatDate } = require('./utils');
const { Client } = require('@notionhq/client');
const dotEnv = require('dotenv');
dotEnv.config();

async function createTodayNotionPage() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const today = new Date();
  const formattedDate = formatDate(today);

  try {
    await notion.pages.create({ 
      "parent": {
        "type": "page_id",
        "page_id": process.env.NOTION_DAILY_PAGE_ID,
      },
      "icon": {
        "type": "external",
        "external": {
          "url": "https://www.notion.so/icons/airplane_blue.svg?mode=light"
        }
      },
      "properties": {
        "title": [{
            "text": {
              "content": formattedDate
            }
          }
        ]
      }});
      console.log('A notion page was created for Today:', formattedDate);
    } catch (e) {
      console.log('hobaaa', e);
    }
}

module.exports = {
  createTodayNotionPage
};