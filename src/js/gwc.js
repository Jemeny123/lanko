// 获取购物车的数据
function getShoppingCar(cb){
    //从cookie中获取用户名
    let vipName = getCookie('username')
    $.get("getShoppingCart.php",{"vipName":vipName},function(datas){ 
        let htmlStr =''
        datas.forEach(goods => {
            htmlStr +=`
                <div class="gwc1box-c">
                    <input type="checkbox" class="float_left">
                    <div class="gwc1box-imgbox float_left">
                        <img src="${goods.goodsImg}" alt="">
                    </div>
                    <div class="gwc1box2 float_left">
                        <p>${goods.goodsName}</p>
                        <p>${goods.beiyong1}</p>
                        <span>修改</span>
                        <span>+收藏夹</span>
                        <input class="delBtn" type="button" value="删除">
                        <p id="goodsId">${goods.goodsId}</p>
                    </div>
                    <span id="dj">${goods.goodsPrice}</span>
                    <input class="reduceBtn" type="button" value="  -  ">
                    <span id="count">${goods.goodsCount}</span>
                    <input class="addBtn" type="button" value=" + ">
                    <span id="xj">${goods.goodsPrice*goods.goodsCount}</span>
                </div>
            `;
        });           

        // 把产生html字符串放在html页面上
        $("#box").html(htmlStr);
        cb(); //给dom元素添加事件
    },"json")
}

$(function(){    
    getShoppingCar(addEvent);
});

//添加事件 
function addEvent(){
    $(" :checkbox:eq(0)").check($(" :checkbox:gt(0)"));
    $(":checkbox").click(function(){
        totalMoney();
    });
    $(".addBtn").click(function(){
        //一、修改后端的数量
        let goodsId = $(this).parent().find("#goodsId").html();
        let count = $(this).prev().html();
        count++;
        updateCount(goodsId,count,()=>{            
            //二、修改前端的数量
            // 数量            
            $(this).prev().html(count);
            // 单价
            let price = $(this).parent().find("#dj").html()
            // 计算金额
            let money = price*count;
            $(this).parent().find("#xj").html(money);

            // 总金额
            totalMoney();  
        });
    }); 
    $(".reduceBtn").click(function(){
        //一、修改后端的数量
        let goodsId = $(this).parent().find("#goodsId").html();
        let count = $(this).next().html();
        count--;
        if(count<1){
            count=0;
        }
        updateCount(goodsId,count,()=>{            
            //二、修改前端的数量
            // 数量            
            $(this).next().html(count);
            // 单价
            let price = $(this).parent().find("#dj").html()
            // 计算金额
            let money = price*count;
            $(this).parent().find("#xj").html(money);

            // 总金额
            totalMoney();  
        });
    }); 
    $(".delBtn").click(function(){
        if(confirm("亲，您真的要删除吗？")){
            //一、删除后端购物车中商品()
            let goodsId = $(this).parent().parent().find("#goodsId").html();
            deleteGoods(goodsId,()=>{
                //二、删除前端购物车中商品()
                $(this).parent().parent().remove();
                totalMoney();
            })
        }
    });
}

//修改购物车中商品的数量()
// 参数:
// 商品编号，修改后的商品数量
function updateCount(goodsId,goodsCount,cb){
    //从cookie中获取用户名
    let vipName = getCookie('username')
    $.get("updateGoodsCount.php",{
        "vipName":vipName,
        "goodsId":goodsId,
        "goodsCount":goodsCount
    },function(data){
        if(data=="0"){
            alert("服务器出错：修改数量失败");
        }else{
            // 前端修改数量
            cb();
        }
    });
} 

// 删除后端购物车中商品
function deleteGoods(goodsId,cb){
    //从cookie中获取用户名
    let vipName = getCookie('username')
    $.get("deleteGoods.php",{
        "vipName":vipName,
        "goodsId":goodsId,
    },function(data){
        if(data=="0"){
            alert("服务器出错：修改数量失败");
        }else{
            // 前端删除购物车中商品
            cb();
        }
    });
} 


// 感觉用户体验不怎么好，
// 其实应该点击 + 或者 - 的时候或者点击选框的弟弟们任何一个时就触发选框的事件，
// - 到 0 的时候就不选中选框了
// 计算总金额
function totalMoney(){
    // 
    let money =0;
    let $tr = $("#box .gwc1box-c")
    $tr.each(function(){
        // 复选框是不是选中了
        if($(this).find(":checkbox").prop("checked")){
            money += parseFloat($(this).find("#xj").html());
        }
    });
    $("#spjg").html(money);    
    $("#zj").html(money);    
}