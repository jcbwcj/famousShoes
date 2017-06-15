<?php

	include 'connect.php';

	$id = isset($_GET['guid']) ? $_GET['guid'] : 1;

	$sql = "select * from goodslist1 where id=$id";

	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果集
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	echo json_encode($rows,JSON_UNESCAPED_UNICODE);

	// 关闭连接
	$conn->close();

?>