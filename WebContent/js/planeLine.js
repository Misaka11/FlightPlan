$(function () {
    getPlaneList();
});
function getPlaneList() {
    postAjax("line_getPlaneLineList.action",{},planeList);
}
function planeList(data) {
    var tHead =["线路名","起点","终点","中转站","总里程","飞行高度","操作"];
    var tData = [];
    for (var i = 0; i < data.length; i++) {
        var tdContent = [];
        tdContent.push(data[i].lineName);
        var point = getAjax("point_getOnePoint.action",{code:data[i].startPoint});
        if(point==null)
            tdContent.push("该站点不存在");
        else
            tdContent.push(point[0].pointName);
        point = getAjax("point_getOnePoint.action",{code:data[i].endPoint});
        if(point==null)
            tdContent.push("该站点不存在");
        else
            tdContent.push(point[0].pointName);
        tdContent.push("<a onclick='getPoint(\""+data[i].middlePoint+"\")'>点击查看途经点</a>");
        tdContent.push(data[i].mileage);
        tdContent.push(data[i].lineHeight);
        var action="";
        action +="<button class='btn  btn-danger btn-sm' onclick='deletePlaneUi("+data[i].lineId+")'><i class='icon-trash bigger-100'></i>删除</button>";
        action +="<button class='btn  btn-success btn-sm' onclick='changePlane("+data[i].lineId+")'><i class='icon-pencil align-top bigger-125'></i>修改</button>";
        tdContent.push(action);
        tData.push(tdContent);
    }
    TableAdvanced.init("#planeInfo", tHead, tData, true);
}
function getPoint(str){
    postAjax("point_getSomePoint.action",{points:str},pointList);
}
function pointList(data) {
    var html="";
    html+="<div class='row'>";
    $(data).each(function (key,obj) {
        html+="<div class='col-md-1'>"+obj.pointName+"</div><div class='col-md-1'><i class='fa fa-arrow-right'></i></div>";
    });
    html+="</div>";
    modal("途经点依次为：",html,"hide()");
}
function changePlane(id){
    postAjax("line_ListPlaneLine.action",{id:id},updatePlaneList);
}
function updatePlaneList(data) {

    $(data).each(function (key,obj) {
        var PlaneHtml = "";
        PlaneHtml += "<form  id='form_PlaneInsert' class='form container-fluid' accept-charset='UTF-8' name='Planeform'  method='post'>"
        PlaneHtml += "<div class='modal-dialog' role='document'>"
        PlaneHtml += "<div class='modal-content'>"
        PlaneHtml += "<div class='modal-header'>"
        PlaneHtml += "<h5 class='modal-title' id='exampleModalLabel'>修改飞行线路：</h5>"
        PlaneHtml += "</div>"
        PlaneHtml += "<div class='modal-body'>"
        PlaneHtml += "<div class='row'>"
        PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>名称</p></div>"
        PlaneHtml += "<div class='col-md-7'><input type='text' id='pl.lineName' name='pl.lineName' class='form_put' value='"+polish(obj.lineName)+"'></div>"
        PlaneHtml += "</div>"
        var point = getAjax("point_getALLPoint.action",{});
        PlaneHtml += "<div class='row'>"
        PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>起点</p></div>"
        PlaneHtml += "<div class='col-md-7'><select name='pl.startPoint'><option value='"+obj.lineName+"'>--未修改--</option>"
        for(var i=0;i<point.length;i++) {
            PlaneHtml += "<option value='" + point[i].code + "'>" + point[i].pointName + "</option>";
        }
        PlaneHtml += "</select></div></div>"
        PlaneHtml += "<div class='row'>"
        PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>终点</p></div>"
        PlaneHtml += "<div class='col-md-7'><select name='pl.endPoint'><option value='"+obj.lineName+"'>--未修改--</option>"
        for(var i=0;i<point.length;i++) {
            PlaneHtml += "<option value='" + point[i].code + "'>" + point[i].pointName + "</option>";
        }
        PlaneHtml += "</select></div></div>"
        PlaneHtml += "<div class='row'>"
        PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>途经点</p></div>"
        var j=1;
        PlaneHtml += "<div class='col-md-7'><select id='middle'><option>--请依次选择途经点--</option>"
        for(var i=0;i<point.length;i++) {
            PlaneHtml += "<option value='" + point[i].pointName + "' id='" + point[i].code + "'>" + point[i].pointName + "</option>";
        }
        PlaneHtml += "</div>"
        PlaneHtml += "<div class='col-md-12'><input type='text' id='pl.middlePoint' name='pl.middlePoint'  value='"+polish(obj.middlePoint)+"' class='form_put' style='display: none'></div>"
        PlaneHtml += "</div>"
        PlaneHtml += "<div class='row'>"
        PlaneHtml += "<div class='col-md-7 col-md-offset-5'><input id='middle_point' value='' readonly='readonly' ></div>"
        PlaneHtml += "</div>"
        PlaneHtml += "<div class='row'>"
        PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>总里程</p></div>"
        PlaneHtml += "<div class='col-md-7'><input type='text' id='pl.mileage' name='pl.mileage' class='form_put'value='"+polish(obj.mileage)+"'></div>"
        PlaneHtml += "</div>"
        PlaneHtml += "<div class='row'>"
        PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>飞行高度</p></div>"
        PlaneHtml += "<div class='col-md-7'><input type='text' id='pl.lineHeight' name='pl.lineHeight' class='form_put'value='"+polish(obj.lineHeight)+"'></div>"
        PlaneHtml += "</div>"
        PlaneHtml += "</div>"
        PlaneHtml += "<div class='modal-footer'>"
        PlaneHtml += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick='hide()'>取消</button>"
        PlaneHtml += "<button type='button' class='btn btn-primary' onclick='addPlane()'>确定</button>"
        PlaneHtml += "</div>"
        PlaneHtml += "</div>"
        PlaneHtml += "</div>"
        PlaneHtml += "</form>"
        $("#show").html(PlaneHtml);
        $("#show").css('display','block');
        var MiddlePoint=getAjax("point_getSomePoint.action",{points:obj.middlePoint});
        var MiddleVal="";
        for(var i=0;i<MiddlePoint.length;i++){
            MiddleVal+= i==0 ? MiddlePoint[i].pointName:"->"+MiddlePoint[i].pointName;
        }
        document.getElementById("middle_point").value=MiddleVal;
        $("#middle").change(function () {
            if(j==1) {
                document.getElementById("pl.middlePoint").value = "";
                document.getElementById("middle_point").value = "";
            }
            var selected=$(this).children('option:selected').val();
            var selectid=$(this).children('option:selected').attr("id");
            var middleValue=document.getElementById("pl.middlePoint").value+selectid+";";
            var middle_pointValue=j==1?document.getElementById("middle_point").value+selected:document.getElementById("middle_point").value+"->"+selected;
            document.getElementById("pl.middlePoint").value=middleValue;
            document.getElementById("middle_point").value=middle_pointValue;
            j++;
        })
    })
}
function updatePlane(id) {
    if(document.getElementById('pl.planeName').value==null||document.getElementById('pl.type').value==null){
        modal("提示","修改失败，请填写完整信息！","hide()");
    }else {
        var param = $("#form_PlaneInsert").serializeArray();
        postAjax('plane_updatePlane.action', param,PlaneSuccess);
    }
    hide();
}
function addPlaneList() {
    var PlaneHtml = "";
    PlaneHtml += "<form  id='form_PlaneInsert' class='form container-fluid' accept-charset='UTF-8' name='Planeform'  method='post'>"
    PlaneHtml += "<div class='modal-dialog' role='document'>"
    PlaneHtml += "<div class='modal-content'>"
    PlaneHtml += "<div class='modal-header'>"
    PlaneHtml += "<h5 class='modal-title' id='exampleModalLabel'>添加新的飞行线路：</h5>"
    PlaneHtml += "</div>"
    PlaneHtml += "<div class='modal-body'>"
    PlaneHtml += "<div class='row'>"
    PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>名称</p></div>"
    PlaneHtml += "<div class='col-md-7'><input type='text' id='pl.lineName' name='pl.lineName' class='form_put'></div>"
    PlaneHtml += "</div>"
    var point = getAjax("point_getALLPoint.action",{});
    PlaneHtml += "<div class='row'>"
    PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>起点</p></div>"
    PlaneHtml += "<div class='col-md-7'><select name='pl.startPoint'><option>--请选择--</option>"
    for(var i=0;i<point.length;i++) {
        PlaneHtml += "<option value='" + point[i].code + "'>" + point[i].pointName + "</option>";
    }
    PlaneHtml += "</select></div></div>"
    PlaneHtml += "<div class='row'>"
    PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>终点</p></div>"
    PlaneHtml += "<div class='col-md-7'><select name='pl.endPoint'><option>--请选择--</option>"
    for(var i=0;i<point.length;i++) {
        PlaneHtml += "<option value='" + point[i].code + "'>" + point[i].pointName + "</option>";
    }
    PlaneHtml += "</select></div></div>"
    PlaneHtml += "<div class='row'>"
    PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>途经点</p></div>"
    var j=1;
    PlaneHtml += "<div class='col-md-7'><select id='middle'><option>--请依次选择途经点--</option>"
    for(var i=0;i<point.length;i++) {
        PlaneHtml += "<option value='" + point[i].pointName + "' id='" + point[i].code + "'>" + point[i].pointName + "</option>";
    }
    PlaneHtml += "</div>"
    PlaneHtml += "<div class='col-md-12'><input type='text' id='pl.middlePoint' name='pl.middlePoint'  value='' class='form_put' style='display: none'></div>"
    PlaneHtml += "</div>"
    PlaneHtml += "<div class='row'>"
    PlaneHtml += "<div class='col-md-7 col-md-offset-5'><input id='middle_point' value='' readonly='readonly' ></div>"
    PlaneHtml += "</div>"
    PlaneHtml += "<div class='row'>"
    PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>总里程</p></div>"
    PlaneHtml += "<div class='col-md-7'><input type='text' id='pl.mileage' name='pl.mileage' class='form_put'></div>"
    PlaneHtml += "</div>"
    PlaneHtml += "<div class='row'>"
    PlaneHtml += "<div class='col-md-3 col-md-offset-2'><p>飞行高度</p></div>"
    PlaneHtml += "<div class='col-md-7'><input type='text' id='pl.lineHeight' name='pl.lineHeight' class='form_put'></div>"
    PlaneHtml += "</div>"
    PlaneHtml += "</div>"
    PlaneHtml += "<div class='modal-footer'>"
    PlaneHtml += "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick='hide()'>取消</button>"
    PlaneHtml += "<button type='button' class='btn btn-primary' onclick='addPlane()'>确定</button>"
    PlaneHtml += "</div>"
    PlaneHtml += "</div>"
    PlaneHtml += "</div>"
    PlaneHtml += "</form>"
    $("#show").html(PlaneHtml);
    $("#show").css('display','block');
    $("#middle").change(function () {
        var selected=$(this).children('option:selected').val();
        var selectid=$(this).children('option:selected').attr("id");
        var middleValue=document.getElementById("pl.middlePoint").value+selectid+";";
        var middle_pointValue=document.getElementById("middle_point").value+"->"+selected;
        document.getElementById("pl.middlePoint").value=middleValue;
        if(j==1)
            middle_pointValue=document.getElementById("middle_point").value+selected;
        document.getElementById("middle_point").value=middle_pointValue;
        j++;
    })
}

function addPlane() {
    if(document.getElementById('pl.lineName').value==null||document.getElementById('pl.lineHeight').value==null){
        modal("提示","添加失败，请填写完整信息！","hide()");
    }else {
        var param = $("#form_PlaneInsert").serializeArray();
        postAjax('line_addPlaneLine.action', param,PlaneSuccess);
    }
    hide();
}
function deletePlaneUi(id) {
    modal("提示：","是否删除？","deletePlane("+id+")");
}
function deletePlane(id) {
    postAjax("line_deletePlaneLine.action",{id:id},PlaneSuccess);
}
function PlaneSuccess(data) {
    if(data.resultCode=="200")
        modal("提示：","操作成功！","planeReturn()");
    else
        modal("提示：","删除失败，"+data.resultDesc,"planeReturn()");
}
function planeReturn() {
    window.location.href="planeLine.jsp";
}
