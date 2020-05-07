const firebase = require('firebase/app');
require('firebase/auth');

module.exports = function () {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
};