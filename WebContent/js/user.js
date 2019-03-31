var user_list = [];
$(function () {
    var data = $.cookie('user_info');
    data = eval('('+data+')');
    if(data[0].competence == 1)
        postAjax("UserDisplayServlet",{},showUser);
});

function showUser(data) {

    data = eval('('+data+')');
    user_list = data;
    var showdata = [];
    for (var i = 0; i < data.length; i++) {
        var obj={};
        obj.username = data[i].username;
        if (data[i].competence == 0) {obj.competence = "普通用户";} else {obj.competence = "管理员";}
        showdata.push(obj);
    }
    var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#userTable').bootstrapTable({
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            contentType: "application/x-www-form-urlencoded",
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "no",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [
                    
                    {field: 'username' ,title:'用户名',align:'center',valign:'middle',sortable:'true'},
                    {field: 'competence' ,title:'权限',align:'center',valign:'middle',sortable:'true'},
                    {field: 'operator' ,title:'操作',align:'center',valign:'middle',formatter: function(value,row,index){
                        var c = '<button class="btn btn-success btn-xs" data-toggle="modal" onclick = "changeU(\'' + row.username + '\')">修改</button>'
                        var d = '<button class="btn btn-danger btn-xs" data-toggle="modal" onclick = "delU(\'' + row.username + '\')">删除</button>'
                        return c+d;
                    }},
                    ],
            
            data: showdata,

            rowStyle: function (row, index) {
                var classesArr = ['success', 'info'];
                var strclass = "";
                if (index % 2 === 0) {//偶数行
                    strclass = classesArr[0];
                } else {//奇数行
                    strclass = classesArr[1];
                }
                return { classes: strclass };
            },//隔行变色
        });

    };


        //得到查询的参数
        oTableInit.queryParams = function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit,   //页面大小
                offset:params.offset
            };
            return temp;
        };
        return oTableInit;
    };
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
}

