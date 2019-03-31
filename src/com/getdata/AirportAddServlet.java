package com.getdata;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AirportServlet
 */
@WebServlet("/AirportAddServlet")
public class AirportAddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AirportAddServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        String name=request.getParameter("name");//������
        String name_ab=request.getParameter("name_ab");//����ID
//        int name_ab=Integer.parseInt(s_name_ab);
        String identification=request.getParameter("identification");//��ʶ
        String longitude=request.getParameter("longitude");//����
        String latitude=request.getParameter("latitude");//γ��
        String height=request.getParameter("height");//�߶�
        String cut_angle=request.getParameter("cut_angle");//����Ƕ�
        String cut_direction=request.getParameter("cut_direction");//���뷽��
        String airport_country=request.getParameter("airport_country");//��������
        String airport_state=request.getParameter("airport_state");//����ʡ��
        String airport_city=request.getParameter("airport_city");//��������
    	
        OracleJdbcTest test = new OracleJdbcTest();
        String ans="success";
    	String sql="insert into AIRPORT values('"+name+"',"+name_ab+","+identification+",'"+longitude+"','"+latitude+"','"+height+"','"+cut_angle+"','"+cut_direction+"','"+airport_city+"','"+airport_state+"','"+airport_country+"')";
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
