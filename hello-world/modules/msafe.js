const axios = require('axios');
const { cookieParser } = require('../common/commonFunc');
const cheerio = require('cheerio');


function MSafe() {
    // this.cookies ="";
};

/**
 * 현재는 카카오톡 간편인증 로그인후 바로 조회 
 * 특이사항 
 *  - 로그인 통신() 요청후 응답대기 
 *  - 데이터 조회하는데에 10초정도 걸림
 * 
 * @param {*} userName  : url 인코딩된 사용자이름
 * @param {*} userPhone : 사용자이름
 * @param {*} ssn       : 주민등록번호(full)
 */
MSafe.prototype.간편로그인 = async function (userName, userPhone, ssn) {

    const ssn1 = ssn.substring(0, 6);
    const ssn2 = ssn.substring(6, 13);

    console.log("[module]msafe easy login");

    this.host = "https://msafer.or.kr"

    this.path = '/member/loginform.do';
    // loginform.do 
    this.header = {};
    this.header['Host'] = 'msafer.or.kr'
    this.header['Connection'] = 'keep-alive'
    this.header['sec-ch-ua'] = '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"'
    this.header['sec-ch-ua-mobile'] = '?0'
    this.header['sec-ch-ua-platform'] = '"Windows"'
    this.header['Upgrade-Insecure-Requests'] = '1'
    this.header['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    this.header['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    this.header['Sec-Fetch-Site'] = 'same-origin'
    this.header['Sec-Fetch-Mode'] = 'navigate'
    this.header['Sec-Fetch-User'] = '?1'
    this.header['Sec-Fetch-Dest'] = 'document'
    this.header['Referer'] = 'https://msafer.or.kr/index.do'
    this.header['Accept-Encoding'] = 'gzip, deflate, br'
    this.header['Accept-Language'] = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'

    var result = await axios({
        method: 'GET',
        url: this.host + '/member/loginform.do',
        headers: this.header
    })


    console.log("*****************************************")
    console.log(result);
    console.log("*****************************************")
    this.cookies = cookieParser(result);
    console.log("MSafe modules: cookies: " + this.cookies);

    this.header = {};
    this.header['Connection'] = 'keep-alive'
    this.header['Cache-Control'] = 'max-age=0'
    this.header['sec-ch-ua'] = '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"'
    this.header['sec-ch-ua-mobile'] = '?0'
    this.header['sec-ch-ua-platform'] = '"Windows"'
    this.header['Upgrade-Insecure-Requests'] = '1'
    this.header['Origin'] = 'https://msafer.or.kr'
    this.header['Content-Type'] = 'application/x-www-form-urlencoded'
    this.header['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    this.header['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    this.header['Sec-Fetch-Site'] = 'same-origin'
    this.header['Sec-Fetch-Mode'] = 'navigate'
    this.header['Sec-Fetch-User'] = '?1'
    this.header['Sec-Fetch-Dest'] = 'document'
    this.header['Referer'] = 'https://msafer.or.kr/member/loginform.do'
    this.header['Accept-Encoding'] = 'gzip, deflate, br'
    this.header['Accept-Language'] = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    this.header['Cookie'] = this.cookies;

    console.log("testCookie: " + this.cookies);
    this.postData = "pName=%EC%A0%95%EC%A7%84%EC%9A%B0&pSsn=930616&pSsn2=1268217&pPhone=01082271995"

    // POST https://msafer.or.kr/member/kloginResult.do HTTP/1.1
    // 로그인 통신 -> 카카오톡 요청후 사용자가 인증까지 응답대기 -> timeout을 오래걸어 둔거일듯
    this.header = {};
    this.header['Host'] = 'msafer.or.kr'
    this.header['Connection'] = 'keep-alive'
    this.header['Cache-Control'] = 'max-age=0'
    this.header['sec-ch-ua'] = '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"'
    this.header['sec-ch-ua-mobile'] = '?0'
    this.header['sec-ch-ua-platform'] = '"Windows"'
    this.header['Upgrade-Insecure-Requests'] = '1'
    this.header['Origin'] = 'https://msafer.or.kr'
    this.header['Content-Type'] = 'application/x-www-form-urlencoded'
    this.header['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    this.header['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    this.header['Sec-Fetch-Site'] = 'same-origin'
    this.header['Sec-Fetch-Mode'] = 'navigate'
    this.header['Sec-Fetch-User'] = '?1'
    this.header['Sec-Fetch-Dest'] = 'document'
    this.header['Referer'] = 'https://msafer.or.kr/member/loginform.do'
    this.header['Accept-Encoding'] = 'gzip, deflate, br'
    this.header['Accept-Language'] = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    this.header['Cookie'] = this.cookies

    this.postData = 'pName=' + userName + '&pSsn=' + ssn1 + '&pSsn2=' + ssn2 + '&pPhone=' + userPhone

    var result = await axios({
        method: 'POST',
        url: this.host + "/member/kloginResult.do",
        data: this.postData,
        headers: this.header
    })


    console.log("로그인 성공");
    const tempCookie = cookieParser(result);
    this.cookies = this.cookies + tempCookie + ";";
    console.log("로그인 이후 쿠키: " + this.cookies);

    console.log("가입사실현황조회서비스");
    console.log("조회 통신중.. 10초정도 소요..");

    this.header = {}
    this.header['Host'] = 'msafer.or.kr'
    this.header['Connection'] = 'keep-alive'
    this.header['sec-ch-ua'] = '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"'
    this.header['sec-ch-ua-mobile'] = '?0'
    this.header['sec-ch-ua-platform'] = '"Windows"'
    this.header['Upgrade-Insecure-Requests'] = '1'
    this.header['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    this.header['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    this.header['Sec-Fetch-Site'] = 'same-origin'
    this.header['Sec-Fetch-Mode'] = 'navigate'
    this.header['Sec-Fetch-User'] = '?1'
    this.header['Sec-Fetch-Dest'] = 'document'
    this.header['Referer'] = 'https://msafer.or.kr/index.do'
    this.header['Accept-Encoding'] = 'gzip, deflate, br'
    this.header['Accept-Language'] = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    this.header['Cookie'] = this.cookies;

    var result = await axios({
        method: 'GET',
        url: this.host + "/inquiry_join/ask.do",
        headers: this.header
    });


    // GET https://msafer.or.kr/inquiry_join/ask_comp.do HTTP/1.1
    this.header = {};
    this.header['Host'] = 'msafer.or.kr'
    this.header['Connection'] = 'keep-alive'
    this.header['sec-ch-ua'] = '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"'
    this.header['sec-ch-ua-mobile'] = '?0'
    this.header['sec-ch-ua-platform'] = '"Windows"'
    this.header['Upgrade-Insecure-Requests'] = '1'
    this.header['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    this.header['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    this.header['Sec-Fetch-Site'] = 'same-origin'
    this.header['Sec-Fetch-Mode'] = 'navigate'
    this.header['Sec-Fetch-Dest'] = 'iframe'
    this.header['Referer'] = 'https://msafer.or.kr/inquiry_join/ask.do'
    this.header['Accept-Encoding'] = 'gzip, deflate, br'
    this.header['Accept-Language'] = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    this.header['Cookie'] = this.cookies

    var result = await axios({
        method: 'GET',
        url: this.host + "/inquiry_join/ask_comp.do",
        headers: this.header
    });

    console.log("check.do?")

    this.header = {}
    this.header['Host'] = 'msafer.or.kr'
    this.header['Connection'] = 'keep-alive'
    this.header['sec-ch-ua'] = '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"'
    this.header['sec-ch-ua-mobile'] = '?0'
    this.header['sec-ch-ua-platform'] = '"Windows"'
    this.header['Upgrade-Insecure-Requests'] = '1'
    this.header['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    this.header['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    this.header['Sec-Fetch-Site'] = 'same-origin'
    this.header['Sec-Fetch-Mode'] = 'navigate'
    this.header['Sec-Fetch-Dest'] = 'document'
    this.header['Referer'] = 'https://msafer.or.kr/inquiry_join/check.do'
    this.header['Accept-Encoding'] = 'gzip, deflate, br'
    this.header['Accept-Language'] = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    this.header['Cookie'] = this.cookies;

    var result = await axios({
        method: 'GET',
        url: this.host + "/inquiry_join/result.do",
        headers: this.header
    });


    const scrapResult = {};

    scrapResult["status"] = result.status;
    if(scrapResult["status"] ==200){
        // 결과 파싱 코드
        const $ = cheerio.load(result.data);

        const json = {};
        json["joinList"] = [];
        json["noJoinList"] = [];

        console.log("AllList1 check");
        $('#AllList1 tr').map(function (i, element) {

            const jsonEl = {};
            const company = String($(element).find('td:nth-of-type(1)').text());
            const check = String($(element).find('td:nth-of-type(2)').text());
            const userPhone = String($(element).find('td:nth-of-type(3)').text());
            const companyPhone = String($(element).find('td:nth-of-type(4)').text());

            jsonEl['company'] = company;
            jsonEl['userPhone'] = userPhone;
            jsonEl['companyPhone'] = companyPhone;

            if (check == 1) {
                json["joinList"].push(jsonEl);
            } else {
                json["noJoinList"].push(jsonEl);
            }
            console.log("통신사: " + company);
            console.log("가입유무: " + check);
            console.log("사용자 연락처(nullable): " + userPhone);
            console.log("통신사 연락처: " + companyPhone);

        });

        scrapResult["data"] = json;
        console.log(json);
        console.log("가입서비스: " + JSON.stringify(json["joinList"]));
        console.log("End Check");

    }else{

        scrapResult["data"] = "UnKnown Error"
    }

    return scrapResult;
}

module.exports = MSafe;