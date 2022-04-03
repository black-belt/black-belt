package com.blackbelt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import com.blackbelt.websocket.SocketHandler;

import lombok.RequiredArgsConstructor;

/*
// = xml configuration 설정 
@RequiredArgsConstructor			//???
@Configuration
@EnableWebSocket
public class SocketConfig implements  WebSocketConfigurer{	// WebSocketConfigurer
	
	// 이게 그냥 websocket 구현예제
	
	private final SocketHandler socketHandler;
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(socketHandler,"/socket")			// ws 주소 기준		//.withSockJS();
				.addInterceptors(new HttpSessionHandshakeInterceptor())
				.setAllowedOrigins("*");
		// 한 소켓에 연결해서 쓰면 안되고 이렇게 따로 따로 써야됨 !!! 
		registry.addHandler(socketHandler,"/battle")			// ws 주소 기준		//.withSockJS();
				.addInterceptors(new HttpSessionHandshakeInterceptor())
				.setAllowedOrigins("*");
	}
	
	
	
    //@Bean
    //public WebSocketHandler myHandler() {
    //    return new SocketHandler();
    //}
}
*/



@Configuration
@EnableWebSocketMessageBroker
public class SocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub");
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp").setAllowedOriginPatterns("*")			//.setAllowedOrigins("*")
                .withSockJS();
    }
}

/*
@Configuration
@EnableWebSocketMessageBroker
public class SocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
        		.setAllowedOriginPatterns("*")
        		.withSockJS();
    }
	
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/SUB");
        config.setApplicationDestinationPrefixes("/PUB");
    }


}*/
