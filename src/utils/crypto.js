import CryptoJS from "crypto-js";
import { SECRET_KEY, SALT_KEY } from '@env'

const secret = SECRET_KEY;
const salt = SALT_KEY;

const key = CryptoJS.PBKDF2(secret, salt, {
    keySize: 256 / 32,
    iterations: 74,
    hasher: CryptoJS.algo.SHA256,
});

const iv = CryptoJS.lib.WordArray.create([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]);

export function encryptAES(strToEncrypt) {
    try {
        const encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(strToEncrypt),
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        return encrypted.toString();
    } catch (e) {
        return `Error while encrypting: ${e}`;
    }
    }
    
    export function decryptAES(strToDecrypt) {
        try {
        const decrypted = CryptoJS.AES.decrypt(strToDecrypt, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (e) {
        return `Error while decrypting: ${e}`;
    }
}