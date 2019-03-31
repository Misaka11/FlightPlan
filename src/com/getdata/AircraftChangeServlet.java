package com.getdata;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AircraftChangeServlet
 */
@WebServlet("/AircraftChangeServlet")
public class AircraftChangeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AircraftChangeServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        String aircraft_name=request.getParameter("aircraft_name");
        String aircraft_model=request.getParameter("aircraft_model");
        String aircraft_weight=request.getParameter("aircraft_weight");
        
        OracleJdbcTest test = new OracleJdbcTest();
        String ans="success";
    	String sql="update AIRCRAFT set aircraft_model='"+aircraft_model+"',aircraft_weight="+aircraft_weight+" where aircraft_name='"+aircraft_name+"'";
        try {
        	test.query(sql);
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
