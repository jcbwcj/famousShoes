;require(['config'],function(){
	require(['jquery','common'],function($,common){
		
		// 通过cookie获取购物车商品信息
		var cookieGoodsList = getCookie('cookieGoodsList');
		cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
		console.log(cookieGoodsList);

		var $main = $('main');

		// 显示cookie数据到页面
		showCarList();

		function showCarList(){
			var res = cookieGoodsList.map(function(item){
				return  `
					<tr>
						<td><img src="${item.url}" data-guid="${item.guid}"></td>
						<td class="msg">${item.msg} </td>
						<td><i class="price">${item.price}</i></td>
						<td class="qty"><i class="minus">&minus;</i><input type="text" value="${item.qty}"><i
						class="plus">&plus;</i></td>
						<td>￥<i class="total">${item.qty*(item.price).slice(1)}</i></td>
						<td class="del"><span>收藏</span><br><i>删除</i></td>
					</tr>
			`;
			}).join('');
			// console.log(res);
			$main.find('tbody').append(res);
			
		};


		// 点击加减按钮效果(变量声明提前，但赋值还在原地)
		var $qty = $main.find('.qty');
		var $price = $('.price');
		var $total = $('.total');

		// 显示总数
		showRes();

		// 点击按钮加减数量
		$qty.on('click','.minus',function(){
			var res = $(this).siblings('input').val();
			res--;

			if(res<=1){
				res = 1;
			}
			$(this).siblings('input').val(res);
			$(this).closest('tr').find('.total').text(res*$(this).closest('tr').find('.price').text().slice(1));
			
			showRes();

			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		}).on('click','.plus',function(){
			var res = $(this).siblings('input').val();
			res++;
			if(res>=10){
				res = 10;
			}
			$(this).siblings('input').val(res);
			$(this).closest('tr').find('.total').text(res*$(this).closest('tr').find('.price').text().slice(1));
			showRes();

			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		})

		// 手动输入数量
		$qty.children('input').blur(function(){

			if($(this).val()<1){
				$(this).val(1);
			}else if($(this).val()>10){
				$(this).val(10);
			}

			$(this).closest('tr').find('.total').text($(this).val()*$(this).closest('tr').find('.price').text().slice(1));
			showRes();

			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		});

		// 点击删除
		$('.del').on('click','i',function(){
			var $currentTr = $(this).closest('tr');
			$currentTr.find('input').val(0);
// -----------------------没写完---------------------------------
			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		})


		// 显示总数、总价
		function showRes(){
			var $qtyAll = $('.qtyAll');
			var $totalAll = $('.totalAll');

			var resQtyAll = 0;
			var resTotalAll = 0;
			for(var i=0;i<$price.length;i++){

				var res = $price.eq(i).text().slice(1)*$qty.eq(i).find('input').val();
				$total.eq(i).val(res); 
				resTotalAll += $total.eq(i).val()*1;
				resQtyAll +=  $qty.eq(i).find('input').val()*1;
			}
			$qtyAll.text(resQtyAll);
			$totalAll.text(resTotalAll);
		}

		// cookie改变
		function cookieChange(){
			
			var $currentTr = $(this).closest('tr');
			var guid = $currentTr.find('img').attr('data-guid');
            cookieGoodsList = JSON.parse(getCookie('cookieGoodsList'));

            for(var i=0;i<cookieGoodsList.length;i++){
				if(cookieGoodsList[i].guid === guid){

					var newQty = cookieGoodsList[i].qty;
					newQty = $currentTr.find('input').val();
					cookieGoodsList[i].qty = newQty;

					if(cookieGoodsList[i].qty<=0){
						$currentTr.remove();
						showRes();
						cookieGoodsList.splice(i,1);
					}
					break;
				}
			};
			
			// cookie有效期7天
			var now = new Date();
			now.setDate(now.getDate() + 7);

			setCookie('cookieGoodsList',JSON.stringify(cookieGoodsList),now.toUTCString(),'/');
console.log(JSON.parse(getCookie('cookieGoodsList')));		
		};
		
	})
})
;
/**
 * [获取随机颜色]
 * @return 返回一个rgb颜色:'rgb(255,0,0)'
 */
function randomColor(){
	var r = randomNum(0,255);
	var g = randomNum(0,255);
	var b = randomNum(0,255);

	var res = 'rgb(' + r + ',' + g + ',' + b + ')';

	// 把随机颜色返回
	return res;
}


/**
 * [获取随机整数]
 * @return 返回一个随机整数
 */
function randomNum(min,max){
	//得到一个min到max之间随机整数
	var res = parseInt(Math.random()*(max-min+1)) + min;

	// 把随机整数返回
	return res;
}

/**
 * [删除非元素节点]
 * @param  {[array]} nodes [节点]
 * @return {[array]}       [把过滤后的元素返回]
 */
function getElement(nodes){
	var res = [];

	for(var i=0;i<nodes.length;i++){
		if(nodes[i].nodeType === 1){
			res.push(nodes[i]);
		}
	}

	return res;
}

/**
 * [获取元素样式的方法，兼容ie8-]
 * @param  {Element} ele  [要获取样式的元素]
 * @param  {String} attr [css属性]
 * @return {String}      [返回css属性对应的样式]
 */
