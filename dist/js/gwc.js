"use strict";function getShoppingCar(o){var t=getCookie("username");$.get("./php/getShoppingCart.php",{vipName:t},function(t){var n="";t.forEach(function(t){n+='\n                <div class="gwc1box-c">\n                    <input type="checkbox" class="float_left">\n                    <div class="gwc1box-imgbox float_left">\n                        <img src="'.concat(t.goodsImg,'" alt="">\n                    </div>\n                    <div class="gwc1box2 float_left">\n                        <p>').concat(t.goodsName,"</p>\n                        <p>").concat(t.beiyong1,'</p>\n                        <span>修改</span>\n                        <span>+收藏夹</span>\n                        <input class="delBtn" type="button" value="删除">\n                        <p id="goodsId">').concat(t.goodsId,'</p>\n                    </div>\n                    <span id="dj">').concat(t.goodsPrice,'</span>\n                    <input class="reduceBtn" type="button" value="  -  ">\n                    <span id="count">').concat(t.goodsCount,'</span>\n                    <input class="addBtn" type="button" value=" + ">\n                    <span id="xj">').concat(t.goodsPrice*t.goodsCount,"</span>\n                </div>\n            ")}),$("#box").html(n),o()},"json")}function addEvent(){$(" :checkbox:eq(0)").check($(" :checkbox:gt(0)")),$(":checkbox").click(function(){totalMoney()}),$(".addBtn").click(function(){var n=this,t=$(this).parent().find("#goodsId").html(),o=$(this).prev().html();updateCount(t,++o,function(){$(n).prev().html(o);var t=$(n).parent().find("#dj").html()*o;$(n).parent().find("#xj").html(t),totalMoney()})}),$(".reduceBtn").click(function(){var n=this,t=$(this).parent().find("#goodsId").html(),o=$(this).next().html();--o<1&&(o=0),updateCount(t,o,function(){$(n).next().html(o);var t=$(n).parent().find("#dj").html()*o;$(n).parent().find("#xj").html(t),totalMoney()})}),$(".delBtn").click(function(){var t=this;confirm("亲，您真的要删除吗？")&&deleteGoods($(this).parent().parent().find("#goodsId").html(),function(){$(t).parent().parent().remove(),totalMoney()})})}function updateCount(t,n,o){var e=getCookie("username");$.get("./php/updateGoodsCount.php",{vipName:e,goodsId:t,goodsCount:n},function(t){"0"==t?alert("服务器出错：修改数量失败"):o()})}function deleteGoods(t,n){var o=getCookie("username");$.get("./php/deleteGoods.php",{vipName:o,goodsId:t},function(t){"0"==t?alert("服务器出错：修改数量失败"):n()})}function totalMoney(){var t=0;$("#box .gwc1box-c").each(function(){$(this).find(":checkbox").prop("checked")&&(t+=parseFloat($(this).find("#xj").html()))}),$("#spjg").html(t),$("#zj").html(t)}$(function(){getShoppingCar(addEvent)});