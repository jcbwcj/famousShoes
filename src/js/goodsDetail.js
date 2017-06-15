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