// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const msafeModuel = require("./modules/msafe");
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);


        const urlEncodedName = encodeURIComponent(event.userName);
        const userPhone = event.userPhone;
        const userSsn = event.userSsn;

        const scrapResult = await msafeModuel.prototype.간편로그인(urlEncodedName, userPhone, userSsn);

        response = {
            'statusCode': 200,
            'body': scrapResult["data"]
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
