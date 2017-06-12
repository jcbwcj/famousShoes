<?php

	include 'connect.php';

	// 分页设置
	$page = isset($_GET['page']) ? $_GET['page'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 20;

	// 查询数据库
	// SQL语句
	$sql = "select * from goodslist1 limit ".($page-1)*$qty.",".$qty;
	// 要拼接，不能直接写变量，并置

	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果集
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	// 格式化数据
	$result = array(
		'pageNo'=>$page,
		'qty'=>$qty,
		'total'=>$conn->query('select count(*) from goodslist1')->fetch_row()[0],
		'data'=>$rows
	);

	echo json_encode($result,JSON_UNESCAPED_UNICODE);









?>