package com.blackbelt.STOMP_sockJs;

import java.util.*;

import lombok.Getter;
import lombok.Setter;

// 세션 방 형태 정의 

@Getter
@Setter
public class SBattleRoom {
	private String userId;
    private String roomId;

    public static SBattleRoom create(String userId) {
    	SBattleRoom battleRoom = new SBattleRoom();
    	battleRoom.userId = userId;
    	battleRoom.roomId = UUID.randomUUID().toString();
        return battleRoom;
    }
}
