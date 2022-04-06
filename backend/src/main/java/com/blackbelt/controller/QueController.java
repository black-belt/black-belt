package com.blackbelt.controller;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.WebSocketSession;

import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.model.UserDto;
import com.blackbelt.model.service.QueService;
import com.blackbelt.model.service.UserService;

import java.util.LinkedList;
import java.util.Queue;

@RestController
@RequestMapping("api/que")
//@Api("큐 컨트롤러 API")
public class QueController {
	
	//Map<String, String> userQue = new ConcurrentHashMap<String, String>();		// username, tier id 
	//Queue<IdTier> userQue = new LinkedList<>();
	Queue<String> userQue = new LinkedList<>();
	static class IdTier{
		static String uid;
		static String utier;
	}
	
	
	//logger 관련
	private static final String SUCCESS ="success";
	private static final String FAIL ="fail";
	
	@Autowired
	private QueService queService;

	
	// 닉네임 검색
	@GetMapping("/select/{search}")	
	public ResponseEntity<List<UserDto>> searchUserList(
			@PathVariable("search") String search)	throws Exception{		// 이 줄에 ApiParam 등도 추가 ! 	
		List<UserDto> userlist = queService.searchUserList(search);
		
		return new ResponseEntity<List<UserDto>>(userlist,HttpStatus.OK);
	}
	/*
	// 랜덤 큐 시작 
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
			// 그럼 DB를 매번 돌아야됨? 
			// 웹소켓  - API를 계속 돌리고 있는거임 ? 
			// DB - 컬럼 을 쓰면 매칭을 취소하면 N으로 바뀜  => userId 겨루기 신청 여부 큐 매칭 알고리즘 . 
			// while 2 로 해놓고 겨루기 신청을 해줌 
			// 랜덤 큐를 돌려놓는 상태라는 걸 db 
			// 웹소켓 을 또 써야되나 : 
			// DB를 도는게 맞나 ?
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

}