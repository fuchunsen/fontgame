// 解决获取css样式的兼容问题
function getStyle(ele,s){
	// ele 元素 s 属性
	if(ele.currentStyle==undefined){
		var style = window.getComputedStyle(ele,null)[s];
		return style;

	}else{
		var style = ele.currentStyle[s];
		return style;
	}
}

// 删除元素
function deleteElement(ele){
	ele.parentNode.removeChild(ele);
}

// 在元素前追加元素
function insertElement(a,b){
	b.parentNode.insertBefore(a,b);
}

// 获取屏幕的滚动条滚动高度
function getScrollTop(){
	if(document.documentElement.scrollTop == 0){
		return body.scrollTop;
	}else{
		return document.documentElement.scrollTop;
	}
}