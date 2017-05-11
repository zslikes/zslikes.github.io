
    /*
      方法名称: 运动框架
      适用范围: 运动
      作者: 阿飞老师
      类型: javascript
      保存日期: 2017-04-15
    */

    window.requestAnimationFrame = window.requestAnimationFrame || function (a){return setTimeout(a,1000/60)};
    window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
    //浏览器兼容 requestAnimationFrame 定时器

    function move(obj , showData , time , callBack) {

        var getVal = {}, //存初始值
            setVal = {}, //存目标值
            setTime = new Date(); //存初始时间

        for (var key in showData) {
            getVal[key] = parseFloat( getStyle(obj,key) );//获取初始值
            setVal[key] = parseFloat( showData[key] );//将目标值转换为数字
        }

        RunTimer();

        function RunTimer(){

            var prop = (new Date() - setTime)/time; //时间比值 (浏览器刷新时间-初始时间)/设置时间长

            prop >= 1 ? prop = 1 : requestAnimationFrame(RunTimer); //时间比例为1 停止 否则运行定时器requestAnimationFrame(RunTimer)

            for (var key in showData) {

                //无px属性
                if ( key === "opacity" ){

                    var runVal = sVal[key] + prop*(settVal[key] - getVal[key]);
                    obj.style[key] = runVal;
                    obj.style.filter = "alpha(opacity="+ 100*runVal +")";

                }else{

                    obj.style[key] = getVal[key] + prop*(setVal[key] - getVal[key]) + "px";
                }
            }

            if ( prop === 1 ){

                callBack && callBack.call(obj); //回调函数 无参数 .call指向obj继续执行 &&为假下一个
            }
        }
        function getStyle(obj , show) {

            return obj.currentStyle ? obj.currentStyle[atr] : getComputedStyle(obj)[show]; //浏览器兼容

            }
        }

        // 调用实例
        // (function(){ 闭包区间 变量名不冲突

        //     var oBox = document.getElementById("box");

        //     document.onclick = function () {

        //        move( oBox , {width:'200px',height:"200px",left:"200px",opacity:1} , 2000);
        //     };
        //
        // })();






    /*
    方法名称: 运动框架
    适用范围: 类添加删除
    作者: 阿飞老师
    类型: javascript
    保存日期: 2017-04-15
   */

    // 使用方法removeClass(oBox,"on txt wrap");
    // 添加类名
    function addClass(ele , cName) {

        var arr = ele.className.split(" ").concat(cName.split(" "));

        for (var i = 0; i < arr.length; i++){

            for (var j = arr.length-1; j > i; j--){

                if ( arr[i] == arr[j] )arr.splice(j,1);
            }
        }

        ele.className = arr.join(" ");
    }

    //移除了名
    function removeClass(ele,cName) {

        var arr = ele.className.split(" "),
            arr1 = cName.split(" ");

        for (var i = 0; i < arr1.length; i++) {

            for (var j = 0; j < arr.length; j++) {

                if ( arr1[i] == arr[j] ){
                    arr.splice(j,1);
                }
            }
        }

        ele.className = arr.join(" ");
    }