function getStyle(ele,attr){
	// 保存最终样式
	var res;
	if(window.getComputedStyle){
		res = getComputedStyle(ele)[attr];
	}else if(ele.currentStyle){
		res = ele.currentStyle[attr];
	}else{
		res = ele.style[attr];
	}

	return res;
}
// var box = document.getElementById('box')
// getStyle(box,'background-color')

/**
 * [给元素添加事件，兼容IE8以下浏览器]
 * @param {Node} 	 ele     [需要绑定事件的元素]
 * @param {String} 	 type    [事件类型]
 * @param {Function} handler [事件处理函数]
 * @param {Boolean}  capture [是否捕获]
 */
function addEvent(ele,type,handler,capture){
	// 判断是否支持事件监听
	// 标准浏览器
	if(ele.addEventListener){
		ele.addEventListener(type,handler,capture);
	}

	// IE8-
	else if(ele.attachEvent){
		ele.attachEvent('on' + type,handler);
	}

	// 传统绑定事件方式
	else{
		ele['on' + type] = handler;
	}
}
// addEvent(box,'click',function(){},true)


/*
	Cookie的增删查改
 *
/**
 * [设置和修改cookie]
 * @param {[String]} name    [cookie名]
 * @param {[String]} val     [cookie值]
 * @param {[Date]} expires 	 [有效期]
 * @param {[String]} path    [路径]
 */
function setCookie(name,val,expires,path){
	var str_cookie = name + '=' + val;

	// 如果存在有效期
	if(expires){
		str_cookie += ';expires=' + expires
	}

	// 如果存在路径设置
	if(path){
		str_cookie += ';path=' + path
	}

	document.cookie = str_cookie;
}

//setCookie('top','120',now,'/');
/**
 * [删除cookie]
 * @param  {[String]} name [要删除的cookie名]
 */
function removeCookie(name){
	var now = new Date();
	now.setDate(now.getDate()-1);
	now = now.toUTCString();

	// document.cookie = name + '=null;expires=' + now;
	setCookie(name,null,now);
}
//removeCookie('top');

/**
 * [获取cookie值]
 * @param  {[String]} name [需要获取的cookie名]
 * @return {[String]}      [返回对应cookie的值]
 */
function getCookie(name){
	var cookies = document.cookie;
	if(!cookies){
		return '';
	}

	var res = '';
	var arr = cookies.split('; ');
	arr.forEach(function(item){
		var temp = item.split('=');
		if(temp[0] === name){
			res = temp[1];
		}
	});

	return res;
}
//getCookie('tops');//120

/**
 * [动画函数]
 * @param  {[Node]}   ele      [执行动画的元素]
 * @param  {[String]}   attr     [动画改变的属性]
 * @param  {[Number]}   target   [属性目标值]
 * @param  {Function} callback [回调函数]
 */
/*function animate(ele,attr,target,callback){
	var timerName = attr + 'timer';

	// 创建定时器前先清除之前的定时器
	clearInterval(ele[timerName]);

	// 定时器与DOM节点绑定
	ele[timerName] = setInterval(function(){
		// 先获取当前值
		var current = getStyle(ele,attr);//'10px','20rem','50deg','1em';

		// 提取单位
		var unit = current.match(/[a-z]+$/i);//['px'],null
		unit = unit ? unit[0] : '';

		// 提取当前值（数值）
		current = parseFloat(current);

		// 计算速度
		var speed = (target-current)/10;//0.3,-0.2


		// 单独处理opacity属性
		if(attr === 'opacity'){
			speed = speed>0 ? 0.1 : -0.1;
		}else{
			// 根据正负值分别取整
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		}


		// 到达目标值后停止定时器
		if(speed===0 || current === target){
			clearInterval(ele[timerName]);

			// 重置current值
			current = target - speed;

			if(typeof callback === 'function'){
				callback();
			}
		}


		ele.style[attr] = current + speed + unit;
	},50);
}*/
//animate(box,'width',120)

/**
 * [动画函数]
 * @param  {[Node]}   ele      [执行动画的元素]
 * @param  {[Object]}   opt      [需要改变的 {css属性:属性值}]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
function animate(ele,opt,callback){
	// 记录属性动画数量
	var timerLen = 0;

	//遍历opt对象，为每个属性设定一个定时器
	for(var attr in opt){
		timerLen++;

		createTimer(attr);
	}

	function createTimer(attr){
		// 获取目标值
		var target = opt[attr];

		// 为每个属性创建一个定时器标识
		var timerName = attr + 'timer';


		// 创建定时器前先清除之前的定时器
		clearInterval(ele[timerName]);


		// 定时器与DOM节点绑定
		ele[timerName] = setInterval(function(){
			// 先获取当前值
			var current = getStyle(ele,attr);//'10px','20rem','50deg','1em';

			// 提取单位
			var unit = current.match(/[a-z]+$/i);//['px'],null
			unit = unit ? unit[0] : '';

			// 提取当前值（数值）
			current = parseFloat(current);

			// 计算速度
			var speed = (target-current)/10;//0.3,-0.2


			// 单独处理opacity属性
			if(attr === 'opacity'){
				speed = speed>0 ? 0.1 : -0.1;
			}else{
				// 根据正负值分别取整
				speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			}


			// 到达目标值后停止定时器
			if(speed===0 || current === target){
				clearInterval(ele[timerName]);

				// 重置current值
				current = target - speed;

				// 每执行完一个动画timerLen减一
				timerLen--;

				if(typeof callback === 'function' && timerLen===0){
					callback();
				}
			}


			ele.style[attr] = current + speed + unit;
		},50);
	}
	
}

/**
 * [ajax请求]
 * @param  {[Object]} options [{url:xx,type:'post/get',data:{id:1},success:fn]
 * @return {[type]}         [description]
 */
