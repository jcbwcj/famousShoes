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
					<div class="col-sm-4 col-md-2">
						<div class="thumbnail">
							<img src="../${item.imgurl}" alt="">
							<div class="caption">
								<h3>${item.name}</h3>
								<p class="category">类型：${item.category}</p>
								<p class="price">价格：${item.price}</p>
								<p class="color">颜色：${item.color}</p>
								<p class="color">尺寸：${item.size}</p>
								<p>
									<a href="#" class="btn btn-primary btn-xs" role="button">添加到购物车</a>
								</p>
							</div>
						</div>
					</div>
				`;
			}).join('');
			$goodslist.html(html);
		};



	});
});