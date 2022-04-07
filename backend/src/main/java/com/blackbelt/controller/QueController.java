package com.blackbelt.controller;

import java.util.*;

import javax.persistence.Enumerated;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.model.UserDto;
import com.blackbelt.model.service.QueService;
import com.blackbelt.model.service.UserService;
import com.blackbelt.model.socket.RBattleRoom;
import com.blackbelt.model.socket.RBattleRoomRepository;
import com.blackbelt.model.socket.SBattleRoom;
import com.blackbelt.model.socket.SBattleRoomRepository;



@Controller					// @RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/que")		// 원래 quecontroller 에서는 "api/que" , chatroomcontroller에서는 "/api/que"
public class QueController {
	
	private static final String SUCCESS ="success";
	private static final String FAIL ="fail";
	
	@Autowired
	private QueService queService;
	@Autowired
	SBattleRoomRepository sBattleRoomRepository;
	@Autowired
	RBattleRoomRepository rBattleRoomRepository;
	@Autowired
	UserCrudRepository userRepo;
	@Autowired
	UserService userService;
	
	
	// [지정큐] 닉네임 검색
	@PostMapping("/select")	
	@ResponseBody
	public ResponseEntity<List<UserDto>> searchUserList(@RequestBody Map<String, String> values) throws Exception{	
		String search = values.get("search");
		String userId = values.get("userId");

		List<UserDto> userlist = queService.searchUserList(search);
		
		// 본인 id제외 
		for(Iterator<UserDto> it = userlist.iterator() ; it.hasNext() ; ) {
			UserDto user = it.next();
			if(user.getUserId().equals(userId)) {
			    it.remove();
			}
		}
		return new ResponseEntity<List<UserDto>>(userlist,HttpStatus.OK);
	}

	// [지정큐] 대기방 입장 API 
	@GetMapping("/select/ready/{userId}")
	@ResponseBody
	public ResponseEntity<String> readyroom(@PathVariable String userId) throws Exception{
		// Map에 저장 
		SBattleRoom battleRoom= sBattleRoomRepository.createSBattleRoom(userId);
		return new ResponseEntity<String>(battleRoom.getRoomId(), HttpStatus.OK);
	}
	
	// 양측 대기방 입장 API
	@PostMapping("/battle/ready")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> battleready(@RequestBody Map<String, String> ids) {
		HttpStatus status = null;
		Map<String, Object> resultMap = new HashMap<>();
		Map<String, Object> hostMap = new HashMap<>();
		Map<String, Object> guestMap = new HashMap<>();
		// 배틀룸 아이디 찾음 
		try {
			String hostId = ids.get("hostId");
			String guestId = ids.get("guestId");
			SBattleRoom battleRoom = sBattleRoomRepository.findRoomById(hostId);
			if(battleRoom != null) {		//battleRoom != null
				resultMap.put("token",battleRoom.getRoomId());
				
				hostMap = userService.getUserInfo(hostId);
				guestMap = userService.getUserInfo(guestId);

				resultMap.put("Host",hostMap);
				resultMap.put("Guest",guestMap);
				
				status = HttpStatus.OK;
			}else {
				resultMap.put("msg","배틀룸이 존재하지 않습니다");
				status = HttpStatus.ACCEPTED;
			}
			
			
		}catch(Exception e) {
			e.printStackTrace();
			resultMap.put("msg","Error 발생");
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}	
	
	// [랜덤큐] 상대 찾기 API
	@GetMapping("/random/{userId}")
	public ResponseEntity<Map<String, Object>> queRandom(@PathVariable String userId) throws Exception{
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		// 실패, 성공 여부 , 상대 userId + 상대 user 정보 
		
		// 임시 더미 데이터 저장 (TEST용)
		//rBattleRoomRepository.clearRBattleRoom();
		//rBattleRoomRepository.createRBattleRoom("브론즈", "브론즈");
		//rBattleRoomRepository.createRBattleRoom("실버", "실버"); 
		//rBattleRoomRepository.createRBattleRoom("골드", "골드"); 
		//rBattleRoomRepository.createRBattleRoom("플래티넘", "플래티넘"); 
		//rBattleRoomRepository.createRBattleRoom("다이아", "다이아"); 
		
		try {
			// 상대 찾기 

			String userTier = userRepo.findtierNameBytierId(userRepo.finduserTierByuserId(userId));
			
			RBattleRoom other= rBattleRoomRepository.matchRBattle(userId, userTier);
			if(other.getUserId()!=null && !(other.getUserId().equals(userId))) {
				resultMap.put("isMatched",1);
				resultMap.put("hostId",userId);
				resultMap.put("guestId",other.getUserId());
				resultMap.put("roomId", UUID.randomUUID().toString());			// 따로 저장 x
				resultMap.put("isHost",1);
				resultMap.put("msg", "매칭되었습니다!");
				status = HttpStatus.OK;
			}else {
				rBattleRoomRepository.queueRBattleRoom(userId, userTier);
				resultMap.put("isMatched",0);
				resultMap.put("msg", "매칭 상대를 찾는 중입니다(현재는 없음)");
				status = HttpStatus.ACCEPTED;
			}
		}catch(Exception e) {
			e.printStackTrace();
			status = HttpStatus.EXPECTATION_FAILED;
		}
		
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	
}