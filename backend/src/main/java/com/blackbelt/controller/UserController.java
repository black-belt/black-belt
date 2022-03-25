package com.blackbelt.controller;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.blackbelt.model.CountryCrudRepository;
import com.blackbelt.model.CountryDto;
import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.model.UserDto;
import com.blackbelt.model.service.UserService;
import com.blackbelt.util.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
//회원 처리용 controller
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	CountryCrudRepository countryRepo;
	@Autowired
	UserCrudRepository userRepo;
	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	private UserService userService;
	HttpSession httpSession;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login( @RequestBody Map<String,String> map) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			String userName = map.get("userName");
			String userEmail = map.get("userEmail");
			if (userEmail != null) {
				Optional<UserDto> user = userRepo.findByuserEmail(userEmail);
				String lastId = null; String userNick = null;
				if(user.isEmpty()) {
					//회원가입 처리 추가할 부분
					lastId = String.valueOf(Integer.parseInt(userRepo.findLastUser().getUserId()) + 1) ;
					userNick = "anonymous" + lastId;
					userRepo.save(UserDto.builder().userId(lastId).countryId("1").levelId("1").tierId("1").userScore("999")
								.userNick(userNick).userState('Y').userDelete('N').userSignupDate(new Date()).defaultLang('K')
				    			.userEmail(userEmail).userName(userName).build());
				}else if(user.get().getUserDelete() == 'Y'){//삭제했다가 가입하는 친구
					lastId = String.valueOf(Integer.parseInt(userRepo.findLastUser().getUserId()) + 1) ;
					userRepo.deleteById(user.get().getUserId()); //유니크 조건 때문에 일단 삭제하도록 구현
					userNick = "anonymous" + lastId;
					userRepo.save(UserDto.builder().userId(lastId).countryId("1").levelId("1").tierId("1").userScore("999")
							.userNick(userNick).userState('Y').userDelete('N').userSignupDate(new Date()).defaultLang('K')
			    			.userEmail(userEmail).userName(userName).build());
				}else {//현재 회원이다
					lastId = user.get().getUserId();
					user.get().setUserState('Y');
					userRepo.save(user.get());
				}
				String token = tokenProvider.createToken(lastId);// key, data, subject
				Optional<UserDto> userinfo = userRepo.findByuserEmail(userEmail);
				resultMap.put("Authorization","Bearer " + token);
				resultMap.put("userInfo", userinfo.get());
				resultMap.put("statusCode",200);
				status = HttpStatus.OK;
				
			} else {
				resultMap.put("statusCode",424);
				status = HttpStatus.FAILED_DEPENDENCY;
			}
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("statusCode",500);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	
	@PutMapping("/logout")
	public ResponseEntity<Map<String, Object>> registerUser(@RequestBody Map<String,String> map ) {
		ResponseEntity<Map<String, Object>> re = null;
		Map<String, Object> resultMap = new HashMap<>();
		try {
			String userId = map.get("userId");
			Optional<UserDto> updateUser = userRepo.findById(userId);
			if(!updateUser.isEmpty()) {
				updateUser.get().setUserId(userId);
				updateUser.get().setUserState('N');
			}else {
				resultMap.put("statusCode",424);
				return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.FAILED_DEPENDENCY);
			}
			
			UserDto saveUser = userRepo.save(updateUser.get());
			resultMap.put("statusCode",200);
			re = new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		}catch(Exception e) {
			resultMap.put("statusCode",500);
			re = new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return re;
	}
	
	@GetMapping("/country")
	public ResponseEntity<Map<String, Object>> getCountries() {
		ResponseEntity<Map<String, Object>> re = null;
		Map<String, Object> resultMap = new HashMap<>();
		try {
			List<CountryDto> clist = countryRepo.findAll();
			
			System.out.println(clist.get(0).getCountryId());
		  if(clist != null) {
			  resultMap.put("data",clist);
			  resultMap.put("statusCode",200);
			  re = new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		  }
		} catch (Exception e) {
			re = new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}		
		return re;
	}
	
	@GetMapping("/userinfo")
	public ResponseEntity<Map<String, Object>> getUserInfo( HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		try {
			String authorization = request.getHeader("Authorization");
			if(authorization.indexOf("Bearer") != -1) {
				authorization = authorization.replaceAll("^Bearer\\s", "");
			}
			if (tokenProvider.validateToken(authorization)) {// 유효하면
				
				String userId = String.valueOf(tokenProvider.getSubject(authorization));
				resultMap = userService.getUserInfo(userId);
				resultMap.put("statusCode", 200);
			} else {
				resultMap.put("statusCode", 424);
				status = HttpStatus.FAILED_DEPENDENCY;
			}
		}catch(Exception e) {
			e.printStackTrace();
			resultMap.put("statusCode", 500);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	@GetMapping("/usernick")
	public ResponseEntity<Map<String, Object>> nickCheck(@RequestBody Map<String,String> map){
		ResponseEntity<Map<String, Object>> re = null;
		Map<String, Object> resultMap = new HashMap<>();
		try {
			String nick = map.get("userNick");
			Optional<UserDto> user = userRepo.findByuserNick(nick);
			if(user.isEmpty()) resultMap.put("isUsed", false);
			else resultMap.put("isUsed", true);
			resultMap.put("statusCode", 200);
			re = new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
			
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("statusCode", 500);
			re = new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
			return re;
		}
		return re;
	}
	@PatchMapping("/userdelete")
	public ResponseEntity<Map<String, Object>> userDelete(HttpServletRequest request){
		HttpStatus status = HttpStatus.OK;
		Map<String, Object> resultMap = new HashMap<>();
		try {
			String authorization = request.getHeader("Authorization");
			if(authorization.indexOf("Bearer") != -1) {
				authorization = authorization.replaceAll("^Bearer\\s", "");
			}
			if (tokenProvider.validateToken(authorization)) {// 유효하면
				String userId = String.valueOf(tokenProvider.getSubject(authorization));
				Optional<UserDto> user = userRepo.findByuserId(userId);
				user.get().setUserState('N');
				user.get().setUserDelete('Y');
				userRepo.save(user.get()); //바뀐내용으로 저장
				resultMap.put("statusCode", 200);
			} else {
				resultMap.put("statusCode", 424);
				status = HttpStatus.FAILED_DEPENDENCY;
			}
		}catch(Exception e) {
			e.printStackTrace();
			resultMap.put("statusCode", 500);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			return new ResponseEntity<Map<String, Object>>(resultMap, status);
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	@PatchMapping("/userinfoedit")
	public ResponseEntity<Map<String, Object>> userEdit(HttpServletRequest request, @RequestBody Map<String,String> map){
		HttpStatus status = HttpStatus.OK;
		Map<String, Object> resultMap = new HashMap<>();
		try {
			String authorization = request.getHeader("Authorization");
			if(authorization.indexOf("Bearer") != -1) {
				authorization = authorization.replaceAll("^Bearer\\s", "");
			}
			if (tokenProvider.validateToken(authorization)) {// 유효하면
				String userId = String.valueOf(tokenProvider.getSubject(authorization));
				System.out.println(userId);
				Optional<UserDto> user = userRepo.findByuserId(userId);
				Set<String> updates =  map.keySet();
				for(String s : updates) {
					switch(s) {
					case "userNick": 
						String nick = map.get(s);
						if(Pattern.matches("^[0-9a-zA-Z가-힣]{1,20}$", nick)) {
							user.get().setUserNick(nick);
						}
						else {
							resultMap.put("statusCode", 424);
							new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.FAILED_DEPENDENCY);
						}
						break;
					case "defaultLang": user.get().setDefaultLang(map.get(s).charAt(0));
						break;
					case "countryId": user.get().setCountryId(map.get(s));
						break;
					}
				}
				userRepo.save(user.get()); //바뀐내용으로 저장
				resultMap.put("statusCode", 200);
			} else {
				status = HttpStatus.FAILED_DEPENDENCY;
				resultMap.put("statusCode", 424);
				new ResponseEntity<Map<String, Object>>(resultMap, status);
			}
		}catch(Exception e) {
			e.printStackTrace();
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			resultMap.put("statusCode", 500);
			return new ResponseEntity<Map<String, Object>>(resultMap, status);
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
//	@PostMapping("/user/uploadprofile ")
//    public String form(@RequestParam MultipartFile file) throws IOException {
//
//        if (!file.isEmpty()) {
//            String filename = file.getOriginalFilename();
//
//            String fullPath = uploadDir + filename;
//            file.transferTo(new File(fullPath));
//        }
//        return "upload-form";
//    }
}
