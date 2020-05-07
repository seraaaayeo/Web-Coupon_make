/**
 * @function
 * 쿠폰 코드 생성에 이용할 seed 생성
 */

module.exports = async function (contents, expire, uid) {
    try {
        this.seed1 = contents;
        this.seed2 = expire;
        this.seed3 = uid;

        return this;
    }
    catch (e) {
        throw e;
    }
}