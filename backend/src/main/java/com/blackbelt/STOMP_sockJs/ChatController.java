package com.blackbelt.STOMP_sockJs;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.RequiredArgsConstructor;

// 데이터 전송 controller

@RequiredArgsConstructor
@Controller
public class ChatController {

 public static final Logger logger = LoggerFactory.getLogger(ChatController.class);
 private final SimpMessageSendingOperations messagingTemplate;
/*
 @MessageMapping("/api/que/message")
 public void message(ChatMessage message) {
	 // 로그인 했을 때
	 if (ChatMessage.MessageType.LOGIN.equals(message.getType())) {		// 
         message.setMessage(message.getSenderId() + "님이 입장하셨습니다.");
         messagingTemplate.convertAndSend("/sub/api/que/room/" + message.getUserId(), message);
         }
	 // 초대 했을 때
	 else if (ChatMessage.MessageType.ENTER.equals(message.getType()))		// 
         message.setMessage(message.getSenderId() + "님이 입장하셨습니다.");
     	messagingTemplate.convertAndSend("/sub/api/que/room/" + message.getRoomId(), message);
 }
 */
 
 // [유저 큐] 개별 세션 생성
 // [지정 큐] 메시지 핸들러
 @MessageMapping("/api/que/user")
 public void userque(ChatMessage message) {
	 logger.info("Socket Message '백'에서 수신" );
	 
	 if (ChatMessage.MessageType.LOGIN.equals(message.getType())) {		// 
		logger.info("로그인 시: " + message);
		System.out.println("로그인 시 "+ message);
        message.setMessage(message.getUserId() + "님이 로그인해서, 유저세션에 추가되었습니다");
        messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getUserId(), message);
         }
	 // 신청 보냈을 때
	 else if (ChatMessage.MessageType.INVITE.equals(message.getType())) {		// 
		logger.info("신청 시: "+ message );
		System.out.println("신청 시 "+ message);
        message.setMessage(message.getHostId() + "님이 초대를 보냈습니다");
        messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getGuestId(), message);
         }
	 // 초대 했을 때
	 else if (ChatMessage.MessageType.ACCEPT.equals(message.getType()))	{	// 
		logger.info("초대 시: " + message);
		System.out.println("초대 시 "+ message);
        message.setMessage(message.getGuestId() + "님이 수락하셨습니다.");
     	messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getHostId(), message);
 		}
   	 // 거절 했을 때
   	 else if (ChatMessage.MessageType.REFUSE.equals(message.getType()))	{	// 
   		logger.info("거절 시: "+ message );
   		System.out.println("거절 시 "+ message);
        message.setMessage(message.getGuestId() + "님이 거절하셨습니다.");
        messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getHostId(), message);
 	}
}

 
 // [랜덤 큐] 메시지 핸들러
 @MessageMapping("/api/que/random")
 public void randomque(ChatMessage message) {
	 // 아직 미작성 
}
 
 // [배틀 대기방] 메시지 핸들러
 @MessageMapping("/api/battle")
 public void battleready(ChatMessage message) {
	 // 아직 미작성 
	 if (ChatMessage.MessageType.ENTER.equals(message.getType())) {		// 
         message.setMessage(message.getUserId() + "님이 들어왔습니다");
         messagingTemplate.convertAndSend("/sub/api/battle/" + message.getRoomId(), message);
         }
	 else if (ChatMessage.MessageType.GAMESTART.equals(message.getType())) {		// 
         message.setMessage(message.getHostId() + "님이 게임을 시작합니다");
         messagingTemplate.convertAndSend("/sub/api/battle/" + message.getRoomId(), message);
         }
	 
 
 
 }
 
 
 
}