package com.blackbelt.STOMP_sockJs;

import lombok.Getter;
import lombok.Setter;

// 데이터 형태 정의 

@Getter
@Setter
public class ChatMessage {
    // 메시지 타입 : 입장, 채팅
    public enum MessageType {
    	// 유저 세션에 넣을 용
        LOGIN, LOGOUT,		// 로그인 ,로그아웃
        
        // 겨루기 초대
        INVITE,	// 초대
        ACCEPT, 
        REFUSE,		// 수락, 거절
   
        // 대기방 입장 
        ENTER, TALK, LEAVE,		// 대기방 입장,
        GAMESTART			// 겨루기 시작
    }
    // 일반 로그인
    private MessageType type; // 메시지 타입
    private String userId;	
    // 겨루기 신청
    private String hostId;
    private String guestId;
    private String roomId; // 방번호
    // 랜덤큐
    private String userTier;
    // 게임시작
    private String ovToken;
    
    private String message; // 메시지
}