

$('.service1').click(function(){
     layer.open({
         type: 2,
         title: '服务详情',
         shadeClose: true,
         shade: 0.8,
         area: ['580px', '70%'],
         content: 'laws_professor.html'
   }); 
});
//加载案件列表
function case_lawyer(n, s,userid) {
	var cur_timestamp = Date.parse(new Date()) / 1000;
	var md_token = hex_md5("law_" + hex_md5(String(cur_timestamp)) + "_law");
	var index = layer.load(2, {
		shade: [0.1, "#EEEEEE"],
		offset: ['50%', '50%']
	});

	$.ajax({
		type: "post",
		url: "https://www.ls186.cn/law_api",
		data: {
			service: "Case.case_list",
			time: cur_timestamp,
			token: md_token,
			userid: userid,
			page: n,
			rule: s,
			type: 1
		},
		success: function(data) {
			layer.close(index);
			var data = JSON.parse(data);
           if(data.ret == 200) {
				var caseMainList = data.data;

				if(caseMainList == '') {
					layer.msg("没有数据了", {
						icon: 5
					});
				} else {
				console.log(caseMainList)
					$.each(caseMainList, function(index, ele) {
						 var tr=$("<tr class='paCase'  case_id='"+ele.case_id+"'><td><input class='childcase' type='checkbox' /></td><td>"+ele.case_title+"</td></tr>");
					      $(".caseSelect table").append(tr);
					})
				}
			} else {
				layer.msg(data.msg, {
					icon: 3
				});
			}
		},
		error: function(data) {
             layer.close(index);
			layer.msg("数据加载失败");
		}

	});
}
function case_client(userid){
	var cur_timestamp = Date.parse(new Date()) / 1000;
    var md_token = hex_md5("law_" + hex_md5(String(cur_timestamp)) + "_law");
	var index = layer.load(2, {
		shade: [0.1, "#EEEEEE"],
		offset: ['50%', '50%']
	});
	$.ajax({
		type: "post",
		url: "https://www.ls186.cn/law_api",
		data: {
			service: "Office.client_case_list",
			time: cur_timestamp,
			token: md_token,
			userid:userid,
			type:1
		},
		success: function(data) {
		   layer.close(index);
		   var data=JSON.parse(data);;
		   if(data.ret == 200) {
				var caseMainList = data.data;
				if(caseMainList == '') {
					layer.msg("没有数据", {
						icon: 5
					});
				} else {
					cosnole.log(caseMainList)
					$.each(caseMainList, function(index, ele) {
					  var tr=$("<tr class='paCase'  case_id='"+ele.case_id+"'><td><input class='childcase'  type='checkbox' /></td><td>"+ele.case_title+"</td></tr>");
					   $(".caseSelect table").append(tr);
					})
				}
			} else {
				
				layer.msg(data.msg, {
					icon: 3
				});
			}
		},
		error: function(data) {
			layer.close(index);
			layer.msg("数据加载失败");
		}

	});
}
$(function(){
	

})



$('.caseSend').click(function(){
	var userid=getSession(0);
	 console.log(userid);
       var ss=window.sessionStorage;
 if(ss.getItem("law_sign")) {
	var jsonTxt = JSON.parse(ls.getItem('law_sign'));
	var jsonStr = jsonTxt[jsonTxt.length - 1].law_law;
	$(".caseSelect table").find(".paCase").remove();
	if(jsonStr.split("_")[2] == 6) {
	       case_client(userid);
	       
	}else{
		 case_lawyer(1,'time',userid);
	}
	

	} else {
	layer.msg('请先登录');
      }




})
$(".caseSelect").on("table","click",function(){
	console.log('OK');
})
