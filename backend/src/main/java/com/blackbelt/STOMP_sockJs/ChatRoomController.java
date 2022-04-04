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
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.blackbelt.STOMP_sockJs.RBattleRoomRepository;


// 세션 방 컨트롤러

//@RequiredArgsConstructor
@Controller					// @RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/que")			//chat
public class ChatRoomController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	//private final RBattleRoomRepository rBattleRoomRepository;
	//private final SBattleRoomRepository sBattleRoomRepository;
	//private final UserSessionRepository userSessionRepository;
	//private final UserCrudRepository userRepo;
	
	@Autowired
	SBattleRoomRepository sBattleRoomRepository;
	@Autowired
	RBattleRoomRepository rBattleRoomRepository;
	@Autowired
	UserSessionRepository userSessionRepository;
	@Autowired
	UserCrudRepository userRepo;
	
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
	@ResponseBody
	public ResponseEntity<Map<String, Object>> battleready(@RequestBody Map<String, String> ids) {
		HttpStatus status = null;
		Map<String, Object> resultMap = new HashMap<>();
		List<Object> usersList = new ArrayList<Object>();
		// 배틀룸 아이디 찾음 
		try {
			String hostId = ids.get("hostId");
			String guestId = ids.get("guestId");
			SBattleRoom battleRoom = sBattleRoomRepository.findRoomById(guestId);
			if(battleRoom != null) {
				resultMap.put("token",battleRoom.getRoomId());
				
				Optional<UserDto> hostUser = userRepo.findByuserId(hostId);
				Optional<UserDto> guestUser = userRepo.findByuserId(guestId);
				usersList.add(hostUser);
				usersList.add(guestUser);
				resultMap.put("users",usersList);
				
				status = HttpStatus.OK;
			}
			status = HttpStatus.ACCEPTED;
			
		}catch(Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}	
	
	// [랜덤큐] 상대 찾기 API
	@GetMapping("/random/{userId}")
	public ResponseEntity<Map<String, Object>> queRandom(@PathVariable String userId){
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		// 실패, 성공 여부 , 상대 userId + 상대 user 정보 
		
		// 임시 더미 데이터 저장 (TEST용)
		//rBattleRoomRepository.clearRBattleRoom();
		//rBattleRoomRepository.createRBattleRoom("bronze", "bronze");
		//rBattleRoomRepository.createRBattleRoom("silver", "silver"); 
		//rBattleRoomRepository.createRBattleRoom("gold", "gold"); 
		//rBattleRoomRepository.createRBattleRoom("pla", "platinum"); 
		//rBattleRoomRepository.createRBattleRoom("dia", "Diamond"); 
		
		try {
			// 상대 찾기 
			
			
			Optional<UserDto> user =  userRepo.findByuserId(userId);
			String userTier = userRepo.findtierNameBytierId(userRepo.finduserTierByuserId(userId));
			
			//findtierNamdBytierId(String id);
			System.out.println(userTier);
			//System.out.println(user.get(tierId).getTierId);
			System.out.println(user);
			
			RBattleRoom other= rBattleRoomRepository.matchRBattle(userId, userTier);
			if(other.getUserId()!=null) {
				resultMap.put("otherId",other.getUserId());
				resultMap.put("msg", "매칭되었습니다!");
				status = HttpStatus.OK;
			}else {
				rBattleRoomRepository.queueRBattleRoom(userId, userTier);
				resultMap.put("other", "");
				resultMap.put("msg", "매칭 상대를 찾는 중입니다(현재는 없음)");
				status = HttpStatus.ACCEPTED;
			}
		}catch(Exception e) {
			e.printStackTrace();
			status = HttpStatus.EXPECTATION_FAILED;
		}
		
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/*
	@GetMapping("/random/{userId}")
	public ResponseEntity<Map<String,String>> queRandom(
			@PathVariable("userId") String userId) throws Exception{
		//String userTier = queService.searchUserTier(userNick);
		Map<String,String> match = new HashMap<>();
		//Map<String,String> user = new HashMap<>();
		//NickTier.uid = userId;
		//NickTier.utier = userTier;
		//user.put(userId, userTier);
		userQue.add(userId);
		if(!userQue.isEmpty() && userQue.size()%2==0) {
			String a = userQue.poll();
			String b = userQue.poll();
			match.put(a,b);
			// userscore로 해야됨 
			// 큐 매칭 중 => Y인 사람만 뽑음 
			// 글구 정렬 que 
			// 점수순으로 정렬 을 함 
			// DB - 컬럼 을 쓰면 매칭을 취소하면 N으로 바뀜  => userId 겨루기 신청 여부 큐 매칭 알고리즘 . 
			// while 2 로 해놓고 겨루기 신청을 해줌 
			// 랜덤 큐를 돌려놓는 상태라는 걸 db 

			// 신청한 쪽 ID를 꺼내고 다시 넣을 수 있음 
			// 클릭버튼 누른 사람만 
			// 웹소켓 DB :=> 러
			// 세션에 값을 웹소켓 
			// recoil : 세션 정보 넣어줘야 됨 
			// 
		}
		System.out.println(userQue);
		return new ResponseEntity<Map<String,String>> (match, HttpStatus.OK);
	}*/
	
	
	/*
	// 채팅 리스트 화면
	@GetMapping("/room")				// responsebody 어노테이션 붙어있으면 절대 안됨 !!! 
	public String rooms(Model model) {
		System.out.println("룸에 왔다 ");
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