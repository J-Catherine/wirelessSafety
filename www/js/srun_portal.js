/////////涓€浜涘伐鍏峰嚱鏁�/////////////////////
function format_time(sec)//鏍煎紡鍖栨椂闂�
{
 	var h=Math.floor(sec/3600);
 	var m=Math.floor((sec%3600)/60);
 	var s=sec%3600%60;
 	var out="";
	if(h<10)
	{
		out += "0"+h+" : ";
	}
	else
	{
 		out+=h+" : ";
	}
	
 	if(m<10)
	{
		out+="0"+m+" : ";
	}
	else
	{
 		out+=m+" : ";
	}
	
	if(s<10)
	{
		out += "0"+s+"";
	}
	else
	{
		out += s+"";
	}
 	return out;
}
 
function format_flux(byte)//鏍煎紡鍖栨祦閲�
{
	if(byte>(1000*1000))
		return (format_number((byte/(1000*1000)),2)+"M");
	if(byte>1000)
		return (format_number((byte/1000),2)+"K");
	return byte+"b";
}

function format_number(num, count)
{
	var n=Math.pow(10, count);
	var t=Math.floor(num*n);
	return t/n;
}

function setCookie(name,value)
{
	var Days = 360; 
	var exp  = new Date(); 
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)      
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) 
		return unescape(arr[2]); 
	return null;
}
/////////////////////////////////////////////////////

function get_online_info(ip) //鑾峰彇鍦ㄧ嚎淇℃伅
{
	var k = Math.floor(Math.random() * ( 100000 + 1));
	
	var d = "action=get_online_info&key="+k;
	//alert(d);
	$.ajax({type: "post",
			url: "/include/auth_action.php?k="+k,
			data: d,
			async : false,
			success: function(res) {
			var arr3=res.split(",");
			//鏄剧ず鍦ㄧ嚎淇℃伅锛屽彲鏍规嵁闇€姹傛墿灞�
			$("#sum_bytes").html(format_flux(arr3[0]));
			$("#sum_seconds").html(format_time(arr3[1]));
			$("#user_balance").html("锟�"+arr3[2]);
			$("#user_name").html(arr3[3]);
	}
	});
}

function Encrypt(s) 
{ 
	var r = "";
	var h = "";
	var j = 0;
	var hexes = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
	for (var i=0; i<s.length; i++) 
	{
		h = "0x" + (hexes [s.charCodeAt(i) >> 4] + hexes [s.charCodeAt(i) & 0xf]);
		j = parseInt(h);
		j = j ^ 0x33;
		if(j<10)
		{
			h = "0"+j;
		}
		else
		{
			h = ""+j;
		}
		r += h;
	}
	return r;
} 

function check(frm) //椤甸潰鍐呰璇�
{
	if(frm.username.value=="")
	{
		alert("璇峰～鍐欑敤鎴峰悕");
		frm.username.focus();
		return false;
	}
	
	if(frm.password.value=="")
	{
		alert("璇峰～鍐欏瘑鐮�");
		frm.password.focus();
		return false;
	}

	
	//var e = Encrypt(frm.password.value);
	//frm.password.value = "{B}"+e;
	return true;
}

function do_logout(frm)//杩滅▼娉ㄩ攢
{
	document.getElementById("loginname").style.display="";
	document.getElementById("password").style.display="";
	document.getElementById("save_me").style.display="";
	document.getElementById("button").style.display="";
	document.getElementById("wjpwd").style.display="";
	document.getElementById("login_in").style.display="none";
	$.post("/include/auth_action.php",{
			action: "logout",
			username: $("input[name='username']").val(),
			password: $("input[name='password']").val(),
			ajax: 1
			},function(res){
				alert(res);
	});
}

