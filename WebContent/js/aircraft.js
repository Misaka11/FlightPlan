var aircraft_list = [];
$(function () {
    postAjax("AircraftDisplayServlet",{},showAircraft);
});

function showAircraft(data) {
    data = eval('('+data+')');
    aircraft_list = data;
    var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#aircraftTable').bootstrapTable({
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            contentType: "application/x-www-form-urlencoded",
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "no",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [
                    
                    {field: 'aircraft_name' ,title:'飞机名字',align:'center',valign:'middle',sortable:'true'},
                    {field: 'aircraft_model' ,title:'飞机机型',align:'center',valign:'middle',sortable:'true'},
                    {field: 'aircraft_weight' ,title:'飞机重量',align:'center',valign:'middle',sortable:'true'},
                    {field: 'operator' ,title:'操作',align:'center',valign:'middle',formatter: function(value,row,index){
                        var c = '<button class="btn btn-success btn-xs" data-toggle="modal" onclick = "changeAc(\'' + row.aircraft_name + '\')">修改</button>'
                        var d = '<button class="btn btn-danger btn-xs" data-toggle="modal" onclick = "delAc(\'' + row.aircraft_name + '\')">删除</button>'
                        return c+d;
                    }},
                    ],
            
            data: data,

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

function addAc()
{
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>添加飞机</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='a_aircraft_name' class='col-xs-4 control-label'>飞机名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_aircraft_name'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_aircraft_model' class='col-xs-4 control-label'>飞机型号：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_aircraft_model'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_aircraft_weight' class='col-xs-4 control-label'>飞机重量：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_aircraft_weight'>"
                        str+="</div>"
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
                str+="<button type='button' class='btn btn-xs btn-green' data-dismiss='modal' onclick = 'addAircraft()'>保 存</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#addAircraft").html(str);
    $("#addAircraft").modal('show');
}
function changeAc(name)
{
    var obj={};
    for (var i in aircraft_list) {
        if(aircraft_list[i].aircraft_name==name)
        {    
            obj=aircraft_list[i];
            break;
        }
    }

    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>修改飞机</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='c_aircraft_name' class='col-xs-4 control-label'>飞机名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_aircraft_name' readonly ='readonly' value = "+ obj.aircraft_name +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_aircraft_model' class='col-xs-4 control-label'>飞机型号：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_aircraft_model' value = "+ obj.aircraft_model +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_aircraft_weight' class='col-xs-4 control-label'>飞机重量：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_aircraft_weight' value = "+ obj.aircraft_weight +">"
                        str+="</div>"
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
                str+="<button type='button' class='btn btn-xs btn-green' data-dismiss='modal' onclick = 'changeAircraft()'>保 存</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#changeAircraft").html(str);
    $("#changeAircraft").modal('show');
}
function delAc(name)
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
                str+='确定要删除该飞机？删除后不可恢复！'
                str+='</div>'
            str+='</div>'
            str+='<div class="modal-footer">'
                str+='<button type="button" class="btn btn-xs btn-white" data-dismiss="modal">取 消</button>'
                str+='<button type="button" class="btn  btn-xs btn-danger" data-dismiss="modal" onclick="delAircraft(\'' + name + '\')">保 存</button>'
            str+='</div>'
        str+='</div>'
    str+='</div>'
    $("#deleteAircraft").html(str);
    $("#deleteAircraft").modal('show');          
}

//飞机
function addAircraft()
{
    var data=new Object();
    data.aircraft_name=document.getElementById("a_aircraft_name").value;
    data.aircraft_model=document.getElementById("a_aircraft_model").value;
    data.aircraft_weight=document.getElementById("a_aircraft_weight").value;
    postAjax("AircraftAddServlet",data,feedback);
}

function changeAircraft()
{
    var data=new Object();
    data.aircraft_name=document.getElementById("c_aircraft_name").value;
    data.aircraft_model=document.getElementById("c_aircraft_model").value;
    data.aircraft_weight=document.getElementById("c_aircraft_weight").value;
    postAjax("AircraftChangeServlet",data,feedback);
}

function delAircraft(name)
{
    var data=new Object();
    data.aircraft_name=name;
    postAjax("AircraftDelServlet",data,feedback);
}