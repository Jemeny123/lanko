"use strict";function getGoods(){$.get("./php/getGoodsList.php?typeId=001",function(o){showData(o)},"json")}function showData(o){var n="";o.forEach(function(o){n+='\n            <div class="right-box1 float_left">\n                <div class="right-imgbox">\n                    <img src="'.concat(o.goodsImg,'" alt="">\n                    <div class="right-imgbox2">\n                        <a href="./gwc.html">立即购买</a>\n                        <a href="kobeishuifen.html?goodsId=').concat(o.goodsId,'">了解详情</a>\n                    </div>\n                </div>\n                <p>').concat(o.beiyong1,'</p>\n                <p><a href="kobeishuifen.html?goodsId=').concat(o.goodsId,'">').concat(o.goodsName,'</a></p>\n                <p><a href="kobeishuifen.html?goodsId=').concat(o.goodsId,'">').concat(o.beiyong2,"</a></p>\n                <p>★★★★★<span>|</span>￥").concat(o.goodsPrice,"</p>\n            </div>\n        ")}),$("#box1").html(n)}$(function(){getGoods()});