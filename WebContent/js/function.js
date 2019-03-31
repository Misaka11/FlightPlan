function postAjax(url,param,callback){
    $.ajax({
        url : url,
        type : 'GET',
        data : param,
        dataType : 'text',
        success : function(data) {
                callback(data);
        },
        error : function(data, status, e) {
            alert(e);
        },
        complete : function() {
        }
    });
}

function getAjax(url,param){
    var info;
    $.ajax({
        url : url,
        type : 'GET',
        data : param,
        async: false,
        dataType : 'json',
        success : function(data, status) {
            if (status == "success") {
                info= data;
            }
        },
        error : function(data, status, e) {
            alert(e);
        },
        complete : function() {
        }
    });
    return info;
}

function feedback(result)
{
	if(result=="success") alert("操作成功！");
	else alert("操作失败！");
    window.location.reload();
}

function login()
{
	//向后端请求公钥，对密码进行RSA加密后传到后端，后端利用私钥进行解密
	//将解密后的密码进行SHA-1加密，存入数据库中	
	var data=new Object();
	data.username=document.getElementById("inputAccount").value;
	data.password=document.getElementById("inputPassword").value;
	postAjax("UserLoginServlet",data,LoginFeedback);
}

function LoginFeedback(result)
{
	console.log(result);
	if(result == "[]") alert("用户名或密码错误！");
	else
	{
		$.cookie('user_info',result);
		window.location.href = 'console.html';
	}
}
