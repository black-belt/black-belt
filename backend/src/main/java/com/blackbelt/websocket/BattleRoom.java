package com.blackbelt.websocket;


import java.io.IOException;
import java.util.*;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.blackbelt.websocket.ChatMessage.MessageType;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Setter;
import lombok.Getter;

/* 배틀 전 대기방 */

@Getter @Setter
public class BattleRoom {
    private String senderId;
    private String recieverId;
    private String roomId;
    private Set<WebSocketSession> battleSessions = new HashSet<>();

    public static BattleRoom create(String senderId, String recieverId){
    	BattleRoom battleRoom = new BattleRoom();
        //chatRoom.roomId = UUID.randomUUID().toString();
    	battleRoom.senderId = senderId;
    	battleRoom.recieverId = recieverId;
    	battleRoom.roomId = senderId +"+"+ recieverId; 
        return battleRoom;
    }

    // 메시지 전송 (반응 단)
    public void handleMessage(WebSocketSession session, ChatMessage chatMessage,
                              ObjectMapper objectMapper) throws IOException {
    	
    	System.out.println("지금 존재하는 배틀 세션 :"+battleSessions.toString());
    	// 대기방 입장 
    	if(chatMessage.getType() == MessageType.ENTER){
        	battleSessions.add(session);
            //chatMessage.setMessage(chatMessage.getSenderId() + "님이 입장하셨습니다.");
        }
        else if(chatMessage.getType() == MessageType.LEAVE){
        	battleSessions.remove(session);
            //chatMessage.setMessage(chatMessage.getSenderId() + "님임 퇴장하셨습니다.");
        }
        else if(chatMessage.getType() == MessageType.GAMESTART){
            chatMessage.setMessage(chatMessage.getSenderId() + "게임을 시작합니다.");
          
        }
        else{	// 예외처리 
            chatMessage.setMessage(chatMessage.getSenderId() + " : " + chatMessage.getMessage());
        }
    	//send(chatMessage,objectMapper);	// 대기방에 있는 모든 세션에 신호 ㄱㄱ 
    }

    private void send(ChatMessage chatMessage, ObjectMapper objectMapper) throws IOException {
        TextMessage textMessage = new TextMessage(objectMapper.
                                    writeValueAsString(chatMessage.getMessage()));
        for(WebSocketSession sess : battleSessions){
            sess.sendMessage(textMessage);
        }
    }
}