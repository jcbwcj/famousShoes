/*
	无缝滚动轮播图插件
*/
;(function($){

	$.fn.TTCarousel = function(options){
		// 设置默认值
		var defaults = {
			width:320,
			height:320,
			index:0,
			autoPlay:true,
			duration:3000,
			type:'horizontal'
		}
		// 如有传入参数，覆盖默认值
		var opt = $.extend({},defaults,options);
		// 注：这里的this指向实例：$('.box')
		this.each(function(){
			// 这里的this指向DOM节点
			$(this).addClass('box');
//////////////////////////////////////////////////生成页面结构
			// 生成图片结构
			var $ul = $('<ul/>');
			$ul.html($.map(opt.imgs,function(item,idx){
				// console.log($('li').html())
				return `<li><img src="${item}"></li>`;

			}).join(''));
			$(this).append($ul);

			var cloneLi = $ul.children().eq(0).clone();
			cloneLi.appendTo($ul);
			$ul.width(opt.width*(opt.imgs.length+1));

			// 生成页码
			var $spans = $('<div/>').addClass('spans');
			$spans.html($.map(opt.imgs,function(item,idx){
				if(idx==0){
					return `<span class="active">${idx+1}</span>`;
				}else{
					return `<span>${idx+1}</span>`;
				}
			}).join(''));
			$(this).append($spans);
//////////////////////////////////////////////////////////自动轮播图片
			// 默认索引值
			var index = 0;
			var scrollTimer;
			var timer = setInterval(show,3000);

			function show(){
				index++;
				showPic();
				// console.log($('li'))
			};
/////////////////////////////////////////////////封装显示图片的函数
			// 封装显示图片的函数showPic
			function showPic(){
				if(index > opt.imgs.length){
					index = 1;
					$ul[0].style.left = 0;
				}else if(index < 0){
					index = opt.imgs.length;
				}
				// 给页码添加高亮
				light();

				// 轮播动画
				var target = -opt.width*index;
				// console.log(target)
				// $ul.animate({left:-opt.width*index},30);
				// 在启动定时器之前，清除之前额定时器
				clearInterval(scrollTimer);

				scrollTimer = setInterval(()=>{
					// 获取当前left值
					var currentLeft = $ul[0].offsetLeft;
					// 速度
					var speed = (target - currentLeft)/10;

					// 速度取整操作
					speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

					if(currentLeft == target || speed===0){
							clearInterval(scrollTimer);
							currentLeft = target - speed;
						}
					$ul[0].style.left = currentLeft + speed + 'px';
					
				},30);
			}
////////////////////////////////////////////////////////////
			// 显示高亮 给页码添加高亮
			function light(){
				
				// 添加前先清除所有
				for(var i=0;i<opt.imgs.length;i++){
					$spans[0].children[i].classList.remove('active');
				}
				// 高亮
				if(index === opt.imgs.length){
					$spans[0].children[0].classList.add('active');
				}else{
					$spans[0].children[index].classList.add('active');
				}
			}
//////////////////////////////////////////////////////////////添加左右按钮跳转			
			// 鼠标移入移出停止动画
			$(this).on('mouseenter',function(){
				clearInterval(timer);
			}).on('mouseleave',function(){
				timer = setInterval(show,3000);
			})

			// 左右按钮
			var $prev = $('<b/>').addClass('prev').html('&lt;');
			var $next = $('<b/>').addClass('next').html('&gt;');
			// 插入页面
			$(this).append($prev);
			$(this).append($next);

			// 绑定点击事件(左右切换)
			// 左
			$prev.on('click',function(){
				$prev.addClass('active');
				index--;
				jump();
				light();
			})
			// 右
			$next.on('click',function(){
				$next.addClass('active');
				index++;
				jump();
				light();
			})
			// 跳转封装函数
			function jump(){
				if(index > opt.imgs.length-1){
					index = 0;
					$ul[0].style.left = 0;
				}else if(index < 0){
					index = opt.imgs.length-1;
				}
				$ul[0].style.left = -index*opt.width + 'px';
			}

		});
		// 为了链式调用
		return this;
	}
})(jQuery);