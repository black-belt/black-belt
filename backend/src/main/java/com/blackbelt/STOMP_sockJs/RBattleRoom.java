package com.blackbelt.STOMP_sockJs;

import java.util.*;

import lombok.Getter;
import lombok.Setter;

// 세션 방 형태 정의 

@Getter
@Setter
public class RBattleRoom {
	private String userId;
	private String userTier;
    //private String roomId;

    public static RBattleRoom create(String userId, String userTier) {
    	RBattleRoom battleRoom = new RBattleRoom();
    	battleRoom.userId = userId;
    	battleRoom.userTier = userTier;
    	//battleRoom.roomId = UUID.randomUUID().toString();
        return battleRoom;
    }
}
