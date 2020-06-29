// 从后端获取所有的商品
function getGoods(){
    $.get("./getGoodsList.php?typeId=001",function(data){
        showData(data);
    },"json");
}

// 显示商品
function showData(data){
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
})