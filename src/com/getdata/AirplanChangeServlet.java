package com.getdata;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AirplanChangeServlet
 */
@WebServlet("/AirplanChangeServlet")
public class AirplanChangeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AirplanChangeServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        String an1 = request.getParameter("an1");
        String an2 = request.getParameter("an2");
        String an3 = request.getParameter("an3");
        String an4 = request.getParameter("an4");
        String an5 = request.getParameter("an5");
        String an6 = request.getParameter("an6");
        String an7 = request.getParameter("an7");
        String an8 = request.getParameter("an8");
        String an9 = request.getParameter("an9");
        String an10 = request.getParameter("an10");
        String an11 = request.getParameter("an11");
        String an12 = request.getParameter("an12");
        
        OracleJdbcTest test = new OracleJdbcTest();
        String ans="success";
        String sql1="delete from flight_plan where flight_plan_name='"+an1+"'";
    	String sql2="insert into FLIGHT_PLAN values('"+an1+"','"+an2+"','"+an3+"','"+an4+"','"+an5+"','"+an6+"','"+an7+"','"+an8+"','"+an9+"','"+an10+"','"+an11+"','"+an12+"')";
        try {
        	test.query(sql1);
            test.query(sql2);
        }catch(Exception e)
    	{
            ans="fail";
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