function addU()
{
	var str = '';
    str +='<div class="modal-dialog" role="document">'
        str +='<div class="modal-content">'
            str +='<div class="modal-header">'
                str +='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                str +='<h4 class="modal-title" id="gridSystemModalLabel">添加用户</h4>'
            str +='</div>'
            str +='<div class="modal-body">'
                str +='<div class="container-fluid">'
                    str +='<form class="form-horizontal">'
                        str +='<div class="form-group ">'
                            str +='<label for="a_user_name" class="col-xs-3 control-label">用户名：</label>'
                            str +='<div class="col-xs-8 ">'
                                str +='<input type="" class="form-control input-sm duiqi" id="a_user_name">'
                            str +='</div>'
                        str +='</div>'
                        str +='<div class="form-group ">'
                            str +='<label for="a_user_password" class="col-xs-3 control-label">密码：</label>'
                            str +='<div class="col-xs-8 ">'
                                str +='<input type="" class="form-control input-sm duiqi" id="a_user_password">'
                            str +='</div>'
                        str +='</div>'
                        str +='<div class="form-group">'
                            str +='<label for="a_user_competence" class="col-xs-3 control-label">权限：</label>'
                            str +='<div class="col-xs-8">'
                                str +='<select class=" form-control select-duiqi" id = "a_user_competence">'
                                    str +='<option value=1>管理员</option>'
                                    str +='<option value=0>普通用户</option>'
                                str +='</select>'
                            str +='</div>'
                        str +='</div>'
                    str +='</form>'
                str +='</div>'
            str +='</div>'
            str +='<div class="modal-footer">'
                str +='<button type="button" class="btn btn-xs btn-white" data-dismiss="modal">取 消</button>'
                str +='<button type="button" class="btn btn-xs btn-green" data-dismiss="modal" onclick = "addUser()">保 存</button>'
            str +='</div>'
        str +='</div>'
    str +='</div>'
    $("#addUser").html(str);
    $("#addUser").modal('show');
}
function changeU(name)
{
	var str = '';
    str +='<div class="modal-dialog" role="document">'
        str +='<div class="modal-content">'
            str +='<div class="modal-header">'
                str +='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                str +='<h4 class="modal-title" id="gridSystemModalLabel">修改用户</h4>'
            str +='</div>'
            str +='<div class="modal-body">'
                str +='<div class="container-fluid">'
                    str +='<form class="form-horizontal">'
                        str +='<div class="form-group ">'
                            str +='<label for="c_user_name" class="col-xs-3 control-label">用户名：</label>'
                            str +='<div class="col-xs-8 ">'
                                str +='<input type="" class="form-control input-sm duiqi" id="c_user_name" readonly = "readonly" value = "'+name+'">'
                            str +='</div>'
                        str +='</div>'
                        str +='<div class="form-group ">'
                            str +='<label for="c_user_password" class="col-xs-3 control-label">密码：</label>'
                            str +='<div class="col-xs-8 ">'
                                str +='<input type="" class="form-control input-sm duiqi" id="c_user_password">'
                            str +='</div>'
                        str +='</div>'
                        str +='<div class="form-group">'
                            str +='<label for="c_user_competence" class="col-xs-3 control-label">权限：</label>'
                            str +='<div class="col-xs-8">'
                                str +='<select class=" form-control select-duiqi" id = "c_user_competence">'
                                    str +='<option value=1>管理员</option>'
                                    str +='<option value=0>普通用户</option>'
                                str +='</select>'
                            str +='</div>'
                        str +='</div>'
                    str +='</form>'
                str +='</div>'
            str +='</div>'
            str +='<div class="modal-footer">'
                str +='<button type="button" class="btn btn-xs btn-white" data-dismiss="modal">取 消</button>'
                str +='<button type="button" class="btn btn-xs btn-green" data-dismiss="modal" onclick = "changeUser()">保 存</button>'
            str +='</div>'
        str +='</div>'
    str +='</div>'
    $("#changeUser").html(str);
    $("#changeUser").modal('show');
}
function delU(name)
{
    var str = ''
    str+='<div class="modal-dialog" role="document">'
        str+='<div class="modal-content">'
            str+='<div class="modal-header">'
                str+='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                str+='<h4 class="modal-title" id="gridSystemModalLabel">提示</h4>'
            str+='</div>'
            str+='<div class="modal-body">'
                str+='<div class="container-fluid">'
                str+='确定要删除该用户？删除后不可恢复！'
                str+='</div>'
            str+='</div>'
            str+='<div class="modal-footer">'
                str+='<button type="button" class="btn btn-xs btn-white" data-dismiss="modal">取 消</button>'
                str+='<button type="button" class="btn  btn-xs btn-danger" data-dismiss="modal" onclick="delUser(\'' + name + '\')">保 存</button>'
            str+='</div>'
        str+='</div>'
    str+='</div>'
    $("#deleteUser").html(str);
    $("#deleteUser").modal('show');          
}

//用户管理
function addUser()
{
    var data = $.cookie('user_info');
    data = eval('('+data+')');
    if(data[0].competence == 0)
    {
        alert("你不是管理员，不能进行用户管理！");
        window.location.reload();
        return;
    }
	var data=new Object();
	data.username=document.getElementById("a_user_name").value;
	data.password=document.getElementById("a_user_password").value;
	data.competence = $("#a_user_competence").children('option:selected').val();
	postAjax("UserAddServlet",data,feedback);
}

function delUser(name)
{
	var data=new Object();
	data.username=name;
	postAjax("UserDelServlet",data,feedback);
}

function changeUser()
{
	var data=new Object();
	data.username=document.getElementById("c_user_name").value;
	data.password=document.getElementById("c_user_password").value;
	data.competence = $("#c_user_competence").children('option:selected').val();
	postAjax("UserChangeServlet",data,feedback);
}
