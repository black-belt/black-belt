package com.blackbelt.model.socket;

import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

// 채팅방 관리 

@Repository
public class SBattleRoomRepository {

 private Map<String, SBattleRoom> sbattleRoomMap;

 @PostConstruct
 private void init() {
     sbattleRoomMap = new LinkedHashMap<>();
 }
 
 // 배틀룸 초기화 
 public void clearSBattleRoom(String userId) {
	 sbattleRoomMap.remove(userId);		// 경기 끝나면, 해당 hostId로 된 배틀룸 삭제 
 }
 
 public List<SBattleRoom> findAllRoom() {
     // 채팅방 생성순서 최근 순으로 반환
     List battlerooms = new ArrayList<>(sbattleRoomMap.values());
     Collections.reverse(battlerooms);
     return battlerooms;
 }

 public SBattleRoom findRoomById(String id) {
     return sbattleRoomMap.get(id);
 }

 public SBattleRoom createSBattleRoom(String userId) {	// 원래 name 임 
	 SBattleRoom battleRoom = SBattleRoom.create(userId);
	 sbattleRoomMap.put(battleRoom.getUserId(), battleRoom);
     return battleRoom;
 }
}