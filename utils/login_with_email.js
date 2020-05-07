const firebase = require('firebase/app');
require('firebase/auth');

module.exports = async (email, password) => {
    try {
        let userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

        return userCredential;
    }
    catch (e) {
        throw e;
    }
}