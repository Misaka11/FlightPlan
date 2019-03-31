package com.getdata;
//µ¼Èëjava.sql°ü
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList; 
import java.util.List; 
import net.sf.json.JSON; 
import net.sf.json.JSONArray; 
import net.sf.json.JSONObject; 
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter; 

public class OracleJdbcTest {
	//Êý¾Ý¿âÁ¬½Ó¶ÔÏó
    private static Connection conn = null;
     
    private static String driver = "oracle.jdbc.driver.OracleDriver"; //Çý¶¯
     
    private static String url = "jdbc:oracle:thin:@//127.0.0.1:1521/orcl"; //Á¬½Ó×Ö·û´®
     
    private static String username = "system"; //ÓÃ»§Ãû
     
    private static String password = "123456"; //ÃÜÂë
     
     
    // »ñµÃÁ¬½Ó¶ÔÏó
    private static synchronized Connection getConn(){
        if(conn == null){
            try {
                Class.forName(driver);
                conn = DriverManager.getConnection(url, username, password);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return conn;
    }
     
   //Ö´ÐÐÆäËûÓï¾ä
    public void query(String sql) throws SQLException{
        PreparedStatement pstmt;
        pstmt = getConn().prepareStatement(sql);
        pstmt.executeUpdate();;
        pstmt.close();
    }
    public String display(String sql) throws SQLException{
        PreparedStatement pstmt;  
        String jsonstr="";
        try {
            pstmt = getConn().prepareStatement(sql,ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            //½¨Á¢Ò»¸ö½á¹û¼¯£¬ÓÃÀ´±£´æ²éÑ¯³öÀ´µÄ½á¹û
            ResultSet rs = pstmt.executeQuery();
            // json数组
           JSONArray array = new JSONArray();
          
           // 获取列数
           ResultSetMetaData metaData = rs.getMetaData();
           int columnCount = metaData.getColumnCount();
          
           // 遍历ResultSet中的每条数据
            while (rs.next()) {
                JSONObject jsonObj = new JSONObject();
               
                // 遍历每一列
                for (int i = 1; i <= columnCount; i++) {
                    String columnName =metaData.getColumnLabel(i);
                    String value = rs.getString(columnName);
                    columnName = columnName.toLowerCase();
                    jsonObj.put(columnName, value);
                } 
                array.add(jsonObj); 
            }
            jsonstr = array.toString();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jsonstr;
    }
    
    //¹Ø±ÕÁ¬½Ó
    public void close(){
        try {
            getConn().close();
             
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
     
}

