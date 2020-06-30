function getData(){

    // 获取地址栏上的商品编号
    // location.search: 获取地址栏中 文件名后面的字符串，即问号后面的东西
    // http://localhost/nz2001taobao/goodsdetail.html?goodsId=01001
    let str =  location.search;//?goodsId=01001
    let arr = str.split("="); //["?goodsId","01001"]   
    let goodsId =  arr[1];

    $.get("./php/getGoodsInfo.php","goodsId="+goodsId,function(data){
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
                <a href="#"><img src="${data.beiyong3}" alt=""></a>
            </div>
            <div class="gwc-l-imgbox">
                <a href="#"><img src="${data.beiyong4}" alt=""></a>
            </div>
            <div class="gwc-l-imgbox">
                <a href="#"><img src="${data.beiyong5}" alt=""></a>
            </div>
        </div>
        <div class="gwc-c-imgbox float_left" style="background: url('${data.goodsImg}');background-size: 100% 100%;";>
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
    let oBox = document.getElementsByClassName('gwc-c-imgbox')[0]
    let oImgBox = document.getElementsByClassName('gwc-l')[0]
    console.log(oBox);
    console.log(oImgBox);
    let m1 = new Mirror(oBox,oImgBox,{
        width:100,
        img:`${data.goodsImg}`
    });
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
    $.post("./php/addShoppingCart.php",{
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

// 类：放大镜

function Mirror(oBox,oImgBox, obj) {
    // DOM相关的属性：
    this.oBox = oBox;
    this.oImgBox = oImgBox;

    //属性的默认值：
    let defaultObj = {
        width: 80,
        height: 120,
        multiple: 3,
        color: "red",
        opacity: 0.3,
        left: 0, //镜子的位置
        top: 0,
        imgs:"img/img1.jpg"
    }

    // 先把传入的数据（obj）赋给defaultObj; 这是最终的对象的属性值；
    for (let key in obj) {
        defaultObj[key] = obj[key];
    }

    // 把defaultObj里的所有的属性赋给this
    for (let key in defaultObj) {
        this[key] = defaultObj[key];
    }

    this.createDom();
    this.addEvent();
}

// 方法
// 1、创建dom的方法（就是HTML和CSS代码）
Mirror.prototype.createDom = function () {
    let htmlStr=this.oBox.innerHTML;

    // 1、放大镜的html代码；
    htmlStr += `
        <div style="
                    position: relative;
                    left: ${this.left}px;
                    top: ${this.top}px;
                    width: ${this.width}px;
                    height:${this.height}px;
                    background-color: ${this.color};
                    opacity: ${this.opacity};
                    display:none;
        ">
        </div>
    `;
    // 2、可视（放大的效果）
    let boxWidth = this.oBox.offsetWidth;
    let boxHeight = this.oBox.offsetHeight;
    htmlStr += `
        <div style="
                    position: relative;
                    left: ${boxWidth+20}px;
                    top: -116px;
                    width: ${this.width*this.multiple}px;
                    height: ${this.height*this.multiple}px;
                    border: 1px solid pink;
                    background-image: url(${this.img});
                    background-size: ${boxWidth*this.multiple}px ${boxHeight*this.multiple}px;
                    background-position: -${this.left*this.multiple}px -${this.top*this.multiple}px;
                    display:none;
        ">
        </div>        
    `;
    
    // 把拼接好的html字符串放到盒子里
    this.oBox.innerHTML = htmlStr;
    console.log(this.oBox);
    

}


// 2、绑定事件（给盒子绑定onmousemove事件）
Mirror.prototype.addEvent = function(){
    //放大镜： 倒数第二个孩子

    console.log(this.oBox);
    console.log(this.oBox.lastElementChild);
    let oMirrorBox = this.oBox.lastElementChild.previousElementSibling;
    
    // 可视div：倒数第一个孩子
    let oShowBox = this.oBox.lastElementChild;

    // 1、给大盒子增加事件
    this.oBox.onmouseenter = function(){
        oMirrorBox.style.display = "block";
        oShowBox.style.display = "block";
    }
    
    this.oBox.onmouseleave = function(){
        oMirrorBox.style.display = "none";
        oShowBox.style.display = "none";
    }

    // 2、放大效果       
    
    let boxOffsetLeft = this.oBox.offsetLeft;
    let boxOffsetTop = this.oBox.offsetTop;
    let boxWidth = this.oBox.offsetWidth;
    let boxHeight = this.oBox.offsetHeight;

    this.oBox.onmousemove = (event)=>{
        let e = event || window.event;
        // 一、数据处理
        // 1、计算oMirrorBox应该出现的位置(基于父盒子oBox的left和top)
        // 鼠标距离页面的坐标的距离-大盒子距离页面的距离-放大镜的宽度的一半
        this.left = e.pageX - boxOffsetLeft - this.width / 2;
        this.top = e.pageY - boxOffsetTop - this.height / 2;

        // 2、处理边界
        if (this.left < 0) {
            this.left = 0;
        } else if (this.left + this.width > boxWidth) {
            this.left = boxWidth - this.width;
        }

        if (this.top < 0) {
            this.top = 0;
        } else if (this.top + this.height >boxHeight ) {
            this.top = boxHeight - this.height;
        }

        // 二、外观呈现
        // 1、移动放大镜
        oMirrorBox.style.left = this.left + "px";
        oMirrorBox.style.top = this.top + "px";

        // 2、改变show-box的背景图片的位置
        oShowBox.style.backgroundPosition = `-${this.left * this.multiple}px -${this.top * this.multiple}px`;
    }

    // 3、给下面的图片列表增加事件
    let oDivs = this.oImgBox.children;
    for(let i=0;i<oDivs.length;i++){
        // 
        oDivs[i].onmouseover = ()=>{
            // 改变img属性的值
            this.img = oDivs[i].firstElementChild.firstElementChild.src
            // 大盒子背景图片
            this.oBox.style.backgroundImage = `url(${this.img})`;
            // 可视部分的背景图片
            oShowBox.style.backgroundImage = `url(${this.img})`;
        }
    }
} 