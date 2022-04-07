package com.blackbelt.STOMP_sockJs;

import java.util.*;

import lombok.Getter;
import lombok.Setter;

// 유저 세션 

@Getter
@Setter
public class UserSession {
    private String userId;
    
    // ID 만 저장
    public static UserSession create(String userId) {
        UserSession userSession = new UserSession();
        userSession.userId = userId;
        return userSession;
    }
}