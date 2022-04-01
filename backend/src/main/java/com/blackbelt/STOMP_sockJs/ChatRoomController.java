package com.blackbelt.STOMP_sockJs;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.blackbelt.model.service.UserService;
import com.blackbelt.model.UserDto;
import com.blackbelt.model.UserCrudRepository;


// 세션 방 컨트롤러

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/que")			//chat
public class ChatRoomController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private final SBattleRoomRepository sBattleRoomRepository;
	private final UserSessionRepository userSessionRepository;
	private final UserCrudRepository userRepo;
	
	@Autowired
	UserService userService;
	//@Autowired
	//UserCrudRepository userRepo;

	
	// [일반모드] 대기방 입장 API 
	@GetMapping("/select/ready/{userId}")
	@ResponseBody
	public ResponseEntity<String> readyroom(@PathVariable String userId) {
		// Map에 저장 
		SBattleRoom battleRoom= sBattleRoomRepository.createSBattleRoom(userId);
		return new ResponseEntity<String>(battleRoom.getRoomId(), HttpStatus.OK);
	}
	
	// 양측 대기방 입장 API
	@GetMapping("/battle/ready")
	public ResponseEntity<Map<String, Object>> battleready(@RequestBody String hostId, String guestId) {
		HttpStatus status = null;
		Map<String, Object> map = new HashMap<>();
		// 배틀룸 아이디 찾음 
		try {
			//System.out.println("이거다이거" + sBattleRoomRepository.findRoomById(guestId));
			SBattleRoom battleRoom = sBattleRoomRepository.findRoomById(guestId);
			map.put("token",battleRoom.getRoomId());
			
			Optional<UserDto> hostUser = userRepo.findByuserId(hostId);
			Optional<UserDto> guestUser = userRepo.findByuserId(guestId);
			System.out.println("호스트 유저는!!"+hostUser);
			UserDto hostUserInfo = userRepo.save(hostUser.get());   //호스트
			UserDto guestUserInfo = userRepo.save(guestUser.get()); //게스트
			map.put("hostUser",hostUserInfo);
			map.put("guestUser",guestUserInfo);	
			status = HttpStatus.OK;
		}catch(Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(map, status);
	}	
	/*
	// 채팅 리스트 화면
	@GetMapping("/room")
	public String rooms(Model model) {
		return "room";			//"/chat/room";
	}
	// 모든 채팅방 목록 반환
	@GetMapping("/rooms")
	@ResponseBody
	public List<SBattleRoom> room() {
		return sBattleRoomRepository.findAllRoom();
	}
	// 채팅방 생성
	@PostMapping("/room")
	@ResponseBody
	public SBattleRoom createRoom(@RequestParam String name) {
		return sBattleRoomRepository.createSBattleRoom(name);
	}
	// 채팅방 입장 화면
	@GetMapping("/room/enter/{roomId}")
	public String roomDetail(Model model, @PathVariable String roomId) {
		model.addAttribute("roomId", roomId);
		return "roomdetail";	///chat/roomdetail
	}
	// 특정 채팅방 조회
	@GetMapping("/room/{roomId}")
	@ResponseBody
	public SBattleRoom roomInfo(@PathVariable String roomId) {
		return sBattleRoomRepository.findRoomById(roomId);
	}
	
	///////////////////////////////////////////////////////////////////////////////////
	// 채팅방 생성
	@PostMapping("/user")
	@ResponseBody
	public UserSession createUser(@RequestParam String userId) {
		return userSessionRepository.createUserSession(userId);
	}
	// 모든 채팅방 목록 반환
	@GetMapping("/users")
	@ResponseBody
	public List<UserSession> users() {
		return userSessionRepository.findAllRoom();
	}*/
}