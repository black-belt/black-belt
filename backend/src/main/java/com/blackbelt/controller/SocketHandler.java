package com.blackbelt.controller;


import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.server.ServerEndpoint;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@ServerEndpoint("/")
public class SocketHandler extends TextWebSocketHandler {
	
	Map<String, WebSocketSession> users = new ConcurrentHashMap<String, WebSocketSession>(); // 로그인중인 개별유저 저장
	private static final List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();// Session 저장용 Session list 
	
	/*
	// 임시 페이지 렌더링 
	public String hello() { 
		return "index"; 
	} */
	
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
    	System.out.println(session.toString());
		System.out.println(message.toString());
		String senderId = getMemberId(session);
		// senderid는 null로 뜸 ㅠ 
		// 특정 유저에게 보내기
		String msg = message.getPayload();
		if(msg != null) {
			String[] strs = msg.split(",");
			// 프론트의 메시지 전송 여부에 따라 달라짐 
			if(strs != null && strs.length == 4) {	
				String type = strs[0];
				String target = strs[1]; // userId 저장
				String content = strs[2];
				String url = strs[3];
				WebSocketSession targetSession = users.get(target);  // 메시지를 받을 세션 조회
				
				// 실시간 접속시
				if(targetSession!=null) {
					// 상대 user에게 메세지 전송 
					TextMessage tmpMsg = new TextMessage("0");
					try {
						targetSession.sendMessage(tmpMsg);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		
    }
    ///////////////////////////////////////////////////
    // Socket 연결 성사 
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    	String senderId = getMemberId(session);
    	// 로그인 값이 있는 경우,
		if(senderId!=null) {	
			users.put(senderId, session);   // 로그인중 개별유저 저장
			sessions.add(session);
			System.out.println("Socket Connection Established:" + session.toString());
		}
       
    }

    // Socket 연결 해제 
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
		String senderId = getMemberId(session);
		// 로그인 값이 있는 경우,
		if(senderId!=null) {	
			users.remove(senderId);
			sessions.remove(session);
			System.out.println("Socket Connection Closed:" + session.toString());
		}
    }
    
    // 접속 유저의 ID 얻는 함수     ( http세션을 조회해 id get)
	private String getMemberId(WebSocketSession session) {
		Map<String, Object> httpSession = session.getAttributes();
		String user_id = (String) httpSession.get("userId"); // 세션에 저장된"userId" 조회
		return user_id==null? null: user_id;
	}
}