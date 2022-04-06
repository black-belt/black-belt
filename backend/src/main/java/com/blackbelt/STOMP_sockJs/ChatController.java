package com.blackbelt.STOMP_sockJs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;


import java.util.Optional;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import lombok.Getter;
import lombok.Setter;

import lombok.RequiredArgsConstructor;

import com.blackbelt.model.UserDto;
import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.STOMP_sockJs.SBattleRoomRepository;

// 데이터 전송 controller

@Getter
@Setter			
@RequiredArgsConstructor
@Controller
public class ChatController {
	
	private final SimpMessageSendingOperations messagingTemplate;
	public static final Logger logger = LoggerFactory.getLogger(ChatController.class);
	// @RequiredArgsConstructor 어노테이션에는, @Autowired 사용 불가 (지양)
	private final SBattleRoomRepository sbattleRepo;
	private final UserCrudRepository userRepo;


 
	// [유저 큐] 개별 세션 생성
	// [지정 큐] 메시지 핸들러
	@MessageMapping("/api/que/user")
	public void userque(ChatMessage message) {
		logger.info("Socket Message '백'에서 수신" );
		System.out.println("메시지를 백에서 수신하긴 함  ");
		// 로그인 했을 때
		if (ChatMessage.MessageType.LOGIN.equals(message.getType())) {		// 
			logger.info("로그인 시: " + message);
			String userNick = userRepo.finduserNickByuserId(message.getUserId());
			message.setUserNick(userNick);
			message.setMessage(userNick + "님이 로그인");
			messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getUserId(), message);
         }
		// 신청 보냈을 때
		else if (ChatMessage.MessageType.INVITE.equals(message.getType())) {		// 
			logger.info("초대 시: "+ message );
			String hostNick = userRepo.finduserNickByuserId(message.getHostId());
			message.setHostNick(hostNick);
			message.setMessage(hostNick + "님이 초대함");
			messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getGuestId(), message);
         }
		// 수락 했을 때
		else if (ChatMessage.MessageType.ACCEPT.equals(message.getType()))	{	// 
			logger.info("수락 시: " + message);
			String hostNick = userRepo.finduserNickByuserId(message.getHostId());
			String guestNick = userRepo.finduserNickByuserId(message.getGuestId());
		
			message.setHostNick(hostNick);
			message.setGuestNick(guestNick);
			message.setRoomId((sbattleRepo.findRoomById(message.getHostId())).getRoomId());
			message.setMessage(guestNick + "님이 수락함");

			messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getHostId(), message);
			messagingTemplate.convertAndSend("/sub/api/que/user/" + message.getGuestId(), message);
 		}
   	 	// 거절 했을 때
   	 	else if (ChatMessage.MessageType.REFUSE.equals(message.getType()))	{	// 
   	 		logger.info("거절 시: "+ message );
   	 		String guestNick = userRepo.finduserNickByuserId(message.getGuestId());
   	 		message.setGuestNick(guestNick);
   	 		message.setMessage(guestNick + "님이 거절함");
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
			String guestNick = userRepo.finduserNickByuserId(message.getGuestId());
			String hostNick = userRepo.finduserNickByuserId(message.getHostId());
			message.setGuestNick(guestNick);
			message.setHostNick(hostNick);
			message.setMessage(guestNick + "님이 들어왔습니다");
			messagingTemplate.convertAndSend("/sub/api/battle/" + message.getRoomId(), message);		// room id ? hostid ? 
         }
		else if (ChatMessage.MessageType.GAMESTART.equals(message.getType())) {		// 
			//String hostNick = userRepo.finduserNickByuserId(message.getHostId());
			//message.setMessage(hostNick + "님이 게임을 시작합니다");
			messagingTemplate.convertAndSend("/sub/api/battle/" + message.getRoomId(), message);
         }

	}
 
}