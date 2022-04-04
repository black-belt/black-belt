package com.blackbelt.STOMP_sockJs;


import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// 채팅방 관리 

@Repository
public class RBattleRoomRepository {

 private static final boolean True = false;
//private Map<String, RBattleRoom> rbattleRoomMap;
 Queue<RBattleRoom> userQue = new LinkedList<>();
 //private Map<String, Queue<RBattleRoom>> tierRoomMap;
 private List<Queue> tierRoom = new ArrayList<>();
 private Map<String, Integer> tierIndex;

 @PostConstruct
 private void init() {
     //rbattleRoomMap = new LinkedHashMap<>();
	 tierRoom = new ArrayList<>();
	 tierIndex = new HashMap<String,Integer>();		// 모든 원소를 다 초기화 해야됨 !!! 
	 userQue = new LinkedList<>();
	 
	 // bronze / silver / gold / platinum / diamond  : 다섯가지 티어 만듦 
	 for(int i=0;i<5;i++) {
		 tierRoom.add(userQue);
	 }
	 // index와 티어 명 매치 
     tierIndex.put("bronze",0);
     tierIndex.put("silver",1);
     tierIndex.put("gold",2);
     tierIndex.put("platinum",3);
     tierIndex.put("Diamond",4);
 }

/*
 public List<RBattleRoom> findAllRoom() {
     // 채팅방 생성순서 최근 순으로 반환
     List battlerooms = new ArrayList<>(rbattleRoomMap.values());
     Collections.reverse(battlerooms);
     return battlerooms;
 }

 public RBattleRoom findRoomById(String id) {
     return rbattleRoomMap.get(id);
 }*/

 public RBattleRoom createRBattleRoom(String userId, String userTier) {	// 원래 name 임 
	 RBattleRoom battleRoom = RBattleRoom.create(userId, userTier);
	 //rbattleRoomMap.put(battleRoom.getUserId(), battleRoom);
	 
	 userQue.add(battleRoom);
     return battleRoom;
 }
 
 public RBattleRoom matchBattle(String userId, String userTier) {
	 RBattleRoom rival = new RBattleRoom();
	 int idx = tierIndex.get(userTier);
	 if(!tierRoom.get(idx).isEmpty()) {
		 rival =  (RBattleRoom) tierRoom.get(idx).poll();		// 해당 티어의 index 구한 후, 그 index의 Queue의 첫 값 pop = poll
	 }
	 
	 else {
		 int i =0;
		 while(i<5) {
			 int j = idx +i;
			 if(j>=5 && i>=5)
				 break;
			 if(!tierRoom.get(j).isEmpty()) {
				 rival = (RBattleRoom) tierRoom.get(j).poll();
				 break;
			 }
			 j = idx -i;
			 if(j<0 && i>=5)
				 break;
			 if(!tierRoom.get(j).isEmpty()) {
				 rival = (RBattleRoom) tierRoom.get(j).poll();
				 break;
			 }
			 System.out.println(i);
			 i++; 
		 }
	 }
	 
	 return rival;
 }
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