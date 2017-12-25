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

//判断是否是微信端
export function isWinxin(){
  const ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    console.log('true')
      return true;
  } else {
    console.log('false')
      return false;
  }
}
//获取url后面的参数
export function getUrlParams(name){
    var _reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
        _regNext = window.location.search.substr(1).match(_reg);
    if (_regNext != null) return decodeURI(_regNext[2]) || '';
    else return '';
}
