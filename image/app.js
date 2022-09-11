const s3 = require('@aws-sdk/client-s3');
const puppeteer = require('puppeteer');

const handler = async (event, context) => {
    if (typeof event['url'] !== 'string') {
        throw new Error("Missing or invalid 'url' property");
    }
    if (typeof event['viewport'] !== 'object') {
        throw new Error("Missing or invalid 'viewport' property");
    }
    if (typeof event['waitforoptions'] !== 'object') {
        throw new Error("Missing or invalid 'waitforoptions' property");
    }
    if (typeof event['screenshotoptions'] !== 'object') {
        throw new Error("Missing or invalid 'screenshotoptions' property");
    }
    const imageType = event['screenshotoptions']['type'] ?? 'png';
    const bucket = process.env.SCREENSHOT_BUCKET;
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            // https://github.com/adieuadieu/serverless-chrome/issues/316
            '--no-zygote',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process'
        ]
    });
    const browserVersion = await browser.version()
    console.log(`Started ${browserVersion}`);

    const page = await browser.newPage();
    await page.setViewport(event['viewport']);
    await page.goto(event['url'], event['waitforoptions']);
    const screenshot = await page.screenshot({...event['screenshotoptions'], encoding: 'binary', type: imageType});
    await page.close();
    await browser.close();

    const client = new s3.S3Client({});
    const key = `${context['awsRequestId']}.${imageType}`;
    const response = await client.send(new s3.PutObjectCommand({
        Bucket: bucket,
        Key: `${context['awsRequestId']}.${imageType}`,
        Body: screenshot,
        ContentType: `image/${imageType}`
    }))

    return {
        statusCode: 200,
        body: JSON.stringify({response, key, bucket})
    }
}

module.exports = {handler};
