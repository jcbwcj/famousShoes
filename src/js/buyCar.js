;require(['config'],function(){
	require(['jquery','common'],function($,common){
		
		// 通过cookie获取购物车商品信息
		var cookieGoodsList = getCookie('cookieGoodsList');
		cookieGoodsList = cookieGoodsList ? JSON.parse(cookieGoodsList) : [];
		console.log(cookieGoodsList);

		var $main = $('main');

		// 显示cookie数据到页面
		showCarList();

		function showCarList(){
			var res = cookieGoodsList.map(function(item){
				return  `
					<tr>
						<td><img src="${item.url}" data-guid="${item.guid}"></td>
						<td class="msg">${item.msg} </td>
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
			
		};


		// 点击加减按钮效果(变量声明提前，但赋值还在原地)
		var $qty = $main.find('.qty');
		var $price = $('.price');
		var $total = $('.total');

		// 显示总数
		showRes();

		// 点击按钮加减数量
		$qty.on('click','.minus',function(){
			var res = $(this).siblings('input').val();
			res--;

			if(res<=1){
				res = 1;
			}
			$(this).siblings('input').val(res);
			$(this).closest('tr').find('.total').text(res*$(this).closest('tr').find('.price').text().slice(1));
			
			showRes();

			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		}).on('click','.plus',function(){
			var res = $(this).siblings('input').val();
			res++;
			if(res>=10){
				res = 10;
			}
			$(this).siblings('input').val(res);
			$(this).closest('tr').find('.total').text(res*$(this).closest('tr').find('.price').text().slice(1));
			showRes();

			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		})

		// 手动输入数量
		$qty.children('input').blur(function(){

			if($(this).val()<1){
				$(this).val(1);
			}else if($(this).val()>10){
				$(this).val(10);
			}

			$(this).closest('tr').find('.total').text($(this).val()*$(this).closest('tr').find('.price').text().slice(1));
			showRes();

			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		});

		// 点击删除
		$('.del').on('click','i',function(){
			var $currentTr = $(this).closest('tr');
			$currentTr.find('input').val(0);
// -----------------------没写完---------------------------------
			// 改变cookieChange中的this指向（不要用同名，会报错）
			var cc = cookieChange.bind(this);
			cc();
		})


		// 显示总数、总价
		function showRes(){
			var $qtyAll = $('.qtyAll');
			var $totalAll = $('.totalAll');

			var resQtyAll = 0;
			var resTotalAll = 0;
			for(var i=0;i<$price.length;i++){

				var res = $price.eq(i).text().slice(1)*$qty.eq(i).find('input').val();
				$total.eq(i).val(res); 
				resTotalAll += $total.eq(i).val()*1;
				resQtyAll +=  $qty.eq(i).find('input').val()*1;
			}
			$qtyAll.text(resQtyAll);
			$totalAll.text(resTotalAll);
		}

		// cookie改变
		function cookieChange(){
			
			var $currentTr = $(this).closest('tr');
			var guid = $currentTr.find('img').attr('data-guid');
            cookieGoodsList = JSON.parse(getCookie('cookieGoodsList'));

            for(var i=0;i<cookieGoodsList.length;i++){
				if(cookieGoodsList[i].guid === guid){

					var newQty = cookieGoodsList[i].qty;
					newQty = $currentTr.find('input').val();
					cookieGoodsList[i].qty = newQty;

					if(cookieGoodsList[i].qty<=0){
						$currentTr.remove();
						showRes();
						cookieGoodsList.splice(i,1);
					}
					break;
				}
			};
			
			// cookie有效期7天
			var now = new Date();
			now.setDate(now.getDate() + 7);

			setCookie('cookieGoodsList',JSON.stringify(cookieGoodsList),now.toUTCString(),'/');
console.log(JSON.parse(getCookie('cookieGoodsList')));		
		};
		
	})
})
;