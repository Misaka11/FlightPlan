package com.getdata;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class UserLoginServlet
 */
@WebServlet("/UserLoginServlet")
public class UserLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
    	String un=request.getParameter("username");
    	String pw=request.getParameter("password");
    	//��pw�������ݿ���м���
    	SHA sha = new SHA();
    	String password=sha.encrypt(pw);
    	//�ȶ����ݿ��user_info���Ƿ���ڸ��û�
    	OracleJdbcTest test = new OracleJdbcTest();
    	String sql="select username,competence from user_info where username='"+un+"' and password='"+password+"'";
    	String ans="success";
    	try
    	{
    		ans = test.display(sql);
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
