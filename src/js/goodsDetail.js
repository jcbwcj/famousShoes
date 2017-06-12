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
			})
	});

});