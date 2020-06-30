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
    let oBox = document.getElementsByClassName('gwc-c-imgbox')
    console.log(oBox);
    let m1 = new Mirror(oBox,{
        width:100,
        img:'../images/jinghua/show1-1.jpg',
        imgs:["../images/jinghua/show1-1.jpg","../images/jinghua/show1-2.jpg","img/img3.jpg"]
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
function Mirror(oBox, obj) {
    // DOM相关的属性：
    this.oBox = oBox;

    //属性的默认值：
    let defaultObj = {
        width: 80,
        height: 120,
        multiple: 3,
        color: "red",
        opacity: 0.3,
        left: 0, //镜子的位置
        top: 0,
        img:"img/img1.jpg",
        imgs:["img/img1.jpg","img/img2.jpg"]
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
    let htmlStr="";
    // 创建下面的小图列表
    // 1）、创建 图片的盒子
    htmlStr += `<ul style="
        position:absolute;
        left:0;
        top:${this.oBox.offsetHeight+10}px; 
        width: ${this.oBox.offsetWidth}px; 
        height: 90px ;
        border:1px solid black;
    ">`;

    // 2）、通过循环创li(有几张图片，就创建几个li)
    for(let i=0;i<this.imgs.length;i++){
        htmlStr += `
            <li style="
                    float: left;
                    margin-left: 5px;
                    width: ${this.oBox.offsetWidth/this.imgs.length-10}px;
                    height: 90px;                
            ">
                <img style="
                            width: 100%;
                            height: 100%;
                " src="${this.imgs[i]}">
            </li>
        `;
    }
    htmlStr += "</ul>";
    
    // 1、放大镜的html代码；
    htmlStr += `
        <div style="
                    position: absolute;
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
                    position: absolute;
                    left: ${boxWidth+20}px;
                    top: 0;
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

}


// 2、绑定事件（给盒子绑定onmousemove事件）
Mirror.prototype.addEvent = function(){
        //放大镜： 倒数第二个孩子
        console.log(this);
        console.log(this.oBox);
        console.log(this.oBox.lastElementChild);
        console.log(this.oBox.lastElementChild.previousElementSibling);

        
        let oMirrorBox = this.oBox.lastElementChild.previousElementSibling;
    // 可视div：倒数第一个孩子
    let oShowBox = this.oBox.lastElementChild;

    // 1、给大盒子增加事件
    this.oBox.onmouseover = function(){
        oMirrorBox.style.display = "block";
        oShowBox.style.display = "block";
    }
    
    this.oBox.onmouseout = function(){
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

    // 3、给下面的每个li增加onmouseover事件

    let oLis = this.oBox.firstElementChild.children; //
    for(let i=0;i<oLis.length;i++){
        oLis[i].onmouseover = (event)=>{
            this.img = oLis[i].firstElementChild.src;
            this.oBox.style.backgroundImage = `url(${this.img})`;
            oShowBox.style.backgroundImage = `url(${this.img})`;
            // 阻止事件冒泡
            let e = event || window.event;
            e.stopPropagation();
        }
        oLis[i].onmousemove = (event)=>{
                // 阻止事件冒泡
                let e = event || window.event;
                e.stopPropagation();
        } 
    }

}