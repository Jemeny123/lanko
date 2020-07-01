// 一、获取用户名（在cookie中获取）
function getUserName(){
    let username = getCookie('username')

    if (username) {
        $('#username1').html(username + '欢迎你')
        $('#zhuxiao').css({"display":"inline-block"})
        $('#dl').css({"display":"none"})
    }else{
        $('#zhuxiao').css({"display":"none"})
        $('#dl').css({"display":"inline-block"})
    }
    // 2、给注销按钮绑定事件
    $('#zhuxiao').click(function(){
        // 1、删除cookie
        removeCookie("username");
        $('#username1').css({"display":"none"})
        $('#zhuxiao').css({"display":"none"})
        $('#dl').css({"display":"inline-block"})
    })
}

// 从后端获取所有的商品
function getGoods(){
    $.get("./php/getGoodsList.php",function(data){
        showData(data);
    },"json");
}

// 显示商品
function showData(data){
    data.length = 9
    let htmlStr="";
    data.forEach(item => {
        htmlStr += `
            <div class="right-box1 float_left">
                <div class="right-imgbox">
                    <img src="${item.goodsImg}" alt="">
                    <div class="right-imgbox2">
                        <a href="./gwc.html">立即购买</a>
                        <a href="kobeishuifen.html?goodsId=${item.goodsId}">了解详情</a>
                    </div>
                </div>
                <p>${item.beiyong1}</p>
                <p><a href="kobeishuifen.html?goodsId=${item.goodsId}">${item.goodsName}</a></p>
                <p><a href="kobeishuifen.html?goodsId=${item.goodsId}">${item.beiyong2}</a></p>
                <p>★★★★★<span>|</span>￥${item.goodsPrice}</p>
            </div>
        `
    });
    $("#box1").html(htmlStr);  
}

$(function(){
    getGoods();
    getUserName()
})

//二级菜单
$(".first > li").hover(function() {
    $(this).children(".xlcd").stop().slideToggle(200);
})