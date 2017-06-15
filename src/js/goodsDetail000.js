;require(['config'],function(){
	require(['jquery','gdszoom','common'],function($,gdszoom,common){
		
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

		$spicImg.click(function(){
				$spicImg.removeClass('active');
				$(this).addClass('active');

				$('.mpic img').attr({
					'src':this.src.replace('s.jpg','m.jpg'),
					'data-big':this.src.replace('s.jpg','.jpg'),
					'data-price':$(this).attr('data-price')
				});
				$msg.find('.priceNow').text($(this).attr('data-price'));
		});


		// 点击选项效果
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



		$('.footbrand').on('mouseenter','a',function(){
			$(this).css('background-color','rgba(0,0,0,0.2)');
		}).on('mouseleave','a',function(){
			$(this).css('background-color','rgba(0,0,0,0)');
		});


		// 添加到购物车效果
		$buyCar.click(function(){
			var $img = $mpic.children('img');

			var $cloneImg = $img.clone();
			$cloneImg.css({
				position:'absolute',
				left:$img.offset().left,
				top:$img.offset().top,
				width:$img.outerWidth(),
				height:$img.outerHeight()
			}).appendTo('body');


			var str = `
				<img src="${$img.attr('src')}" alt="" />
				<a href="#">${$msg.find('h3').text()} (颜色：${$msg.find('.color .active').text()}  尺码：${$msg.find('.size .active').text()})</a>
				<p class="car-qty">${$msg.find('input').val()}</p>
				<p class="car-price"><b>${$msg.find('b').text()}</b><span class="btn-close">删除</span></p>
			`;
			// console.log(str);

			$cloneImg.animate({
				left:$carList.offset().left,
                top:$carList.offset().top + $carList.outerHeight(),
                width:10,
                height:10
			},function(){
				$('<li/>').html(str).prependTo($carList);

var obj = {
	url:$img.attr('src'),
	color:$msg.find('.color .active').text(),
	msg:$msg.find('h3').text(),
	size:$msg.find('.size .active').text(),
	price:$msg.find('b').text(),
	qty:$msg.find('input').val()
};

/*-------------cookie------------------*/
var cookieGoodsList = getCookie('cookieGoodsList');
console.log(obj);
cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];


				showRes();
				$cloneImg.remove();
			});

		});

		$carList.on('click','.btn-close',function(){
            var $currentLi = $(this).closest('li');
            $currentLi.remove();
            showRes();
        });

		$shoppingcar.mouseenter(function(){
			$shoppingcar.css('background-color','#f4a318');
			$carList.css('visibility','visible');
		}).mouseleave(function(){
			$shoppingcar.css('background-color','#FCFCFC');
			$carList.css('visibility','hidden');
		})

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
		}



	});

});