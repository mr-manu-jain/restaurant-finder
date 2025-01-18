package com.sjsu.cmpe202.finedine.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    private boolean isTokenValid(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return false;
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            JsonNode claims = objectMapper.readTree(payload);
            return claims.has("oid");
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            return false;
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        System.out.println("Request URI: " + request.getRequestURI());
        System.out.println("Request Method: " + request.getMethod());

        // Allow /api/findByZipcode to pass through without a token
        if ("/api/findByZipcode".equals(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Allow /api/restaurant/getByZipCode to pass through without a token
        if ("/api/restaurant/getByZipCode".equals(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Allow /api/restaurant/getRatingsForRestaurant to pass through without a token
        if ("/api/restaurant/getRatingsForRestaurant".equals(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Received token: " + token);
            if (isTokenValid(token)) {
                System.out.println("Token is valid");
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    "user", null, Collections.emptyList()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(request, response);
            } else {
                System.out.println("Token is invalid");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            System.out.println("No token provided");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}