function ajax(options){

	// 默认参数
	var defaults = {
		// 请求类型
		type:'get',

		// 是否异步
		async:true
	}

	// 扩展默认参数
	for(var attr in options){
		defaults[attr] = options[attr];
	}

	var opt = defaults;


	var xhr = null;

	try{
		xhr = new XMLHttpRequest();
	}catch(error){
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(err){
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				alert('你不适合浏览这个网站，请下载google浏览器')
			}
		}
		
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)){
			if(typeof opt.callback === 'function'){//[]{}
				var res = xhr.responseText;

				// if(/^[\[\{}]/.test(xhr.responseText)){
				// 	res = JSON.parse(xhr.responseText);
				// }


				// 自动转换json字符串
				try{
					res = JSON.parse(res);
				}catch(err){
					res = res;
				}

				opt.callback(res);
			}
		}
	}

	// 处理数据
	// {id:20,msg:'xx'} => 'id=20&msg=xx'
	var params = '';
	if(opt.data){
		for(var attr in opt.data){
			params += attr + '=' + opt.data[attr] + '&';
		}

		// 去掉最后一个&
		params = params.slice(0,-1);
	}

	// 判断get/post请求，以便传递参数
	if(opt.type === 'get'){
		opt.url += '?' + params;
	}

	xhr.open(opt.type,opt.url,opt.async);

	if(opt.type === 'post'){
		xhr.setRequestHeader('content-type',"application/x-www-form-urlencoded");
	}else{
		params = null;
	}

	xhr.send(params);
}
//如何让ajax方法支持jsonp请求
/*ajax({
	url:'api/weibo_like.php',
	type:'post',
	data:{id:1},
	success:function(data){
		// 处理数据
	}
});*/


/**
 * [判断数据类型]
 * @param  {[type]} data [传入需要判断其数据类型的数据]
 * @return {[String]}      [返回当前数据的数据类型]
 */
function type(data){
	// [object Object]
	return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}
// type(123) => 'number'
// type({}) => 'object'
// type([]) => 'array'
// type(/aa/) => 'regexp'





/*function buyCar(){
	var $carList = $('.carList');
	var $shoppingcar = $('.shoppingcar');
	var cookieGoodsList = getCookie('cookieGoodsList');
	cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
}

buyCar.prototype.showCarList = function(){	
	var cookieGoodsList = getCookie('cookieGoodsList');
	cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
	var res = cookieGoodsList.map(function(item){
		return `
			<li>
				<img src="${item.url.replace('../','')}" data-guid="${item.guid}"/>
				<a href="#">${item.msg} (颜色：${item.color}  尺码：${item.size})</a>
				<p class="car-qty">${item.qty}</p>
				<p class="car-price"><b>￥${item.price.slice(1)}</b><span class="btn-close">删除</span></p>
			</li>
		`;
	}).join('');
	res += `<div>总价：￥<span class="carListTotal"></span></div>
						<button>现在去结算</button>`;
	$carList.html(res);
}

buyCar.prototype.showRes(){
	var $carQty = $carList.find('.car-qty');
	var $carPrice = $carList.find('.car-price b');
	var resNum = 0;
	var resTotal = 0;
	for(var i=0;i<$carList.find('.car-qty').length;i++){
		resNum += parseInt($carQty.eq(i).text());
		resTotal += parseInt($carQty.eq(i).text())*parseInt($carPrice.eq(i).text().slice(1));
	}
	$('.shoppingcarNum').text(resNum);
	$('.carListTotal').text(resTotal);
	// console.log(resTotal);
};
*/

/*
		// 根据cookie写入购物车html
		buyCar.prototype.showCarList = function(){
			var cookieGoodsList = getCookie('cookieGoodsList');
			cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
			var res = cookieGoodsList.map(function(item){
				return `
					<li>
						<img src="${item.url.replace('../','')}" data-guid="${item.guid}"/>
						<a href="#">${item.msg} (颜色：${item.color}  尺码：${item.size})</a>
						<p class="car-qty">${item.qty}</p>
						<p class="car-price"><b>￥${item.price.slice(1)}</b><span class="btn-close">删除</span></p>
					</li>
				`;
			}).join('');
			res += `<div>总价：￥<span class="carListTotal"></span></div>
								<button>现在去结算</button>`;
			$carList.html(res);
			showRes();
		};


		// 购物车数量、总价计算
		buyCar.prototype.showRes = function(){
			var $carQty = $carList.find('.car-qty');
			var $carPrice = $carList.find('.car-price b');
			var resNum = 0;
			var resTotal = 0;
			for(var i=0;i<$carList.find('.car-qty').length;i++){
				resNum += parseInt($carQty.eq(i).text());
				resTotal += parseInt($carQty.eq(i).text())*parseInt($carPrice.eq(i).text().slice(1));
			}
			$('.shoppingcarNum').text(resNum);
			$('.carListTotal').text(resTotal);
			// console.log(resTotal);
		};

		$shoppingcar.mouseenter(function(){
				$shoppingcar.css('background-color','#f4a318');
				$carList.css('visibility','visible');
			}).mouseleave(function(){
				$shoppingcar.css('background-color','#FCFCFC');
				$carList.css('visibility','hidden');
			});

		$carList.on('click','button',function(){
					location.href = 'html/buyCar.html';
				})


		$carList.on('click','.btn-close',function(){
		            var $currentLi = $(this).closest('li');
		            // $currentLi.remove();
		            var guid = $currentLi.children('img').attr('data-guid');
		            cookieGoodsList = JSON.parse(getCookie('cookieGoodsList'));

		            for(var i=0;i<cookieGoodsList.length;i++){
						if(cookieGoodsList[i].guid === guid){

							// cookieGoodsList[i].qty -= 1;//！！！千万不要这么用，前面的不是变量
							var newQty = cookieGoodsList[i].qty;
							newQty--;
							cookieGoodsList[i].qty = newQty;

							if(cookieGoodsList[i].qty<=0){
								$currentLi.remove();
								cookieGoodsList.splice(i,1);
							}
							break;
						}
					}

					var now = new Date();
					now.setDate(now.getDate() + 7);
					setCookie('cookieGoodsList',JSON.stringify(cookieGoodsList),now.toUTCString(),'/');
					showCarList();
		            
		        });*/

