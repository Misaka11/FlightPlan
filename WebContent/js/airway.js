var airway_list = [];
var waypoint_name = [];
$(function () {
    postAjax("AirwayDisplayServlet",{},showAirway);
});

function showAirway(data) {

    data = eval('('+data+')');
    airway_list = data;
    var showdata = [];
    for (var i = 0; i < data.length; i++) {
        var obj={};
        obj.airway_name = data[i].airway_name;
        var tstr= "";
        tstr+= data[i].waypoint1 + "->";
        tstr+= data[i].waypoint2 + "->";
        tstr+= data[i].waypoint3 + "->";
        tstr+= data[i].waypoint4 + "->";
        tstr+= data[i].waypoint5 + "->";
        tstr+= data[i].waypoint6 + "->";
        tstr+= data[i].waypoint7 + "->";
        tstr+= data[i].waypoint8 + "->";
        tstr+= data[i].waypoint9 + "->";
        tstr+= data[i].waypoint10 + "->";
        tstr+= data[i].waypoint11 + "->";
        tstr+= data[i].waypoint12 + "->";
        tstr+= data[i].waypoint13 + "->";
        tstr+= data[i].waypoint14 + "->";
        tstr+= data[i].waypoint15 + "->";
        tstr+= data[i].waypoint16 + "->";
        tstr+= data[i].waypoint17 + "->";
        tstr+= data[i].waypoint18 + "->";
        tstr+= data[i].waypoint19 + "->";
        tstr+= data[i].waypoint20;
        var reg = new RegExp("->null","g")
        obj.airway_show=tstr.replace(reg,"");
        showdata.push(obj);
    }
    var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#airwayTable').bootstrapTable({
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
                    
                    {field: 'airway_name' ,title:'航线名',align:'center',valign:'middle',sortable:'true'},
                    {field: 'airway_show' ,title:'途经点',align:'center',valign:'middle',sortable:'true'},
                    {field: 'operator' ,title:'操作',align:'center',valign:'middle',formatter: function(value,row,index){
                        var d = '<button class="btn btn-danger btn-xs" data-toggle="modal" onclick = "delAw(\'' + row.airway_name + '\')">删除</button>'
                        return d;
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

function addAw()
{
    var str="";
    str+="<div class='modal-dialog' role='document'>"
        str+="<div class='modal-content'>"
            str+="<div class='modal-header'>"
                str+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                str+="<h4 class='modal-title'>添加航线</h4>"
            str+="</div>"
            str+="<div class='modal-body'>"
                str+="<div class='container-fluid'>"
                str+="<form class='form-horizontal'>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_airway_name' class='col-xs-4 control-label'>航线名：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<input type='text' class='form-control input-sm duiqi' id='a_airway_name'>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='a_waypoint' class='col-xs-4 control-label'>途经点：</label>"
                        str+="<div class='col-xs-8 '>"
                        str+="<select id='a_waypoint'><option>--请依次选择途经点--</option>"
                            for(var i=0;i<airport_list.length;i++) {
                                str += "<option value='" + airport_list[i].name + "'>" + airport_list[i].name + "</option>";
                            }
                        str += "</select>"
                        str += "<textarea cols='10' rows='1' id='a_waypoint_show' readonly = 'readonly'></textarea>"
                        str+="</div>"
                    str+="</div>"
                    str+="<div class='form-group '>"
                        str+="<label for='' class='col-xs-6 control-label'></label>"
                        str+="<div class='col-xs-4 '>"
                        str+="<button type='button' class='btn btn-xs btn-info' onclick = 'airway_tuige()'>退格</button>"
                        str+="<button type='button' class='btn btn-xs btn-info' onclick = 'airway_qingkong()'>清空</button>"
                        str+="</div>" 
                    str+="</div>"
                str+="</form>"
                str+="</div>"
            str+="</div>"
            str+="<div class='modal-footer'>"
                str+="<button type='button' class='btn btn-xs btn-white' data-dismiss='modal'>取 消</button>"
                str+="<button type='button' class='btn btn-xs btn-green' data-dismiss='modal' onclick = 'addAirway()'>保 存</button>"
            str+="</div>"
        str+="</div>"
    str+="</div>"
    $("#addAirway").html(str);
    $("#addAirway").modal('show');
    $("#a_waypoint").change(function () {
        var selected=$(this).children('option:selected').val();
        var waypoint_str = "";
        waypoint_name.push(selected);
        for (var i = 0; i < waypoint_name.length-1; i++) {
            waypoint_str += waypoint_name[i];
            waypoint_str += "->"
        }
        waypoint_str += selected;
        console.log(waypoint_str);
        document.getElementById("a_waypoint_show").value=waypoint_str;
    })

}

function delAw(name)
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
                str+='确定要删除该航线？删除后不可恢复！'
                str+='</div>'
            str+='</div>'
            str+='<div class="modal-footer">'
                str+='<button type="button" class="btn btn-xs btn-white" data-dismiss="modal">取 消</button>'
                str+='<button type="button" class="btn  btn-xs btn-danger" data-dismiss="modal" onclick="delAirway(\'' + name + '\')">保 存</button>'
            str+='</div>'
        str+='</div>'
    str+='</div>'
    $("#deleteAirway").html(str);
    $("#deleteAirway").modal('show');          
}

function airway_tuige()
{   
	if(waypoint_name.length == 0){ return;}
    waypoint_name.pop();
    var waypoint_str = "";
    for (var i = 0; i < waypoint_name.length-1; i++) {
        waypoint_str += waypoint_name[i];
        waypoint_str += "->"
    }
    if(waypoint_name.length > 0)
    	waypoint_str += waypoint_name[waypoint_name.length - 1];
    document.getElementById("a_waypoint_show").value=waypoint_str;
}
function airway_qingkong()
{
    waypoint_name.splice(0,waypoint_name.length);
    var waypoint_str = "";
    document.getElementById("a_waypoint_show").value=waypoint_str;
}

//航线
function addAirway()
{
    var data=new Object();
    data.airway_name=document.getElementById("a_airway_name").value;
    var str = "";
    var num = waypoint_name.length;
    for (var i = 0; i < num-1; i++) {
        str += '\''+waypoint_name[i] +'\'' +',';
    }
    str += '\''+waypoint_name[num-1]+'\'';
    for (var i = num; i < 20; i++) {
        str+= ',' + '\'' + 'null' + '\'';
    }
    data.waypoint = str;
    postAjax("AirwayAddServlet",data,feedback);
}

function delAirway(name)
{
    var data=new Object();
    data.airway_name=name;
    postAjax("AirwayDelServlet",data,feedback);
}
