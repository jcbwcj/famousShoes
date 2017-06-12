;require(['config'],function(){
	require(['jquery','TTCarousel'],function($,Carousel){
		
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
	})
});