const path = require("path");
const {Stack, Duration} = require('aws-cdk-lib');
const {DockerImageFunction, DockerImageCode} = require('aws-cdk-lib/aws-lambda');
const {Bucket} = require('aws-cdk-lib/aws-s3');


class PuppeteerScreenshotStack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const bucket = new Bucket(this, 'PuppeteerScreenshotBucket');
        const func = new DockerImageFunction(this, "PuppeteerScreenshotFunction", {
            code: DockerImageCode.fromImageAsset(path.join(__dirname, "../image")),
            timeout: Duration.seconds(20),
            memorySize: 1024, // 1 gigabyte
            environment: {
                SCREENSHOT_BUCKET: bucket.bucketName
            }
        });

        bucket.grantPut(func);
    }
}

module.exports = {PuppeteerScreenshotStack}