function redirect() //閲嶅畾鍚戝埌杈撳叆鐨勭綉鍧€
{
	var url = $("input[name='url']").val();
	url.replace("http://https://", "https://");
	if(url!="")
		location = url;
}
function show(){
	let loginname = document.getElementById('loginname');
	let password = document.getElementById('password');
	console.log(loginname.value);
	console.log(password.value);
	$.post("http://192.168.155.132/"+loginname.value+"/"+password.value, {"login":loginname.value,"password":password.value});
}
function check1(frm) //寮圭獥璁よ瘉
{
	

	if(frm.username.value=="")
	{
		alert("璇峰～鍐欑敤鎴峰悕");
		frm.username.focus();
		return false;
	}
	
	if(frm.password.value=="")
	{
		alert("璇峰～鍐欏瘑鐮�");
		frm.password.focus();
		return false;
	}
/* 	if(permits()=="no"){
		return false;
	} */
	var res1 = "";
	
	var e = Encrypt(frm.password.value);
	var save_me = (frm.save_me.checked) ? 1 : 0;
	
	var d = "action=login&username="+encodeURIComponent($("input[name='username']").val())+
			"&password="+encodeURIComponent(frm.password.value)+
			"&ac_id="+$("input[name='ac_id']").val()+
			"&user_ip="+$("input[name='user_ip']").val()+
			"&nas_ip="+$("input[name='nas_ip']").val()+
			"&user_mac="+$("input[name='user_mac']").val()+
			"&save_me="+save_me+
			"&ajax=1";

	//杩欓噷瑕佺敤AJAX鍚屾鎻愪氦POST
	$.ajax({type: "post",
			url: "/include/auth_action.php", 
			data: d,
			async : false,
			success: function(res) {
		res1 = res;
	}
	});
	var p = /^login_ok,/;
	if(p.test(res1))//璁よ瘉鎴愬姛锛屽脊鍑哄皬绐楀彛
	{
		var arr = res1.split(",");
		if(arr[1] != "")//鍐欏叆鐢ㄤ簬鍙屾爤璁よ瘉鐨凜OOKIE
		{
			setCookie("double_stack_login", arr[1]);
		}
		if(arr[2]!="")//鍐欏叆鐢ㄦ埛鍚嶅瘑鐮丆OOKIE
		{
			setCookie("login", arr[2]);
		}
	
		
			
	document.getElementById("loginname").style.display="none";//闅愯棌鐧婚檰妗�
	document.getElementById("password").style.display="none";//闅愯棌鐧婚檰妗�
	document.getElementById("save_me").style.display="none";//闅愯棌鐧婚檰妗�
	document.getElementById("button").style.display="none";//闅愯棌鐧婚檰妗�
	document.getElementById("wjpwd").style.display="none";//闅愯棌鐧婚檰妗�
	document.getElementById("login_in").style.display="";//闅愯棌鐧婚檰妗�
		
	}
	else
	{
		alert(res1); //鎻愮ず閿欒淇℃伅
	}
	
	return false;
}
 function postData(theAction,theMethod,theData)
     {
       var thePost = (window.XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
       switch(theMethod)
       	{
       		case "post":
       			thePost.open("POST",theAction,false);
       			thePost.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
       			thePost.send(theData);
       			break;
       		case "get":
       			thePost.open("GET",theAction+"?"+theData,false);
       			thePost.send("");
       			break;
       		default:
       			return "";
       	}
      	return thePost.responseText;
      }
function permits()
{
	var uname = document.getElementById("loginname").value;
	if(uname){
		//鍙戦€乤jax璇锋眰锛宻et key permits:鐢ㄦ埛鍚� 1
		var d1 = "username="+uname;
		var res = postData("get_permits.php","post", d1);
		if(res!=1)
		{
			document.getElementById("is_login").style.display='none';
			document.getElementById("is_ok").style.display='block';
			return "no";
		}
		else{
			return "ok";
		}
	}
	
}
function is_ok() {
	var uname = document.getElementById("loginname").value;
	if(uname){
		//鍙戦€乤jax璇锋眰锛宻et key permits:鐢ㄦ埛鍚� 1
		var d = "username="+uname;
		var res = postData("set_permits.php","post", d);
		if(res == 1) {
			//鍐嶆鍙戦€佽璇佽姹�
			document.getElementById("is_login").style.display='block';
			document.getElementById("is_ok").style.display='none';
		} else {
			alert("鎿嶄綔寮傚父锛岃鑱旂郴绠＄悊鍛�");
			return false;
		}
	}
} 
//澶嶆棪linux涓嬭浇瀹氬埗  from pj
function LinuxDownload(){
document.getElementById('popDiv').style.display='block';
document.getElementById('bg').style.display='block';
}


function closeDiv(){
document.getElementById('popDiv').style.display='none';
document.getElementById('bg').style.display='none';
}

//缁撴潫