package com.blackbelt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import com.blackbelt.controller.SocketHandler;


// = xml configuration 설정 
@Configuration
@EnableWebSocket
public class SocketConfig implements WebSocketConfigurer{
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(myHandler(),"/socket")			// ws 주소 기준		//.withSockJS();	
				.addInterceptors(new HttpSessionHandshakeInterceptor())
				.setAllowedOrigins("*");
	}
	
    @Bean
    public WebSocketHandler myHandler() {
        return new SocketHandler();
    }
}
