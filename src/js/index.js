;require(['config'],function(){
	require(['jquery','TTCarousel','common','lazyload'],function($,Carousel,common,lazyload){
		var $carList = $('.carList');
		var $shoppingcar = $('.shoppingcar');

		// header显示用户名
		var username = location.search.slice(10);
		var str = `<a href="#" class="a1"><b style="font-size:16px;">${username}</b>,欢迎登录名鞋库</a>
					<a href="html/login.html">退出</a>
		`;
		$('header .one').html(str);

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