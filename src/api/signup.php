<?php
	// 引入与数据库连接
	include 'connect.php';

	$username = isset($_POST['username']) ? $_POST['username'] : '';
	$password = isset($_POST['password']) ? $_POST['password'] : '';

/*	// ------1.0版本------
	// SQL语句
	$sql = "select username from usermsg";

	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果集
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	
	// 获取关联数组的键值，并保存到一个新的数值数组中
	for($i=0;$i<count($rows);$i++){

		foreach ($rows[$i] as $key) {
			// print_r($key);
			$arr[$i] = $key; 
		}
	}
	// 查看从前端获取到的用户名与后台数据是否重复
	// print_r($arr[2]);
	if(in_array($username, $arr)){
		echo '已经存在';
	}else{
		// md5加密
		$password = md5($password);

		$sql = "insert into usermsg	(username,password) values('$username','$password')";

		// 获取查询结果
		$res = $conn->query($sql);

		if($res){
			echo "ok";
		}else{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}	

	};*/

	// -------2.0版本--------
	$sql = "select username from usermsg where username='$username'";
	$res = $conn->query($sql);
	$rows = $res->fetch_all(MYSQLI_ASSOC);
	// print_r($rows);
	
	
	// 直接从数据库获取用户名为$username的数据，能获取到说明已存在，否则不存在
	if($rows){
		echo '已经存在';
	}else{
		
		// md5加密
		$password = md5($password);

		$sql = "insert into usermsg	(username,password) values('$username','$password')";

		// 获取查询结果
		$res = $conn->query($sql);

		if($res){
			echo "ok";
		}else{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}	
	}

	//关闭连接
	$conn->close();







?>