const msafeModuel = require("./msafe");

// jest 기본 timeout 5초 
jest.setTimeout(1000*60*3);

test("로그인 성공", ()=>{
    const urlEncodedName = encodeURIComponent("정진우")
    const userPhone = "01082271995";
    const userSsn = "9306161268217";
  
    
    // setTimeout(()=>{
        return msafeModuel.prototype.간편로그인(urlEncodedName, userPhone, userSsn).then((scrapResult)=>{
            expect(scrapResult["status"]).toEqual(200);
        });
    
    // }, 1000*60);
  
});

// test("로그인 실패", async ()=>{
//     const urlEncodedName = encodeURIComponent("정진우")
//     const userPhone = "01082271995";
//     const userSsn = "9306161268217";
  
//     const scrapResult = await msafeModuel.prototype.간편로그인(urlEncodedName, userPhone, userSsn);
  
//     expect(scrapResult["status"]).toEqual("200")
// });


