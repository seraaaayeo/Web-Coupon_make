/**
 * @function
 * 쿠폰 생성 및 db 등록, 예외 처리(중복, 7비트)
 * @param
 * count : 생성할 쿠폰의 개수. 같은 금액의 쿠폰을 몇 개 생성할 것인가.
 * amount : 쿠폰의 금액.
 */

const firebase = require('firebase/app');
require('firebase/database');

const CRC32 = require('buffer-crc32'); //unsigned crc를 출력하기 위한 모듈.

const couponRef = firebase.database().ref('coupons');
const coupon = require('./index.js');
const auth = require('../utils');

module.exports = async function (seed, count, amount) {
    try {
        if (!await auth.isLogin()) {
            throw new Error('PERMISSION_DENIED');
        }

        let couponInit = ''; //쿠폰코드에 관한 정보를 저장할 스트링 초기화(버퍼 사용 위함)
        let map = new Map(); //중복 탐색을 위해 map 객체 사용
        let cnt = 0, temp = 0;
        let str = seed; //쿠폰 번호 생성에 필요한 seed 입력 받기
     
        recur:
        for (let i = 0; i < count; i++) {

            let couponCode = await couponInit.concat(await coupon.unixTime(), str.seed1, i, str.seed2, str.seed3); //seed를 하나의 정보 str으로 합치기
            
            //crc32 encoding
            let buf = Buffer.from(couponCode.toString(16));
            let hex = (CRC32.unsigned(buf)).toString(16);

            //쿠폰 번호가 중복되는지 검사
            if (map.has(hex) === false) { //해당 key가 map 객체 안에 없다면

                let _key = hex;
                let dup = await couponRef.child(_key).once('value'); //이미 있는 key인지 확인하기 위해 db쿼리

                if (dup.val()) {
                    console.log('db 중복 발생!!!');
                    temp++;
                    i--; //해당 쿠폰 생성 카운트 폐기
                    continue recur;
                }
                else {
                    //7자리 코드에 대한 예외 처리
                    if (hex.length != 8) {
                        let add = '0';
                        _key = add.concat(hex);
                        console.log('8bit', _key);
                    }
                    map.set(_key, amount); //map 객체에 8비트 쿠폰번호를 key, 쿠폰금액을 value로 집어넣음.

                    await couponRef.child(_key).set({ //쿠폰번호를 db의 key로 등록
                        amount: map.get(_key),
                        couponName: str.seed1,
                        expireDate: str.seed2,
                        key: _key
                    });
                }
            }
            else { //해당 key가 map 객체 안에 이미 있다면
                console.log('코드 중복 발생!');
                cnt++;
                i--
                continue recur;
            }
        }

        console.log('map', map, map.size);

        console.log('코드 중복 발생 횟수', cnt);
        console.log('db 중복 발생 횟수', temp);

        return map;
    }

    catch (e) {
        throw e;
    }
}