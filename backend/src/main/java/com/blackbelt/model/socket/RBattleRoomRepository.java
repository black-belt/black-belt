package com.blackbelt.model.socket;


import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

// [랜덤큐] 관리

@Repository
public class RBattleRoomRepository {

 Queue<RBattleRoom> userQue = new LinkedList<>();
 private List<Queue> tierRoom = new ArrayList<>();
 private Map<String, Integer> tierIndex;

 @PostConstruct
 private void init() {
	 // tier - index 저장용 
	 tierIndex = new HashMap<String,Integer>();		// 모든 원소를 다 초기화 해야됨 !!! 
	 tierRoom = new ArrayList<>(); 
	 
	 // bronze / silver / gold / platinum / diamond  : 다섯가지 티어 만듦 
	 for(int i=0;i<5;i++) {
		 // 전부 다른 userQue 저장 
		 userQue = new LinkedList<RBattleRoom>();
		 tierRoom.add(userQue);
	 }
	 // index와 티어 명 매치 
	 /*
     tierIndex.put("bronze",0);
     tierIndex.put("silver",1);
     tierIndex.put("gold",2);
     tierIndex.put("platinum",3);
     tierIndex.put("Diamond",4);*/
     
     //tierIndex.put("브론즈",0);
     //tierIndex.put("실버",1);
     //tierIndex.put("골드",2);
     //tierIndex.put("플래티넘",3);
     //tierIndex.put("다이아몬드",4);
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
 
 
 // 배틀룸 초기화 
 public void clearRBattleRoom() {
	 for(int i=0;i<5;i++) {
		 tierRoom.get(i).clear();
	 }
 }
// 배틀룸 생성 (TEST 용)
 public RBattleRoom createRBattleRoom(String userId, String userTier) {	 
	 RBattleRoom battleRoom = RBattleRoom.create(userId, userTier);
	 int idx = tierIndex.get(userTier);
	 tierRoom.get(idx).add(battleRoom);		// 큐에 추가 
     return battleRoom;
 }
 
 // 배틀 대기큐에 추가
 public RBattleRoom queueRBattleRoom(String userId, String userTier) {	 
	 RBattleRoom battleRoom = RBattleRoom.create(userId, userTier);
	 int idx = tierIndex.get(userTier);
	 tierRoom.get(idx).add(battleRoom);		// 큐에 추가 
     return battleRoom;
 }
 
 // 배틀 매칭
 public RBattleRoom matchRBattle(String userId, String userTier) {
	 for(int i=0;i<5;i++) {
		 System.out.println(tierRoom.get(i).peek());
	 }
	 RBattleRoom rival = new RBattleRoom();
	 int idx = tierIndex.get(userTier);
	 
	 // 랜덤매칭 알고리즘
	 int i =0;
	 while(i<5) {
		int j = idx +i;
		if(j>4 && i>4)
			break;
		else if(j<5) {
			if(!tierRoom.get(j).isEmpty()) {
				rival = (RBattleRoom) tierRoom.get(j).poll();
				break;
			}
		}
		j = idx -i;
		if(j<0 && i>4)
			break;
		else if(j>=0) {
			if(!tierRoom.get(j).isEmpty()) {
				rival = (RBattleRoom) tierRoom.get(j).poll();
				break;
			}
		}
		i++; 
	}

	 
	 return rival;
 }
}