;require.config({
	// 解决缓存
	urlArgs:'v='+Date.now(),
	paths:{
		'jquery':'../lib/jquery-3.2.1',
		'TTCarousel':'../lib/jquery-TTCarousel/jquery-TTCarousel',
		'gdszoom':'../lib/jquery-gdszoom/jquery.gdszoom',
		'common':'common',
		'lazyload':'../lib/jquery.lazyload.min',
		'validate':'../lib/jquery-validate/jquery.validate',
		'messages':'../lib/jquery-validate/localization/messages_zh'
	},
	shim:{
		'gdszoom':['jquery'],
       	'TTCarousel':['jquery'],
       	'lazyload':['jquery'],
       	'validate':['jquery'],
       	'messages':['validate']
	}
});
;require(['config'],function(){
	require(['jquery','gdszoom','common'],function($,gdszoom,common){
		
		// 获取网址URL中的guid（去掉问号，以及非相关字符串）
		var guid = location.search.slice(6);
		// 请求后台数据
		$.ajax({
			url:'../api/goodsDetail.php',
			dataType:'json',
			data:{
				guid:guid
			},
			success:function(res){
				// console.log(res[0])
				showHtml(res[0]);

				var $spicImg = $('.spic img');
				var $buyCar = $('.buyCar');
				var $mpic = $('.mpic');
				var $msg = $('.goods-price');
				var $shoppingcar = $('.shoppingcar');
				var $carList = $('.carList');
				
				// 放大镜效果
				$('.mpic').gdszoom({
						width:300,height:300,position:'right'
				});

				// 放大镜 小图点击切换
				$spicImg.click(function(){
						$spicImg.removeClass('active');
						$(this).addClass('active');

						$('.mpic img').attr({
							'src':this.src.replace('s.jpg','m.jpg'),
							'data-big':this.src.replace('s.jpg','.jpg'),
						});
				});


				// 点击勾选选项效果
				var $gp = $('.goods-price');
				
				var $minus = $gp.find('.minus');
				var $plus = $gp.find('.plus');
				var $countNum = $gp.find('.countNum');

				$gp.find('span').click(function(){
					$(this).addClass('active').siblings().removeClass('active');
				});
				// 点击减少
				$minus.mousedown(function(){
					$(this).addClass('active');
					var res = $countNum.val();
					res--;
					if(res<=1){
						res = 1;
					}
					$countNum.val(res);
				}).mouseup(function(){
					$(this).removeClass('active');
				});
				// 点击增加
				$plus.mousedown(function(){
					$(this).addClass('active');
					var res = $countNum.val();
					res++;
					if(res>=10){
						res =10;
					}
					$countNum.val(res);
				}).mouseup(function(){
					$(this).removeClass('active');
				});
				// 手动输入
				$countNum.blur(function(){

					if($countNum.val()<1){
						$countNum.val(1);
					}else if($countNum.val()>10){
						$countNum.val(10);
					}
				});

				var cookieGoodsList = getCookie('cookieGoodsList');
				cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];

				// 页面加载时写入购物车html
				showCarList();
				
				// 添加到购物车效果
				var $img = $mpic.children('img');
				$buyCar.click(function(){
					var $cloneImg = $img.clone();
					$cloneImg.css({
						position:'absolute',
						left:$img.offset().left,
						top:$img.offset().top,
						width:$img.outerWidth(),
						height:$img.outerHeight()
					}).appendTo('body');

					$cloneImg.animate({
						left:$carList.offset().left,
		                top:$carList.offset().top + $carList.outerHeight(),
		                width:10,
		                height:10
					},function(){
						cookieChange();
						showRes();
						$cloneImg.remove();
					});
				});

				// 购物车点击删除效果
				$carList.on('click','.btn-close',function(){
		            var $currentLi = $(this).closest('li');
		            // $currentLi.remove();
		            var guid = $currentLi.children('img').attr('data-guid');
		            cookieGoodsList = JSON.parse(getCookie('cookieGoodsList'));

		            for(var i=0;i<cookieGoodsList.length;i++){
						if(cookieGoodsList[i].guid === guid){

							// cookieGoodsList[i].qty -= 1;//！！！千万不要这么用，前面的不是变量
							var newQty = cookieGoodsList[i].qty;
							newQty--;
							cookieGoodsList[i].qty = newQty;

							if(cookieGoodsList[i].qty<=0){
								$currentLi.remove();
								cookieGoodsList.splice(i,1);
							}
							break;
						}
					}

					var now = new Date();
					now.setDate(now.getDate() + 7);
					setCookie('cookieGoodsList',JSON.stringify(cookieGoodsList),now.toUTCString(),'/');
					showCarList();
		            
		        });

				// 购物车移入移出效果
				$shoppingcar.mouseenter(function(){
					$shoppingcar.css('background-color','#f4a318');
					$carList.css('visibility','visible');
				}).mouseleave(function(){
					$shoppingcar.css('background-color','#FCFCFC');
					$carList.css('visibility','hidden');
				});


				// 根据cookie写入购物车html
				function showCarList(){
					var res = cookieGoodsList.map(function(item){
						return `
							<li>
								<img src="${item.url}" data-guid="${item.guid}"/>
								<a href="#">${item.msg} (颜色：${item.color}  尺码：${item.size})</a>
								<p class="car-qty">${item.qty}</p>
								<p class="car-price"><b>￥${item.price.slice(1)}</b><span class="btn-close">删除</span></p>
							</li>
						`;
					}).join('');
					res += `<div>总价：￥<span class="carListTotal"></span></div>
										<button>现在去结算</button>`;
					$carList.html(res);
					showRes();
				};


				// 购物车数量、总价计算
				function showRes(){
					var $carQty = $carList.find('.car-qty');
					var $carPrice = $carList.find('.car-price b');
					var resNum = 0;
					var resTotal = 0;
					for(var i=0;i<$carList.find('.car-qty').length;i++){
						resNum += parseInt($carQty.eq(i).text());
						resTotal += parseInt($carQty.eq(i).text())*parseInt($carPrice.eq(i).text().slice(1));
					}
					$('.shoppingcarNum').text(resNum);
					$('.carListTotal').text(resTotal);
					// console.log(resTotal);
				};

				// cookie
				function cookieChange(){

					// 商品存在于cookie中
					for(var i=0;i<cookieGoodsList.length;i++){
						if(cookieGoodsList[i].guid === guid){
							cookieGoodsList[i].qty += $msg.find('input').val()*1;
							break;
						}
					}

					// 商品不存cookie中
					if(i===cookieGoodsList.length){
						// 获取<当前>商品的信息
						var obj = {
							url:$img.attr('src'),
							guid:$img.attr('data-guid'),
							color:$msg.find('.color .active').text(),
							msg:$msg.find('h3').text(),
							size:$msg.find('.size .active').text(),
							price:$msg.find('b').text(),
							qty:$msg.find('input').val()*1
						};

						// 往数组中添加当前商品
						cookieGoodsList.push(obj);
					}

					// console.log(cookieGoodsList)
					showCarList();
					
					// cookie有效期7天
					var now = new Date();
					now.setDate(now.getDate() + 7);

					setCookie('cookieGoodsList',JSON.stringify(cookieGoodsList),now.toUTCString(),'/');
				};



				$carList.on('click','button',function(){
					location.href = 'buyCar.html';
				})
				
			}


		});

		// 从后台数据库获取id信息写入页面
		function showHtml(item){
			var html = `
				<div class="fdj">
					<div class="mpic">
						<img src="../${item.imgurl}" data-big="../${item.imgurl}" data-guid="${item.id}">
					</div>
					<div class="spic clearfix">
						<img src="../${item.imgurl.replace('1m.jpg','1s.jpg')}" class="active">
						<img src="../${item.imgurl.replace('1m.jpg','2s.jpg')}" >
						<img src="../${item.imgurl.replace('1m.jpg','3s.jpg')}" >
						<img src="../${item.imgurl.replace('1m.jpg','4s.jpg')}" >
						<img src="../${item.imgurl.replace('1m.jpg','5s.jpg')}" >
						<img src="../${item.imgurl.replace('1m.jpg','6s.jpg')}" >
						<img src="../${item.imgurl.replace('1m.jpg','7s.jpg')}" >
					</div>
				</div>
				<div class="goods-price">
					<h3>${item.name} 新款 ${item.category} ${item.id}</h4>
					<ul>
						<li>吊牌价：<i>￥999.00</i></li>
						<li>销售价：<i>￥679.00</i></li>
						<li>促销价：<b class="priceNow">￥${item.price}</b></li>
						<li>运费： 名鞋库会员满399包邮  ( 不包括货到付款 )</li>
					</ul>
					<p class="size">尺码：<span class="active">41</span><span>42</span><span>43</span></p>
					<p class="color">颜色：<span class="active">黑色</span><span>蓝色</span></p>
					<p class="count">购买数量：<i class="minus">&minus;</i><input type="text" value="1" class="countNum"><i class="plus">&plus;</i><u>最多限购10件</u></p>
					<div class="btnBuy">
						<button class="buyNow">立即购买</button><button class="buyCar">加入购物车</button>
					</div>
				</div>
				<div class="detail">
				</div>
			`;
			$('.goods section').html(html);

			$('.location span:nth-child(7)').text(item.name);
			$('.location span:nth-child(9)').text(item.category);
			$('.location span:nth-child(11)').text(item.name+item.id);
		}



		$('.footbrand').on('mouseenter','a',function(){
			$(this).css('background-color','rgba(0,0,0,0.2)');
		}).on('mouseleave','a',function(){
			$(this).css('background-color','rgba(0,0,0,0)');
		});



	});

});
;require(['config'],function(){
	require(['jquery','TTCarousel','common','lazyload'],function($,Carousel,common,lazyload){
		var $carList = $('.carList');
		var $shoppingcar = $('.shoppingcar');

		// header显示用户名
		if(location.search){
			var username = location.search.slice(10);
			var str = `<a href="#" class="a1"><b style="font-size:16px;">${username}</b>,欢迎登录名鞋库</a>
						<a href="html/login.html">退出</a>
			`;
			$('header .one').html(str);
		}

		// 轮播图
		$('.carousel').TTCarousel({
			width:1190,
			height:500,
			imgs:['images/lbt1.jpg','images/lbt2.jpg','images/lbt3.jpg']
		});


		// #sporsLog效果
		$('#sportsLog').on('mouseenter','img',function(){
			$(this).css('top',-84);
		}).on('mouseleave','img',function(){
			$(this).css('top',0);
		});

		// footbrand效果
		$('.footbrand').on('mouseenter','a',function(){
			$(this).css('background-color','rgba(0,0,0,0.2)');
		}).on('mouseleave','a',function(){
			$(this).css('background-color','rgba(0,0,0,0)');
		});
		
		// 友情链接无缝滚动
		var $ul = $('.friendlinks').find('ul');
		var top = 0;
		
		var ultimer = setInterval(show,3000);
		
		$ul.on('mouseenter',function(){
			clearInterval(ultimer);
		}).on('mouseleave',function(){
			ultimer = setInterval(show,3000);
		});

		function show(){
			top -= 16;
			if(top<-48){
				top = -16;
				$ul.css('top',0);
			}
			$ul.animate({'top':top});
		}


		// goodslist数据库传入
		$.ajax({
				url:'api/index.php',
				dataType:'json',
				
				success:function(res){
					
					showGoodslist(res);
					return false;
				}
			});


		// 封装函数，减少代码重复
		function showGoodslist(res){
			
			var html = res.map(function(item){
				
				return `
					<dl>
						<dt>
							<a href="html/goodsDetail.html?guid=${item.id}">
								<img class="lazy" data-original="${item.imgurl}">
							</a>
						</dt>
						<dd>
							<a href="html/goodsDetail.html?guid=${item.id}">
								<ul>
									<li class="f1">
										${item.name} &nbsp;&nbsp;&nbsp; ${item.category} &nbsp;&nbsp;&nbsp; ${item.color}
									</li>
									<li class="f2">
										<i class="price">￥${item.price}</i>
										<i class="del_price">￥${item.del_price}</i>
										<i class="buy_btn">立即抢购</i>
									</li>
								</ul>
							</a>
						</dd>
					</dl>
				`;
			}).join('');
			$('.goodslist').html(html);
			
			// 设置懒加载 
			// fadeIn/slideDown 图片加载效果  
			// threshold滚动到图片xx位置时才触发加载图片
			$('.lazy').lazyload({effect:'fadeIn',threshold:10});
		};



		// menu 标签切换效果
		$('.menu_l .type').on('mouseenter','li',function(){
			$(this).animate({'background-positionY':0}).siblings().animate({'background-positionY':-52});
			if($(this).is('.shoes')){
				$(this).parent().next().children('.contentshoes').show().siblings().hide();
			}else{
				$(this).parent().next().children('.contentshoes').hide().siblings().show();
			}
		});






		showCarList();
		// 根据cookie写入购物车html
		function showCarList(){
			var cookieGoodsList = getCookie('cookieGoodsList');
			cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
			var res = cookieGoodsList.map(function(item){
				return `
					<li>
						<img src="${item.url.replace('../','')}" data-guid="${item.guid}"/>
						<a href="#">${item.msg} (颜色：${item.color}  尺码：${item.size})</a>
						<p class="car-qty">${item.qty}</p>
						<p class="car-price"><b>￥${item.price.slice(1)}</b><span class="btn-close">删除</span></p>
					</li>
				`;
			}).join('');
			res += `<div>总价：￥<span class="carListTotal"></span></div>
								<button>现在去结算</button>`;
			$carList.html(res);
			showRes();
		};


		// 购物车数量、总价计算
		function showRes(){
			var $carQty = $carList.find('.car-qty');
			var $carPrice = $carList.find('.car-price b');
			var resNum = 0;
			var resTotal = 0;
			for(var i=0;i<$carList.find('.car-qty').length;i++){
				resNum += parseInt($carQty.eq(i).text());
				resTotal += parseInt($carQty.eq(i).text())*parseInt($carPrice.eq(i).text().slice(1));
			}
			$('.shoppingcarNum').text(resNum);
			$('.carListTotal').text(resTotal);
			// console.log(resTotal);
		};

		$shoppingcar.mouseenter(function(){
				$shoppingcar.css('background-color','#f4a318');
				$carList.css('visibility','visible');
			}).mouseleave(function(){
				$shoppingcar.css('background-color','#FCFCFC');
				$carList.css('visibility','hidden');
			});

		$carList.on('click','button',function(){
					location.href = 'html/buyCar.html';
				})


		$carList.on('click','.btn-close',function(){
		            var $currentLi = $(this).closest('li');
		            // $currentLi.remove();
		            var guid = $currentLi.children('img').attr('data-guid');
		            cookieGoodsList = JSON.parse(getCookie('cookieGoodsList'));

		            for(var i=0;i<cookieGoodsList.length;i++){
						if(cookieGoodsList[i].guid === guid){

							// cookieGoodsList[i].qty -= 1;//！！！千万不要这么用，前面的不是变量
							var newQty = cookieGoodsList[i].qty;
							newQty--;
							cookieGoodsList[i].qty = newQty;

							if(cookieGoodsList[i].qty<=0){
								$currentLi.remove();
								cookieGoodsList.splice(i,1);
							}
							break;
						}
					}

					var now = new Date();
					now.setDate(now.getDate() + 7);
					setCookie('cookieGoodsList',JSON.stringify(cookieGoodsList),now.toUTCString(),'/');
					showCarList();
		            
		        });

	})
});
;require(['config'],function(){
	require(['jquery','common'],function($,common){
		var $goodslist = $('.goodslist');
		var pageNo = 1;
		var qty = 20;

		// 请求数据
		$.ajax({
			url:'../api/list.php',
			dataType:'json',
			data:{
				page:pageNo,
				qty:qty
			},
			success:function(res){
				show(res);

				// 分页显示
				var pageQty = Math.ceil(res.total/res.qty);

				var page_str = '';

				for(var i=1;i<=pageQty;i++){
					page_str += `<li ${res.pageNo==i?'class="active"':''}>
						<a href="#">${i}</a>
					</li>`;
				}
				// 字符串模板里面可进行三元运算 添加当前页码高亮

				$('.pagination').html(page_str);
			}
		});

		// 点击分页切换
		$('.pagination').on('click','a',function(){
			// 切换页码添加高亮
			$(this).parent().addClass('active').siblings().removeClass('active');
			pageNo = $(this).text();

			$.ajax({
				url:'../api/list.php',
				dataType:'json',
				data:{
					page:pageNo,
					qty:qty
				},
				success:function(res){
					// console.log(res)
					
					show(res);
				}
			});

			// 阻止浏览器的默认行为（如：点击页码切换时会跳到最顶端）
			// jquery中阻止浏览器默认行为的方式
			return false;
		});


		// 封装函数，减少代码重复
		function show(res){
			var html=res.data.map(function(item){
				
				// 拼接参数,便于下一页面获取数据
				// var params = `?guid=${item.id}&imgurl=${item.imgurl}&name=${item.name}&category=${item.category}&price=${item.price}&color=${item.color}`;
				// console.log(params);



				return `
					<dl>
						<dt>
							<a href="goodsDetail.html?guid=${item.id}">
								<img src="../${item.imgurl}" alt="">
							</a>
						</dt>
						<dd>
							<a href="goodsDetail.html?guid=${item.id}">
								<ul>
									<li class="f1">
										${item.name} &nbsp;&nbsp;&nbsp; ${item.category} &nbsp;&nbsp;&nbsp; ${item.color}
									</li>
									<li class="f2">
										<i class="price">￥${item.price}</i>
										<i class="del_price">￥${item.del_price}</i>
										<i class="buy_btn">立即抢购</i>
									</li>
								</ul>
							</a>
						</dd>
					</dl>
				`;
			}).join('');
			$goodslist.html(html);
		};

		// 设置列表项动画效果
		$goodslist.on('mouseenter','dl',function(){
			this.style.transform = 'translateZ(60px)';
		}).on('mouseleave','dl',function(){
			this.style.transform = 'translateZ(0)';
		});



		$('.footbrand').on('mouseenter','a',function(){
			$(this).css('background-color','rgba(0,0,0,0.2)');
		}).on('mouseleave','a',function(){
			$(this).css('background-color','rgba(0,0,0,0)');
		});


		var $carList = $('.carList');
		var $shoppingcar = $('.shoppingcar');

		showCarList();
		// 根据cookie写入购物车html
		function showCarList(){
			var cookieGoodsList = getCookie('cookieGoodsList');
			cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
			var res = cookieGoodsList.map(function(item){
				return `
					<li>
						<img src="${item.url}" data-guid="${item.guid}"/>
						<a href="#">${item.msg} (颜色：${item.color}  尺码：${item.size})</a>
						<p class="car-qty">${item.qty}</p>
						<p class="car-price"><b>￥${item.price.slice(1)}</b><span class="btn-close">删除</span></p>
					</li>
				`;
			}).join('');
			res += `<div>总价：￥<span class="carListTotal"></span></div>
								<button>现在去结算</button>`;
			$carList.html(res);
			showRes();
		};


		// 购物车数量、总价计算
		function showRes(){
			var $carQty = $carList.find('.car-qty');
			var $carPrice = $carList.find('.car-price b');
			var resNum = 0;
			var resTotal = 0;
			for(var i=0;i<$carList.find('.car-qty').length;i++){
				resNum += parseInt($carQty.eq(i).text());
				resTotal += parseInt($carQty.eq(i).text())*parseInt($carPrice.eq(i).text().slice(1));
			}
			$('.shoppingcarNum').text(resNum);
			$('.carListTotal').text(resTotal);
			// console.log(resTotal);
		};

		$shoppingcar.mouseenter(function(){
				$shoppingcar.css('background-color','#f4a318');
				$carList.css('visibility','visible');
			}).mouseleave(function(){
				$shoppingcar.css('background-color','#FCFCFC');
				$carList.css('visibility','hidden');
			});

		$carList.on('click','button',function(){
					location.href = 'buyCar.html';
				})


		$carList.on('click','.btn-close',function(){
		            var $currentLi = $(this).closest('li');
		            // $currentLi.remove();
		            var guid = $currentLi.children('img').attr('data-guid');
		            cookieGoodsList = JSON.parse(getCookie('cookieGoodsList'));

		            for(var i=0;i<cookieGoodsList.length;i++){
						if(cookieGoodsList[i].guid === guid){

							// cookieGoodsList[i].qty -= 1;//！！！千万不要这么用，前面的不是变量
							var newQty = cookieGoodsList[i].qty;
							newQty--;
							cookieGoodsList[i].qty = newQty;

							if(cookieGoodsList[i].qty<=0){
								$currentLi.remove();
								cookieGoodsList.splice(i,1);
							}
							break;
						}
					}

					var now = new Date();
					now.setDate(now.getDate() + 7);
					setCookie('cookieGoodsList',JSON.stringify(cookieGoodsList),now.toUTCString(),'/');
					showCarList();
		            
		        });


	});
});
;require(['config'],function(){
	require(['jquery'],function($){

		$('button').on('click',function(){
			var $username = $('#username').val();
			var $password = $('#password').val();

			$.ajax({
				url:'../api/login.php',
				data:{
					username:$username,
					password:$password
				},
				success:function(res){
					if(res === 'ok'){
						location.href = '../index.html?username='+$username;
					}else{
						alert('用户名或密码错误，请重新输入');
						$(':input').val('');
					}
				}
			})

			return false;

		});




	});
});
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.11',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite and existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part, length = ary.length;
            for (i = 0; i < length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                        //End of the line. Keep at least one non-dot
                        //path segment at the front so it can be mapped
                        //correctly to disk. Otherwise, there is likely
                        //no path mapping for a path starting with '..'.
                        //This can still fail, but catches the most reasonable
                        //uses of ..
                        break;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI,
                baseParts = baseName && baseName.split('/'),
                normalizedBaseParts = baseParts,
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name && name.charAt(0) === '.') {
                //If have a base name, try to normalize against it,
                //otherwise, assume it is a top-level require that will
                //be relative to baseUrl in the end.
                if (baseName) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = name.split('/');
                    lastIndex = name.length - 1;

                    // If wanting node ID compatibility, strip .js from end
                    // of IDs. Have to do this here, and not in nameToUrl
                    // because node allows either .js or non .js to map
                    // to same file.
                    if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                        name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                    }

                    name = normalizedBaseParts.concat(name);
                    trimDots(name);
                    name = name.join('/');
                } else if (name.indexOf('./') === 0) {
                    // No baseName, so this is ID is resolved relative
                    // to baseUrl, pull off the leading dot.
                    name = name.substring(2);
                }
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);
                context.require([id]);
                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        normalizedName = normalize(name, parentName, applyMap);
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue,
                           [defQueue.length, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return  getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if(args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs ? url +
                                        ((url.indexOf('?') === -1 ? '?' : '&') +
                                         config.urlArgs) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                 //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };

    define.amd = {
        jQuery: true
    };


    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));

