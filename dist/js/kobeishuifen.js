"use strict";function getData(){var n=location.search.split("=")[1];$.get("./php/getGoodsInfo.php","goodsId="+n,function(n){showData(n)},"json")}function showData(n){var a='\n        <div class="gwc-l float_left">\n            <div class="gwc-l-imgbox">\n                <a href="#"><img src="'.concat(n.goodsImg,'" alt=""></a>\n            </div>\n            <div class="gwc-l-imgbox">\n                <a href="#"><img src="./images/kobeishuifen/kbfs2.jpg" alt=""></a>\n            </div>\n            <div class="gwc-l-imgbox">\n                <a href="#"><img src="./images/kobeishuifen/kbfs3.jpg" alt=""></a>\n            </div>\n            <div class="gwc-l-imgbox">\n                <a href="#"><img src="./images/kobeishuifen/kbfs4.jpg" alt=""></a>\n            </div>\n        </div>\n        <div class="gwc-c-imgbox float_left">\n            <img src="').concat(n.goodsImg,'" alt="">\n        </div>\n        <div class="gwc-r float_left">\n            <p>').concat(n.beiyong2,"</p>\n            <p>").concat(n.goodsName,'</p>\n            <p>★ ★ ★ ★ ★<span>426条评论</span></p>\n            <p><a href="#">\n                    ').concat(n.beiyong1,"<br>\n                    <span>￥").concat(n.goodsPrice,"</span>\n                </a>\n            </p>\n            <p>￥").concat(n.goodsPrice,'\n                <input id="btnReduce" type="button" value=" - ">\n                <input id="count" type="text" value="0">\n                <input id="btnAdd" type="button" value=" + ">\n                <input id="btnAddShoppingCar" type="button" value="加入购物车">\n                <input id="btnShoppingCar" type="button" value="立即购买">\n            </p>\n            <p>产品简介</p>\n            <p>* 因数量有限，同一个收货地址或者同一手机号码限购5件，敬请谅解。</p>\n            <p><a href="#">查看更多</a></p>\n            <p><a href="#">添加到我的收藏夹</a></p>\n            <p>\n                <span class="float_left">\n                    <b><img src="./images/kobeishuifen/gwc-r1.jpg" alt=""></b>\n                    <i>活动惊喜</i>\n                </span>\n                <span class="float_left">\n                    <b><img src="./images/kobeishuifen/gwc-r2.jpg" alt=""></b>\n                    <i>全场免运费</i>\n                </span>\n                <span class="float_left">\n                    <b><img src="./images/kobeishuifen/gwc-r3.jpg" alt=""></b>\n                    <i>正品保证</i>\n                </span>\n            </p>\n        </div> \n    ');$("#box1").html(a);var t='\n        <img src="'.concat(n.beiyong3,'" alt="">\n        <img src="').concat(n.beiyong4,'" alt="">\n        <img src="').concat(n.beiyong5,'" alt="">\n        <img src="').concat(n.beiyong6,'" alt="">\n        <img src="').concat(n.beiyong7,'" alt="">\n        <img src="').concat(n.beiyong8,'" alt="">\n        <img src="').concat(n.beiyong9,'" alt="">\n        <img src="').concat(n.beiyong10,'" alt="">\n        <img src="').concat(n.beiyong11,'" alt="">\n        <img src="').concat(n.beiyong12,'" alt="">\n        <img src="').concat(n.beiyong13,'" alt="">\n    ');$("#imgbox").html(t),addEvent()}function addEvent(){var n=getCookie("username"),a=location.search.split("=")[1];$("#btnAddShoppingCar").click(function(){addShoppingCar(n,a)}),$("#btnAdd").click(function(){var n=parseInt($("#count").val());n++,$("#count").val(n)}),$("#btnReduce").click(function(){var n=parseInt($("#count").val());n--,$("#count").val(n)}),$("#btnShoppingCar").click(function(){location.href="gwc.html"})}function addShoppingCar(n,a){$.post("./php/addShoppingCart.php",{vipName:n,goodsId:a,goodsCount:$("#count").val()},function(n){"0"===n?alert("添加失败"):alert("添加成功")})}$(function(){getData(addEvent)});