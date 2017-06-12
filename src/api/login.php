<?php
	include 'connect.php';

	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';

	// md5加密
	$password = md5($password);
	$arr = array("username" => "$username","password" => "$password");
	// print_r($arr);

	// SQL语句
	$sql = "select username,password from usermsg";

	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果集
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	// print_r($rows);
	// in_array在多维数组时不可这么用（一维数组可以）
	if(in_array($arr, $rows)){
		echo 'ok';
	}


	$conn->close();



?>