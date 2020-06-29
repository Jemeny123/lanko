function getData(){

    // 获取地址栏上的商品编号
    // location.search: 获取地址栏中 文件名后面的字符串，即问号后面的东西
    // http://localhost/nz2001taobao/goodsdetail.html?goodsId=01001
    let str =  location.search;//?goodsId=01001
    let arr = str.split("="); //["?goodsId","01001"]   
    let goodsId =  arr[1];

    $.get("getGoodsInfo.php","goodsId="+goodsId,function(data){
        showData(data);
    },"json");
}

function showData(data){
    let htmlStr1=`
        <div class="gwc-l float_left">
            <div class="gwc-l-imgbox">
                <a href="#"><img src="${data.goodsImg}" alt=""></a>
            </div>
            <div class="gwc-l-imgbox">
                <a href="#"><img src="./images/kobeishuifen/kbfs2.jpg" alt=""></a>
            </div>
            <div class="gwc-l-imgbox">
                <a href="#"><img src="./images/kobeishuifen/kbfs3.jpg" alt=""></a>
            </div>
            <div class="gwc-l-imgbox">
                <a href="#"><img src="./images/kobeishuifen/kbfs4.jpg" alt=""></a>
            </div>
        </div>
        <div class="gwc-c-imgbox float_left">
            <img src="${data.goodsImg}" alt="">
        </div>
        <div class="gwc-r float_left">
            <p>${data.beiyong2}</p>
            <p>${data.goodsName}</p>
            <p>★ ★ ★ ★ ★<span>426条评论</span></p>
            <p><a href="#">
                    ${data.beiyong1}<br>
                    <span>￥${data.goodsPrice}</span>
                </a>
            </p>
            <p>￥${data.goodsPrice}
                <input id="btnReduce" type="button" value=" - ">
                <input id="count" type="text" value="0">
                <input id="btnAdd" type="button" value=" + ">
                <input id="btnAddShoppingCar" type="button" value="加入购物车">
                <input id="btnShoppingCar" type="button" value="立即购买">
            </p>
            <p>产品简介</p>
            <p>* 因数量有限，同一个收货地址或者同一手机号码限购5件，敬请谅解。</p>
            <p><a href="#">查看更多</a></p>
            <p><a href="#">添加到我的收藏夹</a></p>
            <p>
                <span class="float_left">
                    <b><img src="./images/kobeishuifen/gwc-r1.jpg" alt=""></b>
                    <i>活动惊喜</i>
                </span>
                <span class="float_left">
                    <b><img src="./images/kobeishuifen/gwc-r2.jpg" alt=""></b>
                    <i>全场免运费</i>
                </span>
                <span class="float_left">
                    <b><img src="./images/kobeishuifen/gwc-r3.jpg" alt=""></b>
                    <i>正品保证</i>
                </span>
            </p>
        </div> 
    `;
    $("#box1").html(htmlStr1);

    let htmlStr2=`
        <img src="${data.beiyong3}" alt="">
        <img src="${data.beiyong4}" alt="">
        <img src="${data.beiyong5}" alt="">
        <img src="${data.beiyong6}" alt="">
        <img src="${data.beiyong7}" alt="">
        <img src="${data.beiyong8}" alt="">
        <img src="${data.beiyong9}" alt="">
        <img src="${data.beiyong10}" alt="">
        <img src="${data.beiyong11}" alt="">
        <img src="${data.beiyong12}" alt="">
        <img src="${data.beiyong13}" alt="">
    `;
    $("#imgbox").html(htmlStr2);
    addEvent()
}

$(function(){
    getData(addEvent);
})



//根据商品编号 获取商品详情
//添加事件
function addEvent(){
    let vipName = getCookie('username')
    let goodsId = location.search.split("=")[1];
    $("#btnAddShoppingCar").click(function(){
        addShoppingCar(vipName,goodsId);
    });
    $("#btnAdd").click(function(){
        let count = parseInt($("#count").val()) ;
        count++;
        $("#count").val(count);       
    });
    $("#btnReduce").click(function(){
        let count = parseInt($("#count").val()) ;
        count--;
        $("#count").val(count);       
    });
    $("#btnShoppingCar").click(function(){
        location.href="gwc.html";
    });
}

//把指定商品 添加到购物车
function addShoppingCar(vipName,goodsId){    
    $.post("./addShoppingCart.php",{
        "vipName":vipName,
        "goodsId":goodsId,
        "goodsCount":$("#count").val()
    },(data)=>{
        if(data==="0"){
            alert("添加失败");
        }else{
            alert("添加成功");
        }
    });
}