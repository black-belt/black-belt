package com.blackbelt.websocket;

import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

import com.blackbelt.websocket.BattleRoomRepository;

@Repository
public class BattleRoomRepository {
    private Map<String, BattleRoom> battleRoomMap;

    @PostConstruct
    private void init(){
        battleRoomMap = new LinkedHashMap<>();
    }

    public List<BattleRoom> findAllRoom(){
        List battleRooms = new ArrayList<>(battleRoomMap.values());
        Collections.reverse(battleRooms);
        return battleRooms;
    }

    public BattleRoom findRoomById(String roomId){
        return battleRoomMap.get(roomId);
    }

    public BattleRoom createBattleRoom(String senderId,String recieverId) {
    	BattleRoom battleRoom = BattleRoom.create(senderId, recieverId);
    	battleRoomMap.put(battleRoom.getRoomId(), battleRoom);
        return battleRoom;
    }


}
