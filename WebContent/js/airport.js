var airport_list = [];
$(function () {
    postAjax("AirportDisplayServlet",{},showAirport);
});

function showAirport(data) {

    data = eval('('+data+')');
    airport_list = data;
    var showdata = [];
    for (var i = 0; i < data.length; i++) {
        var obj={};
        obj.name = data[i].name;
        obj.name_ab = data[i].name_ab;
        obj.identification = data[i].identification;
        obj.longitude = data[i].longitude;
        obj.latitude = data[i].latitude;
        obj.height = data[i].height;
        showdata.push(obj);
    }
    var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#airportTable').bootstrapTable({
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
                    
                    {field: 'name' ,title:'机场名',align:'center',valign:'middle',sortable:'true'},
                    {field: 'name_ab' ,title:'机场ID',align:'center',valign:'middle',sortable:'true'},
                    {field: 'identification' ,title:'标识',align:'center',valign:'middle',sortable:'true'},
                    {field: 'longitude' ,title:'经度',align:'center',valign:'middle',sortable:'true'},
                    {field: 'latitude' ,title:'纬度',align:'center',valign:'middle',sortable:'true'},
                    {field: 'height' ,title:'高度',align:'center',valign:'middle',sortable:'true'},
                    {field: 'operator' ,title:'操作',align:'center',valign:'middle',formatter: function(value,row,index){
                        var b = '<button class="btn btn-success btn-xs" data-toggle="modal" onclick = "detailAp(\'' + row.name + '\')">详情</button>'
                        var c = '<button class="btn btn-success btn-xs" data-toggle="modal" onclick = "changeAp(\'' + row.name + '\')">修改</button>'
                        var d = '<button class="btn btn-danger btn-xs" data-toggle="modal" onclick = "delAp(\'' + row.name + '\')">删除</button>'
                        return b+c+d;
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

function addAp()
{
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>添加机场</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='a_airport_name' class='col-xs-4 control-label'>机场名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_name'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_name_ab' class='col-xs-4 control-label'>机场ID：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_name_ab'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_identification' class='col-xs-4 control-label'>机场标识：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_identification'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_longitude' class='col-xs-4 control-label'>机场经度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_longitude'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_latitude' class='col-xs-4 control-label'>机场纬度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_latitude'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_height' class='col-xs-4 control-label'>机场高度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_height'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_cut_angle' class='col-xs-4 control-label'>切入角度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_cut_angle'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_cut_direction' class='col-xs-4 control-label'>切入方向：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_cut_direction'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_airport_city' class='col-xs-4 control-label'>机场城市：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_airport_city'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_airport_state' class='col-xs-4 control-label'>机场省份：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_airport_state'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airport_airport_country' class='col-xs-4 control-label'>机场国家：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airport_airport_country'>"
                        str+="</div>"
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
                str+="<button type='button' class='btn btn-xs btn-green' data-dismiss='modal' onclick = 'addAirport()'>保 存</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#addAirport").html(str);
    $("#addAirport").modal('show');
}

function detailAp(name)
{
    var obj={};
    for (var i in airport_list) {
        if(airport_list[i].name==name)
        {    
            obj=airport_list[i];
            break;
        }
    }
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>修改机场</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='d_airport_name' class='col-xs-4 control-label'>机场名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_name' readonly ='readonly' value = "+ obj.name +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_name_ab' class='col-xs-4 control-label'>机场ID：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_name_ab' readonly ='readonly' value = "+ obj.name_ab +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_identification' class='col-xs-4 control-label'>机场标识：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_identification' readonly ='readonly' value = "+ obj.identification +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_longitude' class='col-xs-4 control-label'>机场经度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_longitude' readonly ='readonly' value = "+ obj.longitude +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_latitude' class='col-xs-4 control-label'>机场纬度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_latitude' readonly ='readonly' value = "+ obj.latitude +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_height' class='col-xs-4 control-label'>机场高度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_height' readonly ='readonly' value = "+ obj.height +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_cut_angle' class='col-xs-4 control-label'>切入角度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_cut_angle' readonly ='readonly' value = "+ obj.cut_angle +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_cut_direction' class='col-xs-4 control-label'>切入方向：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_cut_direction' readonly ='readonly' value = "+ obj.cut_direction +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_airport_city' class='col-xs-4 control-label'>机场城市：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_airport_city' readonly ='readonly' value = "+ obj.airport_city +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_airport_state' class='col-xs-4 control-label'>机场省份：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_airport_state' readonly ='readonly' value = "+ obj.airport_state +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='d_airport_airport_country' class='col-xs-4 control-label'>机场国家：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='d_airport_airport_country' readonly ='readonly' value = "+ obj.airport_country +">"
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
    $("#detailAirport").html(str);
    $("#detailAirport").modal('show');
}

function changeAp(name)
{
    var obj={};
    for (var i in airport_list) {
        if(airport_list[i].name==name)
        {    
            obj=airport_list[i];
            break;
        }
    }
    
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>修改机场</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                    str+="<label for='c_airport_name' class='col-xs-4 control-label'>机场名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_name' readonly ='readonly' value = "+ obj.name +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_name_ab' class='col-xs-4 control-label'>机场ID：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_name_ab' value = "+ obj.name_ab +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_identification' class='col-xs-4 control-label'>机场标识：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_identification' value = "+ obj.identification +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_longitude' class='col-xs-4 control-label'>机场经度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_longitude' value = "+ obj.longitude +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_latitude' class='col-xs-4 control-label'>机场纬度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_latitude' value = "+ obj.latitude +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_height' class='col-xs-4 control-label'>机场高度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_height' value = "+ obj.height +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_cut_angle' class='col-xs-4 control-label'>切入角度：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_cut_angle' value = "+ obj.cut_angle +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_cut_direction' class='col-xs-4 control-label'>切入方向：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_cut_direction' value = "+ obj.cut_direction +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_airport_city' class='col-xs-4 control-label'>机场城市：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_airport_city' value = "+ obj.airport_city +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_airport_state' class='col-xs-4 control-label'>机场省份：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_airport_state' value = "+ obj.airport_state +">"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='c_airport_airport_country' class='col-xs-4 control-label'>机场国家：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='c_airport_airport_country' value = "+ obj.airport_country +">"
                        str+="</div>"
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
                str+="<button type='button' class='btn btn-xs btn-green' data-dismiss='modal' onclick = 'changeAirport()'>保 存</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#changeAirport").html(str);
    $("#changeAirport").modal('show');
}
function delAp(name)
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
                str+='确定要删除该机场？删除后不可恢复！'
                str+='</div>'
            str+='</div>'
            str+='<div class="modal-footer">'
                str+='<button type="button" class="btn btn-xs btn-white" data-dismiss="modal">取 消</button>'
                str+='<button type="button" class="btn  btn-xs btn-danger" data-dismiss="modal" onclick="delAirport(\'' + name + '\')">保 存</button>'
            str+='</div>'
        str+='</div>'
    str+='</div>'
    $("#deleteAirport").html(str);
    $("#deleteAirport").modal('show');          
}

