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

        const urlEncodedName = encodeURIComponent("정진우")
        const userPhone = "01082271995";
        const userSsn = "9306161268217";

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
