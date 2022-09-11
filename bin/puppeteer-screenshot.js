#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { PuppeteerScreenshotStack } = require('../lib/puppeteer-screenshot-stack');

const app = new cdk.App();
new PuppeteerScreenshotStack(app, 'PuppeteerScreenshotStack', {});
