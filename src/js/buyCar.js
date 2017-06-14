;require(['config'],function(){
	require(['jquery','common'],function($,common){
		var cookieGoodsList = getCookie('cookieGoodsList');
		cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
		console.log(cookieGoodsList);

		var $main = $('main');

		(function(){
			var res = '';
			res += cookieGoodsList.map(function(item){
				return  `
					<tr>
						<td><img src="${item.url}" alt=""></td>
						<td class="msg">${item.msg}</td>
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
			
		})();

		// 点击加减按钮效果
		var $qty = $main.find('.qty');
		var $price = $('.price');
		var $total = $('.total');
		$qty.on('click','.minus',function(){
			var res = $(this).siblings('input').val();
			res--;
			if(res<=1){
				res = 1;
			}
			$(this).siblings('input').val(res);console.log($price.text())
			$total.val(res*($price.text().slice(1)));
		}).on('click','.plus',function(){
			var res = $(this).siblings('input').val();
			res++;
			if(res>=10){
				res = 10;
			}
			$(this).siblings('input').val(res);
		})

		$qty.children('input').blur(function(){

			if($(this).val()<1){
				$(this).val(1);
			}else if($(this).val()>10){
				$(this).val(10);
			}

		});

	})
})
;