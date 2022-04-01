package com.blackbelt.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.BattleCrudRepository;
import com.blackbelt.model.BattleHistoryDto;
import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.model.UserDto;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;

@Service
public class BattleService {
	@Autowired
	UserCrudRepository userRepo;
	@Autowired
	BattleCrudRepository battleRepo;
	// Collection to pair session names and OpenVidu Session objects
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    // Collection to pair session names and tokens (the inner Map pairs tokens and role associated)
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
	
    private Session session = null;
    
    static final int BLONZE = 500;
    static final int SILVER = 1000;
    static final int GOLD = 1500;
    static final int PLATINUM = 2000;
    static final int DIAMOND = 2500;
    
    public String getToken(OpenVidu openVidu, String userId, String battleUrl) {

		String sessionName = battleUrl;
        OpenViduRole role = OpenViduRole.PUBLISHER;
        String serverData = "{\"serverData\": \"" + userId + "\"}";

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(role).build();

        if (this.mapSessions.get(sessionName) != null) { // 세션이 이미 있으면
            try {
                // Generate a new Connection with the recently created connectionProperties
                String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
                // Update our collection storing the new token
                this.mapSessionNamesTokens.get(sessionName).put(token, role);
                return token;
            } catch (OpenViduJavaClientException e1) {
                // If internal error generate an error message and return it to client
                System.out.println(e1.getStackTrace());
                System.out.println("cause: " + e1.getCause());
                System.out.println("error: " + e1.getMessage());
                System.out.println("exception: " + e1.getClass());
                return "InternalError";
            } catch (OpenViduHttpException e2) {
                if (404 == e2.getStatus()) {
                    // Invalid sessionId (user left unexpectedly). Session object is not valid
                    // anymore. Clean collections and continue as new session
                    this.mapSessions.remove(sessionName);
                    this.mapSessionNamesTokens.remove(sessionName);
                }
                return "InternalError";
            }
        }

        // New session
        try {
            // Create a new OpenVidu Session
            session = openVidu.createSession();
            // Generate a new Connection with the recently created connectionProperties
            String token = session.createConnection(connectionProperties).getToken();

            // Store the session and the token in our collections
            this.mapSessions.put(sessionName, session);
            this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
            this.mapSessionNamesTokens.get(sessionName).put(token, role);

            return token;
        } catch (Exception e) {
            // If error generate an error message and return it to client
            return "GenError";
        }
    }
	public String removeSession(OpenVidu openVidu) {
		//서버 세션 종료
    	try {
             session.close();
         } catch (OpenViduJavaClientException e1) {
             // If internal error generate an error message and return it to client
             System.out.println(e1.getStackTrace());
             System.out.println("cause: " + e1.getCause());
             System.out.println("error: " + e1.getMessage());
             System.out.println("exception: " + e1.getClass());
             return "InternalError";
         } catch (OpenViduHttpException e2) {
             return "InternalError";
         }
    	return "OK";
	}
    
    public String removeUser( String sessionName, String token) {
    	
        // If the session exists 개꿀
        if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {
            // If the token exists
            if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
                // User left the session
                System.out.println("세션 종료여부: " + this.mapSessionNamesTokens.get(sessionName).isEmpty());
                if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
                    // Last user left: session must be removed
                    this.mapSessions.remove(sessionName);
                }
                return "OK";
            } else {
                // The TOKEN wasn't valid
                System.out.println("Problems in the app server: the TOKEN wasn't valid");
                return "Error";
            }
        } else {
            // The SESSION does not exist
            System.out.println("Problems in the app server: the SESSION does not exist");
            return "Error";
        }
    }
    
    public void getAvailUpdateUser(UserDto user, UserDto user2) throws Exception {
		user.setUserState('Y');
		userRepo.save(user);
		user2.setUserState('Y');
		userRepo.save(user2);
	}
    
    public Map<String, Object> manageBattleHistory(BattleHistoryDto bhd, char winOrLose, boolean isRed) {
    	Map<String, Object> resultMap = new HashMap<>();
    	// 1-1. 회원 겨루기 가능 상태로 돌리기
    	String id = (isRed) ? bhd.getMyId() : bhd.getEnemyId();
    	Optional<UserDto> user = userRepo.findById(id);
    	user.get().setUserState('Y');
    	// 2. 방에 종료날짜, 승패여부 업뎃
    	if(isRed) {
    		Date date = new Date();
    		Calendar cal = Calendar.getInstance();
    		cal.setTime(date);
    		cal.add(Calendar.HOUR, +9);
    		Date koreaDate = cal.getTime();
    		
    		bhd.setEndTime(koreaDate);
    		bhd.setRedWinLoseDraw(winOrLose);
    		battleRepo.save(bhd);
    	}
    	// 3. 유저 별 승패 업뎃
    	int score = Integer.parseInt(user.get().getUserScore());
    	int afterScore = score;
    	if(winOrLose == 'D') {
    		resultMap.put("tierId", user.get().getTierId());
        	resultMap.put("userScore", score);
    		return resultMap;
    	}
    	else if(winOrLose == 'W') {
    		if(isRed)
    			afterScore += 50;
    		else {
    			afterScore -= 50;
    			afterScore = afterScore < 500 ? 500 : afterScore;
    		}
    	}
    	else if(winOrLose == 'L') {
    		if(isRed) {
    			afterScore -= 50;
    			afterScore = afterScore < 500 ? 500 : afterScore;
    		}
    		else
    			afterScore += 50;
    	}
    	char tierUp = 'N';
    	
    	int before = 0;
    	int after = 0;
    	if(score < SILVER) {
    		before = BLONZE;
    	}else if(score >= SILVER && score < GOLD) {
    		before = SILVER;
    	}else if(score >= GOLD && score < PLATINUM) {
    		before = GOLD;
    	}else if(score >= PLATINUM && score < DIAMOND) {
    		before = PLATINUM;
    	}else if(score >= DIAMOND) {
    		before = DIAMOND;
    	}
    	if(afterScore < SILVER) {
    		after = BLONZE;
    	}else if(afterScore >= SILVER && afterScore < GOLD) {
    		after = SILVER;
    	}else if(afterScore >= GOLD && afterScore < PLATINUM) {
    		after = GOLD;
    	}else if(afterScore >= PLATINUM && afterScore < DIAMOND) {
    		after = PLATINUM;
   		}else if(afterScore >= DIAMOND) {
   			after = DIAMOND;
   		}
    	if(before != after) {
    		if(before > after) tierUp = 'D';
    		else tierUp = 'U';
    	}
    	
    	user.get().setUserScore(afterScore+"");
    	
    	if(tierUp != 'N') {
    		int tier = Integer.parseInt(user.get().getTierId());
    		if(tierUp == 'U') user.get().setTierId(String.valueOf(tier+1)); 
    		if(tierUp == 'D') user.get().setTierId(String.valueOf(tier-1)); 	
    	}
    	
    	userRepo.save(user.get());
    	resultMap.put("tierId", user.get().getTierId());
    	resultMap.put("userScore", afterScore);
    	return resultMap;
    }
}


