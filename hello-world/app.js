// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

const DbQuery = require("./db/dbCrud");
const dbQuery = new DbQuery();


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
       
        const moduleName = event.module;
        const jobName = event.jobName;
        const userId = event.userId;
        const userPw = event.userPw;
        const uuid = event.id;

        const urlEncodedName = encodeURIComponent(event.userName);
        const userPhone = event.userPhone;
        const userSsn = event.userSsn;

        let scrapResult;
        let response;
        if(moduleName == "lgUplus"){
            const lgUplus = require("./modules/lguplus");

            scrapResult = await lgUplus.prototype.로그인(userId, userPw);
            console.log('scrapResult["status"]: '+ scrapResult["status"])
            if(scrapResult["status"] ==200){
                scrapResult = await lgUplus.prototype.통신요금조회();
                console.log("scrapResult: "+ JSON.stringify(scrapResult));

                if(scrapResult["status"] == 200){
                    console.log("통신요금조회 성공");
                    console.log(scrapResult);
                }
            }else{
                console.log("lguplus 로그인 실패");
                

            }

        }else if(moduleName == "msafe"){
            const msafeModuel = require("./modules/msafe");
            scrapResult = await msafeModuel.prototype.간편로그인(urlEncodedName, userPhone, userSsn);
        }

        /*
         scrapResult 
          staus : 200,300, 400.. -> 마지막 통신에 대한 결과 전달 
          id: API Gateway에서 전달하는 uuid 
          data: 스크래핑 가져오는 데이터 결과
        */
        scrapResult["id"] = event.id;
        console.log(scrapResult["id"]);
        
        let dbResult;
        if(scrapResult['status']==200 && typeof(scrapResult['data'])!='string'){
            console.log("Success Scrapging")
            /**
             * 
             * dbResult 결과 
             *  200 - insert 성공 
             *  400 - insert 실패
             */
            dbResult = dbQuery.insert(scrapResult);


        }


        // msafer는 오래걸리는 scraping : API Gateway에서 502만 return하기 때문에 여기까지 못옴 
        // lguplus 같은 경우는 빠른 스크래핑이 가능 따라서 바로 return이 가능
        response = scrapResult;
    
       
    } catch (err) {
        console.log("app.js Error ")
        console.log(err);
        return err;
    }

    return response
};


