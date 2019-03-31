var airplan_list = [];
$(function () {
    postAjax("AirplanDisplayServlet",{},showAirplan);
});

function showAirplan(data) {
    data = eval('('+data+')');
    airplan_list = data;
    var showdata = [];
    for (var i = 0; i < data.length; i++) {
        var obj={};
        obj.flight_plan_name = data[i].flight_plan_name;
        obj.initial_airport_ab = data[i].initial_airport_ab;
        obj.destination_airport_ab = data[i].destination_airport_ab;
        obj.leaving_time = data[i].leaving_time;
        obj.expected_time = data[i].expected_time;
        obj.aircraft_name = data[i].aircraft_name;
        showdata.push(obj);
    }
 //   console.log(showdata);
    var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#airplanTable').bootstrapTable({
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
                    
                    {field: 'flight_plan_name' ,title:'计划名字',align:'center',valign:'middle',sortable:'true'},
                    {field: 'initial_airport_ab' ,title:'起始机场',align:'center',valign:'middle',sortable:'true'},
                    {field: 'destination_airport_ab' ,title:'目标机场',align:'center',valign:'middle',sortable:'true'},
                    {field: 'leaving_time' ,title:'离场时间',align:'center',valign:'middle',sortable:'true'},
                    {field: 'expected_time' ,title:'预计到达时间',align:'center',valign:'middle',sortable:'true'},
                    {field: 'aircraft_name' ,title:'飞机名',align:'center',valign:'middle',sortable:'true'},
                    {field: 'operator1' ,title:'操作',align:'center',valign:'middle',formatter: function(value,row,index){
                        var a = '<button class="btn btn-success btn-xs" data-toggle="modal" onclick = "exportAn(\'' + row.flight_plan_name + '\')">导出</button>'
                        var b = '<button class="btn btn-success btn-xs" data-toggle="modal" onclick = "detailAn(\'' + row.flight_plan_name + '\')">详情</button>'
                        var c = '<button class="btn btn-success btn-xs" data-toggle="modal" onclick = "changeAn(\'' + row.flight_plan_name + '\')">修改</button>'
                        var d = '<button class="btn btn-danger btn-xs" data-toggle="modal" onclick = "delAn(\'' + row.flight_plan_name + '\')">删除</button>'
                        return a+b+c+d;
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

function exportAn(name)
{
    var obj={};
    for (var i in airplan_list) {
        if(airplan_list[i].flight_plan_name==name)
        {    
            obj=airplan_list[i];
            break;
        }
    }
    var blob = new Blob([JSON.stringify(obj)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name+".txt");
}

function addAn()
{
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>添加飞行计划</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='a_an1' class='col-xs-4 control-label'>计划名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an1'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an7' class='col-xs-4 control-label'>航线名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<select id='a_an7'><option>--请选择航线--</option>"
                            for(var i=0;i<airway_list.length;i++) {
                                str += "<option value='" + airway_list[i].airway_name + "'>" + airway_list[i].airway_name + "</option>";
                            }
                        str += "</select>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an2' class='col-xs-4 control-label'>起始机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an2'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an3' class='col-xs-4 control-label'>目标机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an3'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an4' class='col-xs-4 control-label'>备降机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an4'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an5' class='col-xs-4 control-label'>离场时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an5'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an6' class='col-xs-4 control-label'>预计到达时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an6'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an8' class='col-xs-4 control-label'>飞机名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<select id='a_an8'><option>--请选择飞机--</option>"
                            for(var i=0;i<aircraft_list.length;i++) {
                                str += "<option value='" + aircraft_list[i].aircraft_name + "'>" + aircraft_list[i].aircraft_name + "</option>";
                            }
                        str += "</select>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an9' class='col-xs-4 control-label'>巡航高度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an9'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an10' class='col-xs-4 control-label'>操作者：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an10'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an11' class='col-xs-4 control-label'>操作时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an11'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_an12' class='col-xs-4 control-label'>消耗燃油：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_an12'>"
                        str+="</div>"
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
                str+="<button type='button' class='btn btn-xs btn-green' data-dismiss='modal' onclick = 'addAirplan()'>保 存</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#addAirplan").html(str);
    $("#addAirplan").modal('show');
}

function detailAn(name)
{
    var obj={};
    for (var i in airplan_list) {
        if(airplan_list[i].flight_plan_name==name)
        {    
            obj=airplan_list[i];
            break;
        }
    }
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>飞行计划详情</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='d_an1' class='col-xs-4 control-label'>计划名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an1' readonly = 'readonly' value =  "+obj.flight_plan_name+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an7' class='col-xs-4 control-label'>航线名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an7' readonly = 'readonly' value =  "+obj.airway_name+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an2' class='col-xs-4 control-label'>起始机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an2' readonly = 'readonly' value =  "+obj.initial_airport_ab+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an3' class='col-xs-4 control-label'>目标机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an3' readonly = 'readonly' value =  "+obj.destination_airport_ab+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an4' class='col-xs-4 control-label'>备降机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an4' readonly = 'readonly' value =  "+obj.alternate_airport_ab+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an5' class='col-xs-4 control-label'>离场时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an5' readonly = 'readonly' value =  "+obj.leaving_time+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an6' class='col-xs-4 control-label'>预计到达时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an6' readonly = 'readonly' value =  "+obj.expected_time+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an8' class='col-xs-4 control-label'>飞机名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an8' readonly = 'readonly' value =  "+obj.aircraft_name+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an9' class='col-xs-4 control-label'>巡航高度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an9' readonly = 'readonly' value =  "+obj.cruising_altitude+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an10' class='col-xs-4 control-label'>操作者：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an10' readonly = 'readonly' value =  "+obj.operator+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an11' class='col-xs-4 control-label'>操作时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an11' readonly = 'readonly' value =  "+obj.operating_time+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_an12' class='col-xs-4 control-label'>消耗燃油：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_an12' readonly = 'readonly' value =  "+obj.estimated_fuel_consumption+">"
                        str+="</div>"
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#detailAirplan").html(str);
    $("#detailAirplan").modal('show');
}

function changeAn(name)
{
    var obj={};
    for (var i in airplan_list) {
        if(airplan_list[i].flight_plan_name==name)
        {    
            obj=airplan_list[i];
            break;
        }
    }
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>飞行计划详情</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='c_an1' class='col-xs-4 control-label'>计划名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an1' readonly = 'readonly' value =  "+obj.flight_plan_name+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an7' class='col-xs-4 control-label'>航线名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<select id='c_an7'><option>--请选择航线--</option>"
                            for(var i=0;i<airway_list.length;i++) {
                                str += "<option value='" + airway_list[i].airway_name + "'>" + airway_list[i].airway_name + "</option>";
                            }
                        str += "</select>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an2' class='col-xs-4 control-label'>起始机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an2' value =  "+obj.initial_airport_ab+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an3' class='col-xs-4 control-label'>目标机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an3' value =  "+obj.destination_airport_ab+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an4' class='col-xs-4 control-label'>备降机场：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an4' value =  "+obj.alternate_airport_ab+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an5' class='col-xs-4 control-label'>离场时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an5' value =  "+obj.leaving_time+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an6' class='col-xs-4 control-label'>预计到达时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an6' value =  "+obj.expected_time+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an8' class='col-xs-4 control-label'>飞机名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<select id='c_an8'><option>--请选择飞机--</option>"
                            for(var i=0;i<aircraft_list.length;i++) {
                                str += "<option value='" + aircraft_list[i].aircraft_name + "'>" + aircraft_list[i].aircraft_name + "</option>";
                            }
                        str += "</select>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an9' class='col-xs-4 control-label'>巡航高度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an9' value =  "+obj.cruising_altitude+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an10' class='col-xs-4 control-label'>操作者：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an10' value =  "+obj.operator+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an11' class='col-xs-4 control-label'>操作时间：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an11' value =  "+obj.operating_time+">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_an12' class='col-xs-4 control-label'>消耗燃油：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_an12' value =  "+obj.estimated_fuel_consumption+">"
                        str+="</div>"
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
                str+="<button type='button' class='btn btn-xs btn-green' data-dismiss='modal' onclick = 'changeAirplan()'>保 存</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#changeAirplan").html(str);
    $("#changeAirplan").modal('show');
}
function delAn(name)
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
                str+='确定要删除该计划？删除后不可恢复！'
                str+='</div>'
            str+='</div>'
            str+='<div class="modal-footer">'
                str+='<button type="button" class="btn btn-xs btn-white" data-dismiss="modal">取 消</button>'
                str+='<button type="button" class="btn  btn-xs btn-danger" data-dismiss="modal" onclick="delAirplan(\'' + name + '\')">保 存</button>'
            str+='</div>'
        str+='</div>'
    str+='</div>'
    $("#deleteAirplan").html(str);
    $("#deleteAirplan").modal('show');          
}

//飞机
function addAirplan()
{
    var data=new Object();
    data.an1=document.getElementById("a_an1").value; 
    data.an2=document.getElementById("a_an2").value;
    data.an3=document.getElementById("a_an3").value;
    data.an4=document.getElementById("a_an4").value;
    data.an5=document.getElementById("a_an5").value;
    data.an6=document.getElementById("a_an6").value;   
    data.an7=$("#a_an7").children('option:selected').val();
    data.an8=$("#a_an8").children('option:selected').val();
    data.an9=document.getElementById("a_an9").value;
    data.an10=document.getElementById("a_an10").value;
    data.an11=document.getElementById("a_an11").value;
    data.an12=document.getElementById("a_an12").value;
    postAjax("AirplanAddServlet",data,feedback);
}

function changeAirplan()
{
    var data=new Object();
    data.an1=document.getElementById("c_an1").value; 
    data.an2=document.getElementById("c_an2").value;
    data.an3=document.getElementById("c_an3").value;
    data.an4=document.getElementById("c_an4").value;
    data.an5=document.getElementById("c_an5").value;
    data.an6=document.getElementById("c_an6").value;   
    data.an7=$("#c_an7").children('option:selected').val();
    data.an8=$("#c_an8").children('option:selected').val();
    data.an9=document.getElementById("c_an9").value;
    data.an10=document.getElementById("c_an10").value;
    data.an11=document.getElementById("c_an11").value;
    data.an12=document.getElementById("c_an12").value;
    console.log(data);
    postAjax("AirplanChangeServlet",data,feedback);
}

function delAirplan(name)
{
    var data=new Object();
    data.flight_plan_name=name;
    postAjax("AirplanDelServlet",data,feedback);
}