#!/usr/bin/env node

const { createTodayNotionPage } = require('./notion');

(async () => {
  await createTodayNotionPage();
})();