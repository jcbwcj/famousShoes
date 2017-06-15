;require(['config'],function(){
	require(['jquery'],function($){

		$('button').on('click',function(){
			var $username = $('#username').val();
			var $password = $('#password').val();

			$.ajax({
				url:'../api/login.php',
				data:{
					username:$username,
					password:$password
				},
				success:function(res){
					if(res === 'ok'){
						// alert(666);
						location.href = '../index.html?username='+$username;
					}else{
						alert('用户名或密码错误，请重新输入');
						$(':input').val('');
					}
				}
			})

		});




	});
});