package com.blackbelt.service;

import java.util.Calendar;
import java.util.Date;
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
    
    public void manageBattleHistory(BattleHistoryDto bhd, char winOrLose) {
    	// 1-1. 회원 겨루기 가능 상태로 돌리기
    	String redId = bhd.getMyId();
    	String blueId = bhd.getEnemyId();
    	Optional<UserDto> redUser = userRepo.findById(redId);
    	Optional<UserDto> blueUser = userRepo.findById(blueId);
    	redUser.get().setUserState('Y');
    	blueUser.get().setUserState('Y');
    	// 2. 방에 종료날짜, 승패여부 업뎃
    	Date date = new Date();
    	Calendar cal = Calendar.getInstance();
    	cal.setTime(date);
    	cal.add(Calendar.HOUR, +9);
    	Date koreaDate = cal.getTime();

    	bhd.setEndTime(koreaDate);
    	bhd.setRedWinLoseDraw(winOrLose);
    	battleRepo.save(bhd);
    	// 3. 유저 별 승패 업뎃
    	int redScore = Integer.parseInt(redUser.get().getUserScore());
    	int blueScore = Integer.parseInt(blueUser.get().getUserScore());
    	int[] beforeScore = new int[] {redScore, blueScore};
    	int[] afterScore = new int[] {redScore, blueScore};
    	if(winOrLose == 'D') return;
    	else if(winOrLose == 'W') {
    		afterScore[0] += 50;
    		afterScore[1] -= 50;
    		afterScore[1] = afterScore[1] < 500 ? 500 : afterScore[1];
    	}
    	else if(winOrLose == 'L') {
    		afterScore[0] -= 50;
    		afterScore[1] += 50;
    		afterScore[0] = afterScore[0] < 500 ? 500 : afterScore[0];
    	}
    	char[] tierUp = new char[2];
    	for(int i = 0 ; i < 2; i++ ) {
    		int before = 0;
    		int after = 0;
    		if(beforeScore[i] < SILVER) {
    			before = BLONZE;
    		}else if(beforeScore[i] >= SILVER && beforeScore[i] < GOLD) {
    			before = SILVER;
    		}else if(beforeScore[i] >= GOLD && beforeScore[i] < PLATINUM) {
    			before = GOLD;
    		}else if(beforeScore[i] >= PLATINUM && beforeScore[i] < DIAMOND) {
    			before = PLATINUM;
    		}else if(beforeScore[i] >= DIAMOND) {
    			before = DIAMOND;
    		}
    		if(afterScore[i] < SILVER) {
    			after = BLONZE;
    		}else if(afterScore[i] >= SILVER && afterScore[i] < GOLD) {
    			after = SILVER;
    		}else if(afterScore[i] >= GOLD && afterScore[i] < PLATINUM) {
    			after = GOLD;
    		}else if(afterScore[i] >= PLATINUM && afterScore[i] < DIAMOND) {
    			after = PLATINUM;
    		}else if(afterScore[i] >= DIAMOND) {
    			after = DIAMOND;
    		}
    		if(before != after) {
    			if(before > after) tierUp[i] = 'D';
    			else tierUp[i] = 'U';
    		}else tierUp[i] = 'N';
    	}
    	redUser.get().setUserScore(afterScore[0]+"");
    	blueUser.get().setUserScore(afterScore[1]+"");
    	for(int i = 0 ; i < 2 ; i++) {
    		if(tierUp[i] != 'N') {
    			if(i == 0) { // 레드
    				int tier = Integer.parseInt(redUser.get().getTierId());
    				if(tierUp[i] == 'U') redUser.get().setTierId(String.valueOf(tier+1)); 
    				if(tierUp[i] == 'D') redUser.get().setTierId(String.valueOf(tier-1)); 
    			}else {//불루
    				int tier = Integer.parseInt(blueUser.get().getTierId());
    				if(tierUp[i] == 'U') blueUser.get().setTierId(String.valueOf(tier+1)); 
    				if(tierUp[i] == 'D') blueUser.get().setTierId(String.valueOf(tier-1)); 
    			}
    		}
    	}
    	userRepo.save(redUser.get());
    	userRepo.save(blueUser.get());
    }
}


