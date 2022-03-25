package com.blackbelt.controller;


import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.io.IOException;
import java.net.Socket;

// javax의 websocket 기술을 주로 사용 
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

//@RestController
@Controller
@ServerEndpoint("/message")
public class SocketHandler extends TextWebSocketHandler{ //Socket
	
	// 로그인 중인 유저 저장 
	Map<String, Session> users = new ConcurrentHashMap<String, Session>();
	private static final List<Session> sessions = new ArrayList<Session>();
	
	
	// 프론트 화면 표시용 
	@GetMapping("/socket")
	public String index(Model model) {
		model.addAttribute("index","yaho");
		return "index";
	}
	
	// 세션 오픈 
	@OnOpen
	public void open(Session session) {
		System.out.println("connected");
		// 접속한 유저의 http 세션 조회해 id 얻음 
		String senderId = getMemberId(session);
		if(senderId!=null) {
			//log(senderId + "연결 됨");
			System.out.println(senderId + "연결 됨");
			// 로그인 중인 개별 유저 저장
			users.put(senderId, session);
			sessions.add(session);
			System.out.println("이거확인해 윤수야:"+session.getId());
		}
	}
	// 클라이언트 -> 서버 연결 : 세션 오픈 
	/*
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception{
		// 접속한 유저의 http 세션 조회해 id 얻음 
		String senderId = getMemberId(session);
		// 로그인 값이 있는 경우 
		if(senderId!=null) {
			//log(senderId + "연결 됨");
			System.out.println(senderId + "연결 됨");
			// 로그인 중인 개별 유저 저장
			users.put(senderId, session);
			sessions.add(session);
			System.out.println("이거확인해 윤수야:"+session.getId());
		}
		else
			System.out.println("에러다에러다에러다");
	}*/
	
	/*
	// 세션에 메시지 보냄
	@OnMessage
	public void getMsg(Session recieveSession, String msg) {	// 지정된 세션 + 메시지 내용 
		// 세션의 list를 돌며 
		for(int i=0;i<session.size();i++) {
			// 1. 지정된 세션의 ID가 세션리스트에 있는 세션의 ID와 같지 않으면 = 상대가 내 세션에 보내는 문자임 
			if(!recieveSession.getId().equals(session.get(i).getId())) {
				try {
					// getBasicRemote()는, WebSocketConfig.java에 설정한 endPoint의 Value값(id 텍스트)에 메시지 전송
					session.get(i).getBasicRemote().sendText("상대:"+msg);
				}catch(IOException e) {
					// [import IOException] 에러의 발생 근원지를 찾아 단계별로 에러를 출력한다.
					e.printStackTrace();
				}
			// 1. 지정된 세션의 ID가 세션리스트에 있는 세션의 ID와 같으면 = 내가 치는 문자임
			}else {
				try {
					session.get(i).getBasicRemote().sendText("나:"+msg);
				}catch(IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}*/
	
	// 클라이언트가 데이터 전송 시 
	@OnMessage
	protected void handleTextMessage(Session session, TextMessage message) throws Exception{
		String senderId = getMemberId(session);
		// 특정 유저에게 보내기 
		String msg = message.getPayload();
		
		if(msg != null) {
			String[] strs = msg.split(",");
			//log(strs.toString());
			// 메시지 내용을 파싱해서 사용 
			if(strs != null && strs.length == 4) {
				String type = strs[0];
				String target = strs[1]; // m_id 저장
				String content = strs[2];
				String url = strs[3];
				// 메시지를 받을 세션 조회
				Session targetSession = users.get(target);  
				
				// 실시간 접속시
				if(targetSession!=null) {
					// ex: [&분의일] 신청이 들어왔습니다.
					String tmpMsg = new String("<a target='_blank' href='"+ url +"'>[<b>" + type + "</b>] " + content + "</a>" );
					targetSession.getBasicRemote().sendText(tmpMsg);
				}
			}
		}


	}
	/*
	// 연결 해제될 때
		@Override
		public void afterConnectionClosed(Session session, CloseStatus status) throws Exception {
			String senderId = getMemberId(session);
			if(senderId!=null) {	// 로그인 값이 있는 경우만
				//log(senderId + " 연결 종료됨");
				System.out.println(senderId + " 연결 종료됨");
				users.remove(senderId);
				sessions.remove(session);	// sessions 어딨음?
			}
		}
	*/
	// 에러 발생시
		@Override
		public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
			//log(session.getId() + " 익셉션 발생: " + exception.getMessage());
			System.out.println(session.getId() + " 익셉션 발생: " + exception.getMessage());

		}
		
		
		// 웹소켓에 id 가져오기
	    // 접속한 유저의 http세션을 조회하여 id를 얻는 함수
		private String getMemberId(Session session) {
			//Map<String, Object> httpSession = session.getAttributes();	
			//Map<String, Object> httpSession = session.getAttributes();		//session.get(i).getBasicRemote().sendText("나:"+msg);
			//String m_id = (String) httpSession.get("m_id"); // 세션에 저장된 m_id 기준 조회
			//String m_id = "1";
			//return m_id==null? null: m_id;
			return "1";
		}
	
	
}
