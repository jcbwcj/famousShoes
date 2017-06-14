;require(['config'],function(){
	require(['jquery'],function($){
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

				return `
					<dl>
						<dt>
							<a href="#">
								<img src="../${item.imgurl}" alt="">
							</a>
						</dt>
						<dd>
							<a href="#">
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

	});
});