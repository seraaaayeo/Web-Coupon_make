/**
 * @function
 * 쿠폰코드의 첫 번째 seed로 사용할 Unix timestamp 반환
 * @ unit
 * 쿠폰 번호를 구성하는 쿠폰 발급 시각에 차이를 주기 위해 microsecond 단위로 반환.
 */

const microTime = require('microtime');

module.exports = async function(){
    try{
       let init = await microTime.now();

       return init;
    }
    catch(e){
        throw e;
    }
}