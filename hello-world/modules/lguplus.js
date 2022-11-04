const axios = require('axios');
const {cookieParser} = require('../common/commonFunc');
// this.host = "";
// this.cookies = "";
function LGUplus(){
   let userData = {};

};
LGUplus.prototype.로그인 = async function(userId, password){
    console.log("LGUplus init!")
    this.host = "https://www.lguplus.com";
    this.cookies = "";
    this.header = {};

    this.header['Host']='www.lguplus.com'
    this.header['Connection']='keep-alive'
    this.header['sec-ch-ua']='"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"'
    this.header['sec-ch-ua-mobile']='?0'
    this.header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    this.header['X-MENU-URL']='/login'
    this.header['Content-Type']='application/json'
    this.header['Accept']='application/json, text/plain, */*'
    this.header['X-USER-AGENT-TYPE']='PC'
    this.header['sec-ch-ua-platform']='"Windows"'
    this.header['Origin']='https://www.lguplus.com'
    this.header['Sec-Fetch-Site']='same-origin'
    this.header['Sec-Fetch-Mode']='cors'
    this.header['Sec-Fetch-Dest']='empty'
    this.header['Referer']='https://www.lguplus.com/login'
    this.header['Accept-Encoding']='gzip, deflate, br'
    this.header['Accept-Language']='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'

    const data = {"intgWbmbId":userId,"wbmbPswd":password,"failCnt":"","url":"","serviceCd":"","returnUrl":"","employCheckYn":"N"};
    this.path = "/uhdc/fo/mbrm/lgin/v1/login";
    
    let result = await axios({
        method:'POST',
        url:this.host+this.path,
        data:data,
        headers:this.header
    });

    console.log("LGUplus login end!");

    const response = {};
    response['status'] = 400;

    if(!result.data.lginRsnCd || result.data.lginRsnCd=="F"){
        response["status"] = 401;
    }else if(result.data.lginRsnCd=="S"){
        response["status"] = 200;
        response["data"] = result.data;
    }
    this.cookies = cookieParser(result);

    // console.log("this.cookies']='"+ this.cookies);
    // console.log("로그인 성공");
    // return "Success"

    return response;
 
};

    

LGUplus.prototype.통신요금조회 = async function(){
    console.log("통신요금조회")
    console.log("this.cookies']='"+ this.cookies)
    
    if(this.cookies==null){
        return "error_login"
    }
    
    this.header = {};
    this.path = '/uhdc/fo/myin/blpy/bill/v1/bill-acnt-info-one-page';
    
    this.header['Host'] ='www.lguplus.com'
    this.header['Connection'] ='keep-alive'
    this.header['sec-ch-ua'] ='"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"'
    this.header['Accept'] ='application/json, text/plain, */*'
    this.header['X-USER-AGENT-TYPE'] ='PC'
    this.header['sec-ch-ua-mobile'] ='?0'
    this.header['User-Agent'] ='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    this.header['X-MENU-URL'] ='/mypage/payinfo?p=1'
    this.header['sec-ch-ua-platform'] ='"Windows"'
    this.header['Sec-Fetch-Site'] ='same-origin'
    this.header['Sec-Fetch-Mode'] ='cors'
    this.header['Sec-Fetch-Dest'] ='empty'
    this.header['Referer'] ='https://www.lguplus.com/mypage/payinfo?p=1'
    this.header['Accept-Encoding'] ='gzip, deflate, br'
    this.header['Accept-Language'] ='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
    this.header['Cookie'] = this.cookies;

    let result = await axios({
        method:'GET',
        url:this.host+this.path,
        headers:this.header
    });
    console.log("result: "+ result.data);
    const pathAdrr = result.data['billAcntNo']
    console.log("pathAdrr: "+ pathAdrr);
    this.userData = result.data;


    this.header = {};
    this.header['Host']='www.lguplus.com'
    this.header['Connection']='keep-alive'
    this.header['sec-ch-ua']='"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"'
    this.header['Accept']='application/json, text/plain, */*'
    this.header['X-USER-AGENT-TYPE']='PC'
    this.header['sec-ch-ua-mobile']='?0'
    this.header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    this.header['X-MENU-URL']='/mypage/payinfo?p=1'
    this.header['sec-ch-ua-platform']='"Windows"'
    this.header['Sec-Fetch-Site']='same-origin'
    this.header['Sec-Fetch-Mode']='cors'
    this.header['Sec-Fetch-Dest']='empty'
    this.header['Referer']='https://www.lguplus.com/mypage/payinfo?p=1'
    this.header['Accept-Encoding']='gzip, deflate, br'
    this.header['Accept-Language']='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
    this.header['Cookie'] = this.cookies;

    this.path = "/uhdc/fo/myin/blpy/recp/v1/payment-list?billAcntNo="+pathAdrr+"&billPlus=N";

            ///uhdc/fo/myin/blpy/recp/v1/payment-list?billAcntNo=511712331262&billPlus=N

    result = await axios({
        method:'GET',
        url:this.host+this.path,
        headers:this.header
    });

    console.log(JSON.stringify(result.data));
    console.log("before this.cookie: "+ this.cookies);
    // this.cookies = cookieParser(result);

    const response = {};
    response['status'] = result.status;
    response['data'] = result.data;
    return response;

}


