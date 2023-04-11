#!/usr/bin/env node

const { Client } = require('@notionhq/client');
require('dotenv').config();

function formatDate(date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();

  const formattedDate = `${day} ${monthsOfYear[month]}, ${daysOfWeek[dayOfWeek]}, ${year}`;
  return formattedDate;
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const currentDate = new Date();
const formattedDate = formatDate(currentDate);


(async () => {
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
})();