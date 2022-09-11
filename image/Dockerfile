FROM amazon/aws-lambda-nodejs:16

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION=us-east-1

# Install Chrome to get all of the dependencies installed
RUN yum install -y amazon-linux-extras
RUN amazon-linux-extras install epel -y
RUN yum install -y chromium

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION

COPY package.json package-lock.json ${LAMBDA_TASK_ROOT}/

RUN npm install

COPY app.js ${LAMBDA_TASK_ROOT}/

CMD [ "app.handler" ]
