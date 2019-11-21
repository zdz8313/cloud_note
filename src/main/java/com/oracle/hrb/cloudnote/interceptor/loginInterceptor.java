package com.oracle.hrb.cloudnote.interceptor;

import com.oracle.hrb.cloudnote.entity.User;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class loginInterceptor  implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        System.out.println("拦截器......");
        User user = (User) request.getSession().getAttribute("user");
        if(user == null){
            //拦截之前发一个信息回去
            PrintWriter out =response.getWriter();
            out.print("fail");
            out.close();
            return  false;
        }
        return true;
    }
}
