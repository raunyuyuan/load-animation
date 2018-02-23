(function(window,document){
    function LoadWrap(element,options){
        //判断使用函数创建的还是用new创建的，new或者直接用都可以
        if(!(this instanceof LoadWrap))return new LoadWrap(element,options);

        //合并参数
        this.options = this.extend({
            imgSrc:"url('webwxgetmsgimg.jpeg')"
        },options);

        //判断传进来的元素是dom还是字符串
        if((typeof element)==="string"){
            this.element = document.querySelector(element);
        }else{
            this.element = element;
        }

        var boxDom = document.createElement("div");
        var innerDom = document.createElement("div");
        var childDom = document.createElement("div");
        var textDom = document.createElement('p');

        innerDom.className="inner";
        //设置默认样式
        boxDom.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;background-color: hsla(0,0%,100%,0.8);z-index:99999;display:block;";
        childDom.style.cssText = "position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;height:6.5rem;width:6.4rem"
        textDom.style.cssText = "position:absolute;top:6.5rem;width:100%;color:#666;text-align:center;font-size:0.82rem;font-weight:700"
        textDom.innerHTML="页面加载中";

                //给默认的背景
        childDom.style.backgroundImage = this.options.imgSrc;
        childDom.style.backgroundSize = "100% auto";
        childDom.style.backgroundPosition = "0 0";
        
        //追加或者重设样式
        if(this.options.boxDomStyle){
            this.setStyle(boxDom, this.options.boxDomStyle);
        }
        if(this.options.imgDomStyle){
            this.setStyle(childDom, this.options.imgDomStyle);
        }



        childDom.appendChild(textDom);
        innerDom.appendChild(childDom);
        boxDom.appendChild(innerDom);
        this.boxDom = boxDom;
        this.childDom = childDom;

        //初始化
        this.init();

    };
    LoadWrap.prototype = {

        init:function(){
            this.event();
        },
        extend:function(obj,obj2){
            for(var k in obj2){
                obj[k] = obj2[k];
            }
            return obj;
        },
        setStyle:function(dom,objStyle){
            for(var k in objStyle){
                dom.style[k] = objStyle[k];
            }
        },
        event:function(){
            var _this = this;
            var isTime = 0;
            var position = 0;
            var checkTime = setInterval(function(){isTime++;position+=6.1163;_this.childDom.style.backgroundPosition="0 "+position+"rem";completeLoading();},100);

            
            this.element.appendChild(this.boxDom);
            //判断当前文档的状态
            document.onreadystatechange = completeLoading;

            function completeLoading(){

                if(document.readyState == "interactive" &&isTime>5){
                    _this.boxDom.style.display = "none";
                    clearInterval(checkTime); 
                }else if(isTime>5){
                    clearInterval(checkTime);
                      _this.boxDom.style.display = "none";
                }else if(document.readyState == "compete" &isTime>5){
                   _this.boxDom.style.display = "none";
                    clearInterval(checkTime);
                }
            }
        
        }
    };
    
    window.LoadWrap = LoadWrap;
}(window,document));