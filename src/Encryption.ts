import CryptoJS from 'crypto-js';

const getKeys = () => {
  const keyInput = 'TaUI4+C0k2OMLkMPCGHVWXytnLh1vJC9uq/090aruoq=';
  const ivInput = '41V0CbOtqCCy7tJVsEhqhC==';

  const secretKey = CryptoJS.enc.Base64.parse(keyInput);
  const intiVector = CryptoJS.enc.Base64.parse(ivInput);

  return { intiVector, secretKey };
};

function AESEncrypt(object: any) {
  try {
    const { secretKey, intiVector } = getKeys();
    const encodedData = JSON.stringify(object);
    const encryptedData = CryptoJS.AES.encrypt(encodedData, secretKey, {
      iv: intiVector,
      padding: CryptoJS.pad.Pkcs7,
    }).ciphertext.toString(CryptoJS.enc.Base64);
    return encryptedData;
  } catch {
    return '0';
  }
}

function AESDecrypt(encryptedData: any) {
  try {
    const { secretKey, intiVector } = getKeys();
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey, {
      iv: intiVector,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData);
  } catch {
    return '';
  }
}

export { AESDecrypt, AESEncrypt };
