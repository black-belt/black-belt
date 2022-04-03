package com.blackbelt.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.BattleCrudRepository;
import com.blackbelt.model.BattleHistoryDto;
import com.blackbelt.model.CountryCrudRepository;
import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.model.UserDto;
import com.blackbelt.model.service.BattleRoomService;
import com.blackbelt.service.BattleService;
import com.blackbelt.util.JwtTokenProvider;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@RestController
@RequestMapping("/api/battle")
public class BattleController {
	
	@Autowired
    BattleService battleService;
	@Autowired
	BattleCrudRepository battleRepo;
	@Autowired
	CountryCrudRepository countryRepo;
	@Autowired
	UserCrudRepository userRepo;
	@Autowired
	BattleRoomService battleRoomService;
	@Autowired
	private JwtTokenProvider tokenProvider;
	// OpenVidu object as entrypoint of the SDK
    private OpenVidu openVidu;
	
	// URL where our OpenVidu server is listening
    private String OPENVIDU_URL;

    // Secret shared with our OpenVidu server
    private String OPENVIDU_SECRET;
	
	public BattleController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.OPENVIDU_SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
	
	@PostMapping
    public ResponseEntity<Map<String, Object>> createBattle(@RequestBody Map<String,String> map
    													, HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<>();	
		HttpStatus status = HttpStatus.OK;
		String hostToken = null;
		String guestToken = null;
		BattleHistoryDto battleHistoryDto = null;
		try {
			String hostId = map.get("hostId");
			String guestId = map.get("guestId");
			String authorization = request.getHeader("Authorization");
			if(authorization.indexOf("Bearer") != -1) {
				authorization = authorization.replaceAll("^Bearer\\s", "");
			}
			if (!tokenProvider.validateToken(authorization) || hostId == null || guestId == null || !(String.valueOf(tokenProvider.getSubject(authorization))).equals(hostId)) {
				status = HttpStatus.FAILED_DEPENDENCY;
				resultMap.put("statusCode", 424);
				new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
			// 겨루기 입장으로 상태 처리
			Optional<UserDto> hostUser = userRepo.findById(hostId);
			if(!hostUser.isEmpty()) { 
				hostUser.get().setUserState('B');
			}else {
				resultMap.put("statusCode",424);
				resultMap.put("message","can't find user");
				return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.FAILED_DEPENDENCY);
			}
			Optional<UserDto> guestUser = userRepo.findById(guestId);
			if(!guestUser.isEmpty()) { 
				guestUser.get().setUserState('B');
			}else {
				resultMap.put("statusCode",424);
				resultMap.put("message","can't find user");
				return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.FAILED_DEPENDENCY);
			}
			UserDto hostUserInfo = userRepo.save(hostUser.get());   //호스트
			UserDto guestUserInfo = userRepo.save(guestUser.get()); //게스트
			String battleUrl = "battle" + hostId +"vs" + guestId;
			battleHistoryDto = new BattleHistoryDto();
			battleHistoryDto.setEnemyId(guestUserInfo.getUserId());
			battleHistoryDto.setEnemyTierId(guestUserInfo.getTierId());
			battleHistoryDto.setEnemyCountryId(guestUserInfo.getCountryId());
			battleHistoryDto.setMyId(hostUserInfo.getUserId());
			battleHistoryDto.setMyTierId(hostUserInfo.getTierId());
			battleHistoryDto.setMyCountryId(hostUserInfo.getCountryId());
			battleHistoryDto.setSessionName(battleUrl);
			battleHistoryDto.setRedWinLoseDraw('D');
			BattleHistoryDto bhd = battleRepo.save(battleHistoryDto);
			hostToken = battleService.getToken(openVidu, hostId, battleUrl);
			guestToken = battleService.getToken(openVidu, guestId, battleUrl);
			if (hostToken.equals("InternalError") || guestToken.equals("InternalError")) {
				status = HttpStatus.CONFLICT;
				resultMap.put("statusCode", 409);
				resultMap.put("message", "Fail : OpenViduJavaClientException");
				battleService.getAvailUpdateUser(hostUserInfo, guestUserInfo);
				return new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
	        if (hostToken.equals("GenError") || guestToken.equals("GenError")) {
	        	status = HttpStatus.CONFLICT;
	        	resultMap.put("statusCode", 409);
	        	resultMap.put("message", "Fail : Generate meeting room");
	        	battleService.getAvailUpdateUser(hostUserInfo, guestUserInfo);
	        	return new ResponseEntity<Map<String, Object>>(resultMap, status);
	        }
	        status = HttpStatus.ACCEPTED;
			resultMap.put("statusCode", 200);
			resultMap.put("message",  "Success : Enter study room");
			resultMap.put("hostToken",  hostToken);
			resultMap.put("guestToken",  guestToken);
			resultMap.put("BattleInfo", battleRoomService.getBattleRoomInfo(battleHistoryDto));
			resultMap.put("BattleSeq", bhd.getBattleHistoryId());
		}catch(Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			resultMap.put("statusCode", 500);
			return new ResponseEntity<Map<String, Object>>(resultMap, status);
		}
		
		// 화면에 출력될 겨루기 정보
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
	@PostMapping("/end")
    public ResponseEntity<String> endBattle(@RequestBody Map<String,String> map) {
		
		char winOrLose  = map.get("redWinLoseDraw").charAt(0);
		String battleSeq  = map.get("BattleSeq");
		String hostToken  = map.get("hostToken");
		String guestToken  = map.get("guestToken");
		
		// 1. 세션정보가져와서제거
		Optional<BattleHistoryDto> bhd = battleRepo.findById(battleSeq);
		String sessionName = bhd.get().getSessionName(); 
		if(sessionName == null) 
			return new ResponseEntity<String>("can't find session", HttpStatus.FAILED_DEPENDENCY);
		String result = battleService.removeSession(openVidu);
		if(!result.equals("OK")) 
			return new ResponseEntity<String>("FAIL REMOVE SESSION", HttpStatus.CONFLICT);
		String resultHost = battleService.removeUser(sessionName, hostToken);
		String resultGuest = battleService.removeUser(sessionName, guestToken);
		if ("Error".equals(resultHost) || "Error".equals(resultGuest))
			return new ResponseEntity<String>("FAIL REMOVE USER", HttpStatus.CONFLICT);
		
		battleService.manageBattleHistory(bhd.get(), winOrLose);
		

		return new ResponseEntity<String>("SUCCESS REMOVE", HttpStatus.ACCEPTED);
    }
	
	
	

}
