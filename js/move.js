		function startmove(target,jsonmove,fn,time) {
		clearInterval(target.timer);
		if(!time){
			time = 30;
		}
		target.timer = setInterval(function() {

			var flag = true;//标记位，在执行同时运动时记录是否每个运动都到达终点

			for(var attr in jsonmove) {
				//取值
				var attrVal = getStyle(target,attr);
				if (attr == 'opacity') {
					attrVal = Math.round(parseFloat(attrVal)*100);
				}else{
					attrVal = parseInt(attrVal);
				}
				//算速度
				var speed = (jsonmove[attr] - attrVal) / 10;
				speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
				//判断停止
				if(jsonmove[attr] != attrVal){
					flag = false;
					if (attr == 'opacity'){
						target.style.filter = 'alpha(opacity:'+( attrVal + speed )+ ')';
						target.style.opacity =  ( attrVal + speed ) / 100;
					}else {
						target.style[attr] = attrVal + speed + 'px';
					}
				}			
			}
			if(flag){
					clearInterval(target.timer);
					if(fn) {
						fn();
					}
				}
		
		},time);
		};

		function getStyle(obj,attr) {
			if(obj.currentStyle) {
				return obj.currentStyle[attr];
			}else {
				return window.getComputedStyle(obj,null)[attr];
			}
		};