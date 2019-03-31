$(function(){
	//document.getElementById("p1").innerHTML = airway_list.length;
	var airway = [];
	var airport = [];
	var aircraft = [];
	var airplan = [];
	var user = [];
	airway = getAjax("AirwayDisplayServlet",{});
	airport = getAjax("AirportDisplayServlet",{});
	aircraft = getAjax("AircraftDisplayServlet",{});
	airplan = getAjax("AirplanDisplayServlet",{});
	user = getAjax("UserDisplayServlet",{});
	var pt = 0;
	var gl = 0;
	for (var i = user.length - 1; i >= 0; i--) {
		if(user[i].competence==0) pt+=1;
		else gl += 1;
	}

	$('#bar-1').jqbar({ label: '飞行计划数量：', value: airplan.length, barColor: '#D64747' });

	$('#bar-2').jqbar({ label: '机场数量：', value: airport.length, barColor: '#FF681F' });

	$('#bar-3').jqbar({ label: '航线数量', value: airway.length, barColor: '#ea805c' });

	$('#bar-4').jqbar({ label: '飞机数量', value: aircraft.length, barColor: '#88bbc8' });

	$('#bar-5').jqbar({ label: '普通用户数量：', value: pt, barColor: '#939393' });

	$('#bar-6').jqbar({ label: '管理员数量:', value: gl, barColor: '#3a89c9' });

})


