package com.getdata;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AirwayAddServlet
 */
@WebServlet("/AirwayAddServlet")
public class AirwayAddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AirwayAddServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        String airway_name=request.getParameter("airway_name");
        String waypoint=request.getParameter("waypoint");//���ո��滻�ɶ���
        //��num+1���㣬����Ҫ���䵽20��������ı��Ϊ -1
        OracleJdbcTest test = new OracleJdbcTest();
        String sql="insert into AIRWAY values('"+airway_name+"',"+waypoint+")";
        String ans="success";
        try {
        	test.query(sql);
        }catch(Exception e)
    	{
            ans="fail";//�������ظ�
    	}  	
        response.getWriter().print(ans);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