//机场
function addAirport()
{
    var data=new Object();
    data.name=document.getElementById("a_airport_name").value;
    data.name_ab=document.getElementById("a_airport_name_ab").value;
    data.identification=document.getElementById("a_airport_identification").value;
    data.longitude=document.getElementById("a_airport_longitude").value;
    data.latitude=document.getElementById("a_airport_latitude").value;
    data.height=document.getElementById("a_airport_height").value;
    data.cut_angle=document.getElementById("a_airport_cut_angle").value;
    data.cut_direction=document.getElementById("a_airport_cut_direction").value;
    data.airport_city=document.getElementById("a_airport_airport_city").value;
    data.airport_state=document.getElementById("a_airport_airport_state").value;
    data.airport_country=document.getElementById("a_airport_airport_country").value;
    postAjax("AirportAddServlet",data,feedback);
}

function changeAirport()
{
    var data=new Object();
    data.name=document.getElementById("c_airport_name").value;
    data.name_ab=document.getElementById("c_airport_name_ab").value;
    data.identification=document.getElementById("c_airport_identification").value;
    data.longitude=document.getElementById("c_airport_longitude").value;
    data.latitude=document.getElementById("c_airport_latitude").value;
    data.height=document.getElementById("c_airport_height").value;
    data.cut_angle=document.getElementById("c_airport_cut_angle").value;
    data.cut_direction=document.getElementById("c_airport_cut_direction").value;
    data.airport_city=document.getElementById("c_airport_airport_city").value;
    data.airport_state=document.getElementById("c_airport_airport_state").value;
    data.airport_country=document.getElementById("c_airport_airport_country").value;
    postAjax("AirportChangeServlet",data,feedback);
}

function delAirport(name)
{
    var data=new Object();
    data.name= name;
    postAjax("AirportDelServlet",data,feedback);
}
