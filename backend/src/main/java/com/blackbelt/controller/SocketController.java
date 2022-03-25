package com.blackbelt.controller;

import java.util.*;
import java.io.IOException;
import java.net.Socket;

// javax의 websocket 기술을 주로 사용 
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;



/*


//@RestController
@Controller
@ServerEndpoint("/message")
public class SocketController extends Socket{
	
	// session = 세션리스트
	private static final List<Session> session = new ArrayList<Session>();
	
	// 프론트 화면 표시용 
	@GetMapping("/socket")
	public String index(Model model) {
		model.addAttribute("index","yaho");
		return "index";
	}
	
	// 세션 오픈 
	@OnOpen
	public void open(Session newUser) {
		System.out.println("connected");
		// 세션리스트에 오픈된 세션 추가 
		session.add(newUser);
		System.out.println("이거확인해 윤수야:"+newUser.getId());
	}
	
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
		
	}
	
	
}
*/