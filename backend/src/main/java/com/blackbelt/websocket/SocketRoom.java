package com.blackbelt.websocket;


import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.blackbelt.websocket.ChatMessage.MessageType;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Setter;
import lombok.Getter;

/* 모든 로그인한 유저 소켓 */

@Getter @Setter
public class SocketRoom {
    private String userId;
    Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<String, WebSocketSession>(); // 로그인중인 유저 저장

    public static SocketRoom create(String userId){
        SocketRoom socketRoom = new SocketRoom();
        socketRoom.userId = userId;
        return socketRoom;
    }
    
    public void handleMessage(WebSocketSession session, ChatMessage chatMessage,
                              ObjectMapper objectMapper) throws IOException {
    	
    	if(chatMessage.getType() == MessageType.LOGIN){
    		userId = chatMessage.getSenderId();
        	userSessions.put(userId,session);
            chatMessage.setMessage(chatMessage.getSenderId() + "님이 로그인했습니다.");
        }
        else if(chatMessage.getType() == MessageType.LOGOUT){
        	userSessions.remove(session);
            chatMessage.setMessage(chatMessage.getSenderId() + "님이 로그아웃했습니다.");
        }
    	
    	// 행위 : 신청 / 수락/ 거절 
    	if(chatMessage.getType() == MessageType.INVITE){
            chatMessage.setMessage(chatMessage.getSenderId() + "님이 겨루기를 신청하였습니다.");
        }
    	else if(chatMessage.getType() == MessageType.ACCEPT){
            chatMessage.setMessage(chatMessage.getRecieverId() + "겨루기를 수락합니다.");
        }
    	else if(chatMessage.getType() == MessageType.REFUSE){
            chatMessage.setMessage(chatMessage.getRecieverId() + "겨루기를 거절합니다.");
        }
    	// 반응 : 수락됨 / 거절됨
    	else if(chatMessage.getType() == MessageType.ACCEPT){
            chatMessage.setMessage(chatMessage.getSenderId() + "님이 겨루기를 수락하셨습니다.");
        }
    	else if(chatMessage.getType() == MessageType.REFUSE){
            chatMessage.setMessage(chatMessage.getSenderId() + "님이 겨루기를 거절하셨습니다.");
        }

        else{	// 예외처리 
            chatMessage.setMessage(chatMessage.getSenderId() + " : " + chatMessage.getMessage());
        }
    	// 타겟 찾음 
    	WebSocketSession targetSession = session;
    	targetSession = userSessions.get(chatMessage.getRecieverId());
    	send(targetSession,chatMessage,objectMapper);
    }

    // targetSession에 chatMessage를 보냄 
    private void send(WebSocketSession targetSession, ChatMessage chatMessage, ObjectMapper objectMapper) throws IOException {
        TextMessage textMessage = new TextMessage(objectMapper.
                                    writeValueAsString(chatMessage.getMessage()));
        targetSession.sendMessage(textMessage);
    }
}