;require(['config'],function(){
	require(['jquery','validate','messages'],function($,validate,messages){
		
		
		// 阅读并同意必须勾选
		var $checkbox = $(':checkbox');
		var $btn = $('button');
		$btn.attr('title','注册前必须同意协议');
		$checkbox.on('click',function(){
			if(this.checked){
				$btn.prop('disabled',false).removeClass('no');
			}else{
				$btn.prop('disabled',true).addClass('no');
			}
		});

		/*$('form').validate({
            // 验证规则
            rules:{
                username:{
                    required:true,
                    rangelength:[6,12]
                },
            	password:{
                    required:true,
                    rangelength:[6,12]
                }
            },

            // 自定义提示
            messages:{
                username:{
                    required:'*必填项'
                },
                password:{
                    required:'*必填项'
                }
            }
        });*/
		
		// 点击提交传递信息到后台
		$btn.on('click',function(){
			console.log(666)
			var $username = $('#username').val();
			var $password = $('#password').val();
			var $sure = $('#sure').val();
			if($password != $sure){
				$('#sure').val('');
				$('#password').val('');
				alert('两次密码输入不一致，请重新输入');

			}else if($username == '' || $password == ''){
				$checkbox.prop('checked',false);
				$btn.prop('disabled',true).addClass('no');
				alert('用户名密码不能为空值');
			}
			else{
				$.ajax({
					url:'../api/signup.php',
					type:'post',
					data:{
						username:$username,
						password:$password
					},
					success:function(res){
						if(res === 'ok'){
							alert('恭喜您注册成功，赶紧登陆抢购吧！');
						}else if(res == '已经存在'){
							alert('用户名已经存在，请另起一个用户名');
							$(':input').val('');
						}
					}
				});
			}
			// button标签会有默认行为，跳转到新的页面，会导致代码执行情况没法看见
			// 若使用input标签则不需要阻止浏览器默认行为
			return false;

		})
	});
});