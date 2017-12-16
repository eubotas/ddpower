/**
*  储存localStorage
*/
export function setlocalStorage(storeName, storeData) {
  var storeStr = JSON.stringify(storeData);
  var storeArr = window.localStorage.setItem(storeName, storeStr);
  return storeArr;
}
/**
*  获取localStorage
*/
export function getlocalStorage(storeName) {
	var storeName = localStorage.getItem(storeName);
	var storeArr = JSON.parse(storeName)
	return storeArr;
}
