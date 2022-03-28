package com.blackbelt.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
/*
//웹소켓 관련 설정 파일
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
	
	
	@Override
	//CORS 허용
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// 양쪽 user의 웹소켓 HandShake 를 위한 지정
		registry.addEndpoint("/").setAllowedOrigins("*").withSockJS();
	}
}
*/
