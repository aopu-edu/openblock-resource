const CryptoJS = require('crypto-js');

module.exports = {
    // aes加密
    encrypt (word, keyParm, ivParm) {
        // 密钥
        const key = CryptoJS.enc.Utf8.parse(keyParm); // 16位
        // 加密向量
        const iv = CryptoJS.enc.Utf8.parse(ivParm);
        let encrypted = '';
        if (typeof word === 'string') {
            const srcs = CryptoJS.enc.Utf8.parse(word);
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        } else if (typeof word === 'object') {
            // 对象格式的转成json字符串
            const data = JSON.stringify(word);
            const srcs = CryptoJS.enc.Utf8.parse(data);
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        }
        const data = encrypted.ciphertext.toString();
        const hash = CryptoJS.SHA256(data).toString();
        return hash;
    }
};
