$(function(){
	//添加高亮
$('.tabMenu>li:eq(2)').css('backgroundColor','#808080');
	var totalPage;
	var page=1;
	var editName;
	//删除作品
	function del(obj){
		var itemName=$(obj).parent().parent().children().eq(0).text();		
			alert(itemName);
			if(window.confirm('你确定要删除数据吗')){
				$(obj).parent().parent().remove();
				$.ajax({
					type:'POST',
					url:'/deleteItem',
					 data:{
					 	"itemName":itemName
				     },
					success:function(data){
						console.log(data);
						alert('成功删除数据');	
					},
					error:function(){
						alert('删除异常');
					}
				})
			}else{
				alert('删除数据失败');
			}			
	}
	//编辑作品
	function edit(obj){
		$('#changeMember').show();
		var inpt=$('#changeform input');
		editName=inpt[1].value = $(obj).parents('tr').children().eq(0).text();
		inpt[2].value = $(obj).parents('tr').children().eq(1).text();
		$('#changeform textarea')[0].value = $(obj).parents('tr').children().eq(5).text();
		var scrollTop = $(document).scrollTop() || $(document.body).scrollTop();
		var scrollLeft = $(document).scrollLeft() || $(document.body).scrollLeft();		
		//遮罩层
		$('#bg').css('display','block') ;
		$('#bg').width( Math.max( $(document.body).outerWidth(true), $(window).width()));
		$('#bg').height(Math.max( $(document.body).outerHeight(true), $(window).height()))		
		//弹出层addMember
		$('#changeMember').css('left', ( $(document).width() - $('#changeMember').width() ) / 2 + scrollLeft);
		$('#changeMember').css('top', ( $(document).height() - $('#changeMember').height() ) / 2 + scrollTop);
	}
	//跳转
	function goTo(obj){
		var gotoPage=$(obj).parent().children().eq(0).val();
		if (gotoPage> totalPage||gotoPage<=0){
			alert('不存在当前页数，无法跳转到当前页数')
		}else{
			page=gotoPage;
		}
		$('.paging>li:eq(1)').text(page);
		$.ajax({
			type:'GET',
			url:'/findAllItem',
			data:{"page":gotoPage},
			success:function(data){
				if(data.status=="1"){
					totalPage=data.count;
					var listProduction='';
					listProduction="<tr>"+
				 				"<th>name</th>"+
				 				"<th>url</th>"+
				 				"<th>effectPicture</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
					$('#listMember').html(listProduction);
					var listProductions=data.result;
					if (page<=totalPage) {
						for(var i=0;i<listProductions.length;i++){
							listProduction='<tr><td>'+listProductions[i].itemName+'</td><td>'+listProductions[i].itemUrl+'</td><td>'+listProductions[i].dispaly+'</td><td><img class="photo" src=img/item/'+listProductions[i].itemImg+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';
							$('#listMember').append(listProduction);
						}		
					}
					
				}
				//删除成员
				$('.del').click(function(){
					del($(this));
				});
				//编辑成员
				$('.edit').click(function(){
					edit($(this));
				})
			},
			error:function(){
				alert('请求出错');
			}
		})
	}
	//查询跳转
	function lookgoTo(obj){
		console.log("100行");
		var gotoPage=$(obj).parent().children().eq(0).val();
		if (gotoPage> totalPage||gotoPage<=0){
			alert('不存在当前页数，无法跳转到当前页数')
		}else{
			page=gotoPage;
		}
		$('.paging>li:eq(1)').text(page);
		var value=$('#studentNo').val();
		$.ajax({
			type:'GET',
			url:'/findOneItem',
			data:{
				"page":value
			},
			success:function(data){
				console.log(data);
				if(data.status=="1"){
					
					totalPage=data.count;
					var listProduction='';
					listProduction="<tr>"+
				 				"<th>name</th>"+
				 				"<th>url</th>"+
				 				"<th>introduction</th>"+
                                "<th>dispaly</th>"+
				 				"<th>effectPicture</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
					$('#listMember').html(listProduction);
					var listProductions=data.result;
					if (page<=totalPage) {
						for(var i=0;i<listProductions.length;i++){
							listProduction='<tr><td>'+listProductions[i].itemName+'</td><td>'+listProductions[i].itemUrl+'</td><td>'+listProductions[i].dispaly+'</td><td><img class="photo" src=img/item/'+listProductions[i].itemImg+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';
							$('#listMember').append(listProduction);
						}		
					}	
				}
				//删除成员
				$('.del').click(function(){
					del($(this));
				});
				//编辑成员
				$('.edit').click(function(){
					edit($(this));
				})
			},
			error:function(){
				alert('请求出错');
			}
		})
	}
	//默认页
	(function(){
		var pageBtn='';
		pageBtn+="<li id='page_prev'>上一页</li>"+"<li>"+page+"</li>"+"<li id='page_next'>下一页</li>"+"<li>跳到<input type='text'>"+"页<input class='goTo' type='button' value='确定'></li>";	
		$('.paging').html(pageBtn);	
		$.ajax({
			type:'GET',
			url:'/findAllItem',
			data:{"page":page},		
			success:function(data){
				console.log(data);
				if(data.status=="1"){
					totalPage=data.count;
					var listProduction='';
					listProduction="<tr>"+
				 				"<th>name</th>"+
				 				"<th>url</th>"+
				 				"<th>effectPicture</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
					$('#listMember').html(listProduction);
					var listProductions=data.result;
					if (page<=totalPage) {
						for(var i=0;i<listProductions.length;i++){
							listProduction='<tr><td>'+listProductions[i].itemName+'</td><td>'+listProductions[i].itemUrl+'</td><td>'+listProductions[i].dispaly+'</td><td><img class="photo" src=img/item/'+listProductions[i].itemImg+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';
							$('#listMember').append(listProduction);
						}		
					}		
				}
				//删除作品
				$('.del').click(function(){
					del($(this));
				});
				//编辑作品
				$('.edit').click(function(){
					edit($(this));
				})
				//跳转到固定页
				$('.goTo').click(function(){
					goTo($(this));
				})
			},
			error:function(){
				alert('请求出错');
			}
		})	
		
	})();	// console.log(listMembers[i].memberId);
	//上一页
	(function(){
		$('#page_prev').click(function(){
			if(page>1){
				page=page-1;				
			}else{
				page==1;
				alert("已经是第一页了");
			}
			$('.paging>li:eq(1)').text(page);
			$.ajax({
				type:'GET',
				url:'/findAllItem',
				data:{
					"page":page
				},		
				success:function(data){
					console.log(data);
					if(data.status=="1"){
						totalPage=data.count;
						var listProduction='';
						listProduction="<tr>"+
					 				"<th>name</th>"+
					 				"<th>url</th>"+
					 				"<th>introduction</th>"+
	                                "<th>dispaly</th>"+
					 				"<th>effectPicture</th>"+
					 				"<th class='th'></th>"+
					 				"<th class='th'></th>"+
					 			"</tr>";
						$('#listMember').html(listProduction);
						var listProductions=data.result;
						if (page<=totalPage) {
							for(var i=0;i<listProductions.length;i++){
								listProduction='<tr><td>'+listProductions[i].itemName+'</td><td>'+listProductions[i].itemUrl+'</td><td>'+listProductions[i].dispaly+'</td><td><img class="photo" src=img/item/'+listProductions[i].itemImg+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';
								$('#listMember').append(listProduction);
							}		
						}		
					}
					//删除作品
					$('.del').click(function(){
						del($(this));
					});
					//编辑作品
					$('.edit').click(function(){
						edit($(this));
					})
					//跳转到固定页
					$('.goTo').click(function(){
						goTo($(this))
					})
				},
				error:function(){
				alert('请求出错');
				}
			})
		})
	})();
	//下一页
	(function(){
		$('#page_next').click(function(){
			if(page<totalPage){
				page= parseInt(page)+1;
			}else{
				page==totalPage;
				alert("已经是最后一页了");
			}
			$('.paging>li:eq(1)').text(page);
			$.ajax({
				type:'GET',
				url:'/findAllItem',
				data:{
					"page":page
				},
				success:function(data){
					console.log(data);
					if(data.status=="1"){
						totalPage=data.count;
					var listProduction='';
					listProduction="<tr>"+
				 				"<th>name</th>"+
				 				"<th>url</th>"+
				 				"<th>introduction</th>"+
                                "<th>dispaly</th>"+
				 				"<th>effectPicture</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
					$('#listMember').html(listProduction);
					var listProductions=data.result;
					if (page<=totalPage) {
						for(var i=0;i<listProductions.length;i++){
							listProduction='<tr><td>'+listProductions[i].itemName+'</td><td>'+listProductions[i].itemUrl+'</td><td>'+listProductions[i].dispaly+'</td><td><img class="photo" src=img/item/'+listProductions[i].itemImg+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';
							$('#listMember').append(listProduction);
						}		
					}	
					}
					//删除成员
					$('.del').click(function(){
						del($(this));
					});
					//编辑成员
					$('.edit').click(function(){
						edit($(this));
					})
					//跳转到固定页
					$('.goTo').click(function(){
						goTo($(this))
					})
				}
			})
		})
	})();

	//作品查询
	(function(){
		$('#lookFor').click(function(){
			//默认页
			(function(){
				var pageBtn='';
				pageBtn+="<li id='page_prev'>上一页</li>"+"<li>"+page+"</li>"+"<li id='page_next'>下一页</li>"+"<li>跳到<input type='text'>"+"页<input class='goTo' type='button' value='确定'></li>";	
				$('.paging').html(pageBtn);
				var value=$('#studentNo').val();
				alert(value);
				$.ajax({
					type:'GET',
					url:'/findOneItem',
					data:{
						"itemName":value,
						"page":page
					},
					success:function(data){
						console.log(data);
						if(data.status=="1"){
							totalPage=data.count;
					var listProduction='';
					listProduction="<tr>"+
				 				"<th>name</th>"+
				 				"<th>url</th>"+
				 				"<th>effectPicture</th>"+
				 				"<th class='th'>操作</th>"+
				 				"<th class='th'>操作</th>"+
				 			"</tr>";
					$('#listMember').html(listProduction);
					var listProductions=data.result;
					if (page<=totalPage) {
						for(var i=0;i<listProductions.length;i++){
							listProduction='<tr><td>'+listProductions[i].itemName+'</td><td>'+listProductions[i].itemUrl+'</td><td>'+listProductions[i].dispaly+'</td><td><img class="photo" src=img/item/'+listProductions[i].itemImg+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';
							$('#listMember').append(listProduction);
						}		
					}	
						}
						//删除成员
						$('.del').click(function(){
							del($(this));
						});
						//编辑成员
						$('.edit').click(function(){
							edit($(this));
						})
						//跳转到固定页
						$('.goTo').click(function(){
							lookgoTo($(this))
						})
					},
				error:function(){
					alert('请求出错');
					}
				})
			})();
			//上一页
			(function(){
				$('#page_prev').click(function(){
					if(page>1){
						page=page-1;				
					}else{
						page==1;
						alert("已经是第一页了");
					}
					$('.paging>li:eq(1)').text(page);
					var value=$('#studentNo').val();
					$.ajax({
						type:'GET',
						url:'/findOneItem',
					data:{
						"itemName":value,
						"page":page
					},
					success:function(data){
							console.log(data);
							if(data.success==true){
								totalPage=data.data.page.totalPage;
								var listProduction='';
								listProduction="<tr>"+
							 				"<th>name</th>"+
							 				"<th>url</th>"+
							 				"<th>introduction</th>"+
			                                "<th>dispaly</th>"+
							 				"<th>effectPicture</th>"+
							 				"<th class='th'></th>"+
							 				"<th class='th'></th>"+
							 			"</tr>";
								$('#listMember').html(listProduction);
								var listProductions=data.data.listProductions;
								if (page<=totalPage) {
									for(var i=0;i<listProductions.length;i++){
										listProduction='<tr><td>'+listProductions[i].name+'</td><td>'+listProductions[i].url+'</td><td>'+listProductions[i].introduction+'</td><td><img class="photo" src='+listProductions[i].effectPicture+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
										$('#listMember').append(listProduction);
									}		
								}		
							}
							//删除成员
							$('.del').click(function(){
								del($(this));
							});
							//编辑成员
							$('.edit').click(function(){
								edit($(this));
							})
							//跳转到固定页
							$('.goTo').click(function(){
								lookgoTo($(this))
							})
						},
						error:function(){
							alert('请求出错');
						}
					})
				})
			})();
			//下一页
			(function(){
				$('#page_next').click(function(){
					if(page<totalPage){
						page= parseInt(page)+1;
					}else{
						page==totalPage;
						alert("已经是最后一页了");
					}
					$('.paging>li:eq(1)').text(page);
					var value=$('#studentNo').val();
					$.ajax({
						type:'GET',
						url:'/findOneItem',
						data:{
							"itemName":value,
							"page":page
						},
						success:function(data){
							console.log(data);
							if(data.success==true){
								totalPage=data.data.page.totalPage;
								var listProduction='';
								listProduction="<tr>"+
							 				"<th>name</th>"+
							 				"<th>url</th>"+
							 				"<th>introduction</th>"+
			                                "<th>dispaly</th>"+
							 				"<th>effectPicture</th>"+
							 				"<th class='th'></th>"+
							 				"<th class='th'></th>"+
							 			"</tr>";
								$('#listMember').html(listProduction);
								var listProductions=data.data.listProductions;
								if (page<=totalPage) {
									for(var i=0;i<listProductions.length;i++){
										listProduction='<tr><td>'+listProductions[i].name+'</td><td>'+listProductions[i].url+'</td><td>'+listProductions[i].introduction+'</td><td><img class="photo" src='+listProductions[i].effectPicture+'>'+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
										$('#listMember').append(listProduction);
									}		
								}	
							}
							//删除成员
							$('.del').click(function(){
								del($(this));
							});
							//编辑成员
							$('.edit').click(function(){
								edit($(this));
							})
							//跳转到固定页
							$('.goTo').click(function(){
								lookgoTo($(this))
							})
						}
					})
				})
			})();
		})
	})();
	//保存修改
	$(function(){
		$('#edit').click(function(){
			 var data = new FormData($('#changeform')[0]);
			 	data.append("_method","put");
			 $.ajax({
			 	type:'POST',
			 	url:'/updataItem',
			 	data:data,		 		
			 	async:false,
	            cache:false,
	            contentType:false,
	            processData:false,
	            success:function(data){
	            	console.log(data) ;	
	            	if(data=="1"){
	            		alert('保存修改成功');
	            		window.location.reload();
	            	} else{
	            		alert('保存修改失败')
	            	}   
	            	
	            	console.log(data.success) 	
	            },
	            error:function() {
	                alert("请求保存修改错误！");
	       		}
			 })
			 $('#changeMember').hide();
			 $('#bg').hide();
		});
	});
})