LGUplus.prototype.월별사용량조회 = async function(year, month){


    console.log("this.user: "+ JSON.stringify(this.userData));
    console.log("after this.cookies: "+ JSON.stringify(this.cookies));
    
    const response = {};
    response['status'] = 401;
    
    console.log("월별사용량조회 init!");
    if(this.cookies==null || this.cookies == ""){
        response['data']= "error_login_cookie";
        return response;
    }


    this.header = {};
    this.path = '/uhdc/fo/myin/blpy/bill/v1/bill-acnt-info-one-page';
    
    this.header['Host'] ='www.lguplus.com'
    this.header['Connection'] ='keep-alive'
    this.header['sec-ch-ua'] ='"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"'
    this.header['Accept'] ='application/json, text/plain, */*'
    this.header['X-USER-AGENT-TYPE'] ='PC'
    this.header['sec-ch-ua-mobile'] ='?0'
    this.header['User-Agent'] ='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    this.header['X-MENU-URL'] ='/mypage/payinfo?p=1'
    this.header['sec-ch-ua-platform'] ='"Windows"'
    this.header['Sec-Fetch-Site'] ='same-origin'
    this.header['Sec-Fetch-Mode'] ='cors'
    this.header['Sec-Fetch-Dest'] ='empty'
    this.header['Referer'] ='https://www.lguplus.com/mypage/payinfo?p=1'
    this.header['Accept-Encoding'] ='gzip, deflate, br'
    this.header['Accept-Language'] ='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
    this.header['Cookie'] = this.cookies;

    let result = await axios({
        method:'GET',
        url:this.host+this.path,
        headers:this.header
    });


    this.userData = result.data;

    console.log("this.userData: "+ JSON.stringify(this.userData));
    
    const dateData = year+month;
    
    this.header = {};
    this.header['Host']='www.lguplus.com'
    this.header['Connection']='keep-alive'
    this.header['sec-ch-ua']='"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"'
    this.header['Accept']='application/json, text/plain, */*'
    this.header['X-USER-AGENT-TYPE']='PC'
    this.header['sec-ch-ua-mobile']='?0'
    this.header['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    this.header['X-MENU-URL']='/mypage/bilv'
    this.header['sec-ch-ua-platform']='"Windows"'
    this.header['Sec-Fetch-Site']='same-origin'
    this.header['Sec-Fetch-Mode']='cors'
    this.header['Sec-Fetch-Dest']='empty'
    this.header['Referer']='https://www.lguplus.com/mypage/bilv'
    this.header['Accept-Encoding']='gzip, deflate, br'
    this.header['Accept-Language']='ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
    this.header['Cookie'] = this.cookies;

    const aceno = this.userData['aceno'];
    const entrNo = this.userData['entrNo'];
    const billAcntNo = this.userData['billAcntNo'];


    console.log("aceno: "+ aceno);
    console.log("entrNo: "+ entrNo);
    console.log("billAcntNo: "+ billAcntNo);
    
    this.path = "/uhdc/fo/myin/bilv/v1/month-use-rate?_error=true&_redirect=true&_exceptHttpStatus=409&_returnUrl=%2Fmypage%2Fbilv&billTrgtYymm="+dateData+"&selectYearMonth="+dateData+"&aceno="+aceno+"&entrNo="+entrNo+"&billAcntNo="+billAcntNo;
    
    result = await axios({
        method:'GET',
        url:this.host+this.path,
        headers:this.header
    });

    if(result.status==401 && result.stausText=="Unauthorized"){
        response['data']= "error_login";
    }else{
        response['status'] = 200;
        response['data']= result.data;
    }
    return response;
}


module.exports = LGUplus;