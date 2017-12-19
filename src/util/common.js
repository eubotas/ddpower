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

//小到大排序
export function sortBy(filed, rev, primer){
      rev = (rev) ? -1 : 1;
      return function (a, b) {
          a = a[filed];
          b = b[filed];
          if (typeof (primer) != 'undefined') {
              a = primer(a);
              b = primer(b);
          }
          if (a < b) { return rev * -1; }
          if (a > b) { return rev * 1; }
          return 1;
      }
}
