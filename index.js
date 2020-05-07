require('./init.js');
const auth = require('./utils');
const coupons = require('./src');

/***** 쿠폰 생성(coupon) *****/
couponMakeTest = async () => {
    try {
        let admin = await auth.loginWithEmail('admin_id', 'admin_pswd');
        let uid = (await admin).user.uid;

        let couponSeed = await coupons.seed('launching', '2020-12-31', uid);
        console.log(couponSeed);

        let couponMakeAndUpload = await coupons.makeCoupon(couponSeed, 10, 10000);
        console.log(couponMakeAndUpload);
    }
    catch (e) {
        throw e;
    }
}
