# CDK Screenshot (powered by Puppeteer)

Made possible by the excellent [Puppeteer](https://pptr.dev/).

## Install

```bash
export AWS_PROFILE=myprofile
export AWS_DEFAULT_REGION=us-east-1

# If this is your first time using CDK on this AWS account
npx cdk bootstrap

# Review stack before deploying
npx cdk synth

# Deploy (make sure Docker is running on your development machine)
npx cdk deploy
```

## Usage

This function is invoked by passing parameters directly into Puppeteer.

```json
{
  "url": "https://www.wikipedia.org/",
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "waitforoptions": {
    "timeout": 10000,
    "waitUntil": "networkidle2"
  },
  "screenshotoptions": {
    "fullPage": true
  }
}
```

- `"viewport"` https://pptr.dev/api/puppeteer.viewport/
- `"waitforoptions"` https://pptr.dev/api/puppeteer.waitforoptions
- `"screenshotoptions"` https://pptr.dev/api/puppeteer.screenshotoptions

The resulting screenshot will be saved to an S3 bucket. Sample output:

```json
{
  "response": {
    "$metadata": {
      "httpStatusCode": 200,
      "extendedRequestId": "etAXPmAcRodh+o3llGpSR5pUvW5bUlnQJlXLJ8nFgawxGjfF8gJwoCJ7BnIgvTAkBA0u/Ocq8P0=",
      "attempts": 1,
      "totalRetryDelay": 0
    },
    "ETag": "be375e15fdd474ca1421e852f5b1bf52"
  },
  "key": "3d6a714a-4e37-4a08-be6b-a58b632cfff7.png",
  "bucket": "puppeteerscreenshotstack-puppeteerscreenshotbucke-1nh0w9anigpwe"
}
```
