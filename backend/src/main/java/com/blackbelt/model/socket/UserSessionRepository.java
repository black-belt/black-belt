package com.blackbelt.STOMP_sockJs;

import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

// 유저세션 저장소

@Repository
public class UserSessionRepository {

 private Map<String, UserSession> userSessionMap;

 @PostConstruct
 private void init() {
	 userSessionMap = new LinkedHashMap<>();
 }

 public List<UserSession> findAllRoom() {
	 System.out.println("모든방을 찾았어요");
     List userSessions = new ArrayList<>(userSessionMap.values());
     Collections.reverse(userSessions);
     System.out.println(userSessions);
     return userSessions;
 }

 public UserSession findRoomById(String id) {
     return userSessionMap.get(id);
 }

 public UserSession createUserSession(String userId) {
	 UserSession userSession = UserSession.create(userId);
     userSessionMap.put(userSession.getUserId(), userSession);
     return userSession;
 }
}