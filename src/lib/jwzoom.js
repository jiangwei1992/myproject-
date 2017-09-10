/* 
* @Author: Marte
* @Date:   2017-08-23 11:02:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 01:28:49
*/
    console.log(3333)
function JwZoom(options){
    console.log(3333)
    // 设置大图默认属性
    var defaults={
        width:412,
        height:412,

        position:"right",
        // 间隔
        gap:15,

        // 具有放大镜效果的选择器
        ele:".jwzoom"
    }
        // 合并默认与传参
    var opt=Object.assign({},defaults,options);
// 设置属性
    this.width=opt.width;
    this.height=opt.height;
    this.position=opt.position;
    this.gap=opt.gap;
    this.ele=opt.ele;

}

JwZoom.prototype={
    // 创建html结构和绑定事件
    init(){
        // 获取小图
        var smallbox=document.querySelector(this.ele);
        var smallimg=smallbox.children[0];
        console.log(smallbox)
        // 创建大图
        var bigbox=document.createElement("div");
            bigbox.className="jwzoom-big";
        var bigimg=document.createElement('img');
        // 或者
        // var bigimg=new Image();
        
        /*大图的位置*/
        bigimg.src=smallimg.dataset.big||smallimg.src;
        bigbox.appendChild(bigimg);
        smallbox.parentNode.appendChild(bigbox);
        var left,top;
            /*默认在右侧*/
        

        // 为了是图片页面加载完成在定位
        smallimg.onload=()=>{         
        left=smallbox.offsetLeft+smallimg.offsetWidth+this.gap;
        top=smallbox.offsetTop;
            bigbox.style.left=left+"px";
            bigbox.style.top=top+"px";
            console.log(top)
            console.log(left)
        }
        

        // 创建放大镜
        var zoom=document.createElement("div");
        zoom.className="minzoom";
        smallbox.appendChild(zoom);

       
        // 放大镜的位置
       

        // 绑定事件
        // 给smallbox 绑定事件

        smallbox.onmouseenter=function(){
            this.show()
        }.bind(this);
        smallbox.onmouseleave=function(){
            this.hide()
        }.bind(this)
        document.onmousemove=function(e){

            // 做边界限制
            var zoom_left=e.clientX-zoom.offsetWidth/2-smallbox.offsetLeft;
            var zoom_top=e.clientY-zoom.offsetHeight/2-smallbox.offsetTop+document.body.scrollTop;
            // 当移动到左边要超过边界时
            if(zoom_left<0){
                zoom_left=0;
            }
                // 当移动到右边边界将要超过边界时
            if(zoom_left>smallimg.offsetWidth-zoom.offsetWidth){
                zoom_left=smallimg.offsetWidth-zoom.offsetWidth;
            }

            // 当移动到上边边界将要超过边界时
            if(zoom_top<0){
                zoom_top=0;
            }
                // 当移动到下边边界将要超过边界时
            if(zoom_top>smallimg.offsetHeight-zoom.offsetHeight){
                zoom_top=smallimg.offsetHeight-zoom.offsetHeight+document.body.scrollTop;
            }

            this.move(zoom_left,zoom_top)
        }.bind(this)

        this.bigbox=bigbox;
        this.zoom=zoom;
        this.bigimg=bigimg;
        this.smallimg=smallimg;
    },

    show(){
        this.bigbox.style.display="block";
        this.zoom.style.display="block";
        // 计算比例
        this.radioX=this.bigimg.offsetWidth/this.smallimg.offsetWidth;
        this.radioY=this.bigimg.offsetHeight/this.smallimg.offsetHeight;
    },
    hide(){
        this.bigbox.style.display="none";
        this.zoom.style.display="none";
    },
    move(x,y){
        this.zoom.style.left=x+"px";
        this.zoom.style.top=y+"px";

        this.bigimg.style.left=-x*this.radioX+"px";
        this.bigimg.style.top=-y*this.radioY+"px";


    }

}
Object.defineProperty(JwZoom.prototype,'constructor',{
    value:JwZoom
});