// 增（添加）
function addCookie(key,value,count){
    let d = new Date()
    d.setDate(d.getDate()+count)
    document.cookie = `${key}=${escape(value)};expires=${d.toGMTString()}`
}
// 查（获取）
function getCookie(key){
    //获取当前网站所有的cookie（键值对）
    let str = unescape(document.cookie)
    // 1、用字符串的split函数，分割cookie字符串，分割成了数组
    let arr = str.split('; ')
    // 2、循环数组，查询key对应的元素（以 key = 开头的元素）
    for(let i=0;i<arr.length;i++){
        if (arr[i].indexOf(key+'=')==0) {
            return arr[i].split('=')[1]
        }
    }
    return null
}
// 删除（）
function removeCookie(key){
    addCookie(key,'byebye',-1)
}
//修改
function updateCookie(key,value,count){
    addCookie(key,value,count)
}

