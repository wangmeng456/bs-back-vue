// 跳转辽宁楼宇信息库系统的加密解密方法
import * as CryptoJS from 'crypto-js';


var todayDate_key = new Date();
var month_key = todayDate_key.getMonth() + 1 < 10 ? "0" + (todayDate_key.getMonth() + 1) : todayDate_key.getMonth() + 1;
var day_key = todayDate_key.getDate() < 10 ? "0" + todayDate_key.getDate() : todayDate_key.getDate();
const AuthTokenKey = CryptoJS.enc.Utf8.parse("xiao_xin_01_" + month_key + day_key); //十六位十六进制数作为密钥



/*AES加密*/
/**
 * 
 * @param {*} data 用户的 manaId，目前先写死 admin
 */
export function Encrypt(data) {
	var srcs = CryptoJS.enc.Utf8.parse(data);
	var encrypted = CryptoJS.AES.encrypt(srcs, AuthTokenKey, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}

/*AES解密*/
export function Decrypt(data) {
	var decrypt = CryptoJS.AES.decrypt(data, AuthTokenKey, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}