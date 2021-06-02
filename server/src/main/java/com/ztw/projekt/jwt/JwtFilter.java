package com.ztw.projekt.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtFilter implements javax.servlet.Filter {

    public static String key = "qseytdffb";
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String header = httpServletRequest.getHeader("Authorization");
        if( ! header.startsWith("Bearer ")){
            throw new ServletException("Wrong or empty header");
        }
        else{
            try{
                String token = header.substring(7);
                Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
                request.setAttribute("claims", claims);
            }
            catch (Exception e){
                throw new ServletException("Wrong key");
            }
        }
        chain.doFilter(request, response);
    }
}