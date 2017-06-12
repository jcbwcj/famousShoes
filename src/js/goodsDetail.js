;require(['config'],function(){
	require(['jquery','gdszoom'],function($,gdszoom){
		var $spicImg = $('.spic img');
		
		$('.mpic').gdszoom({
				width:300,height:300,position:'right'
		});

		$spicImg.click(function(){
				$spicImg.removeClass('active');
				$(this).addClass('active');

				$('.mpic img').attr({
					'src':this.src.replace('s.jpg','m.jpg'),
					'data-big':this.src.replace('s.jpg','.jpg')
				});
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
	});

});