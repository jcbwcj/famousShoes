;require(['config'],function(){
	require(['jquery','validate','messages'],function($,validate,messages){
		
		
		// 阅读并同意必须勾选
		var $checkbox = $(':checkbox');
		var $btn = $('button');
		$btn.attr('title','注册前必须同意协议');
		$checkbox.on('click',function(){
			if(this.checked){
				$btn.prop('disabled',false).removeClass('no');
			}else{
				$btn.prop('disabled',true).addClass('no');
			}
		});

		/*$('form').validate({
            // 验证规则
            rules:{
                username:{
                    required:true,
                    rangelength:[6,12]
                },
            	password:{
                    required:true,
                    rangelength:[6,12]
                }
            },

            // 自定义提示
            messages:{
                username:{
                    required:'*必填项'
                },
                password:{
                    required:'*必填项'
                }
            }
        });*/
		
		// 点击提交传递信息到后台
		$btn.on('click',function(){
			console.log(666)
			var $username = $('#username').val();
			var $password = $('#password').val();
			var $sure = $('#sure').val();
			if($password != $sure){
				$('#sure').val('');
				$('#password').val('');
				alert('两次密码输入不一致，请重新输入');

			}else if($username == '' || $password == ''){
				$checkbox.prop('checked',false);
				$btn.prop('disabled',true).addClass('no');
				alert('用户名密码不能为空值');
			}
			else{
				$.ajax({
					url:'../api/signup.php',
					type:'post',
					data:{
						username:$username,
						password:$password
					},
					success:function(res){
						if(res === 'ok'){
							alert('恭喜您注册成功，赶紧登陆抢购吧！');
						}else if(res == '已经存在'){
							alert('用户名已经存在，请另起一个用户名');
							$(':input').val('');
						}
					}
				});
			}
			// button标签会有默认行为，跳转到新的页面，会导致代码执行情况没法看见
			// 若使用input标签则不需要阻止浏览器默认行为
			return false;

		})
	});
});