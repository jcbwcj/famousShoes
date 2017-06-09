;require.config({
	// 解决缓存
	urlArgs:'v='+Date.now(),
	paths:{
		'jquery':'../lib/jquery-3.2.1',
		'TTCarousel':'../lib/jquery-TTCarousel/jquery-TTCarousel',
		'gdszoom':'../lib/jquery-gdszoom/jquery.gdszoom'
	},
	shim:{
		'gdszoom':['jquery'],
       	'TTCarousel':['jquery']
	}
});