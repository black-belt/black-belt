package com.blackbelt.websocket;

import lombok.Getter;
import lombok.Setter;


@Getter 
@Setter
public class ChatMessage {

	private String senderId;
	private String recieverId;
	private MessageType type;
	private String message;

	
	public enum MessageType {
		LOGIN,		// 로그인
		LOGOUT,		// 로그아웃 
		
	    INVITE, 	// 초대
	    ACCEPT,		// 수락
	    REFUSE,		// 거절
	    
	    //INVITED,	    
	    //ACCEPTED,	// 수락됨
	    //REFUSED,	// 거절됨
	    
	    ENTER,		// 대기방 입장
	    LEAVE,		// 대기방 떠남 
	    GAMESTART	// 겨루기 시작
	}
	  
}