//增加作品
$(function(){
	$('#submit').click(function(){
		 var data = new FormData($('#addform')[0]);
		 $.ajax({
		 	type:'POST',
		 	url:'/insertItem',
		 	data:data,
		 	async:false,
            cache:false,
            contentType:false,
            processData:false,
            success:function(data){
            	console.log(data);
            	if(data=="1"){
            		alert('添加成功');
            		window.location.reload();
            	} else{
            		alert(data)
            	}   	
            },
            error:function() {
                alert("请求添加作品错误！");
       		}
		 })
		 $('#addMember').hide();
		 $('#bg').hide();
	});

});


//遮罩层
window.onload = function() {
	var oAdd = document.getElementById('add');
	var oBg = document.getElementById('bg');
	var oAddMember = document.getElementById('addMember');
	var oX = document.getElementById('x');
	var oChangeMember=document.getElementById('changeMember');
	var oClose=document.getElementById('close');
	function close(obj){
		oBg.style.display = 'none';
		obj.style.display = 'none';
	}
	function change(obj){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;		
		//遮罩层
		oBg.style.display = 'block';
		oBg.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oBg.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';		
		//弹出层
		oAddMember.style.display = 'block';
		oAddMember.style.left = ( document.documentElement.clientWidth - oAddMember.offsetWidth ) / 2 + scrollLeft + 'px';
		oAddMember.style.top = ( document.documentElement.clientHeight - oAddMember.offsetHeight ) / 2 + scrollTop + 'px';
	}
	function scroll( obj){
		if (obj.style.display == 'none') return ;	
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;	
		obj.style.left = ( document.documentElement.clientWidth - obj.offsetWidth ) / 2 + scrollLeft + 'px';
		obj.style.top = ( document.documentElement.clientHeight - obj.offsetHeight ) / 2 + scrollTop + 'px';	
	}
	function resize(obj){
		if (oBg.style.display == 'none') return ;		
		oBg.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oBg.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';		
		if (obj.style.display == 'none') return ;		
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;		
		obj.style.left = ( document.documentElement.clientWidth - obj.offsetWidth ) / 2 + scrollLeft + 'px';
		obj.style.top = ( document.documentElement.clientHeight - obj.offsetHeight ) / 2 + scrollTop + 'px';
	}
	oX.onclick = function() {	
		close(oAddMember);	
	}	
	oAdd.onclick = function() {	
		change(oAddMember);
	}
	oClose.onclick = function() {	
		close(oChangeMember);	
	}		
	window.onscroll = function() {	
		scroll(oAddMember);
	}
	window.onresize = function() {		
		resize(oAddMember);
	}
	window.onscroll = function() {	
		scroll(oChangeMember);
	}
	window.onresize = function() {		
		resize(oChangeMember);
	}
}