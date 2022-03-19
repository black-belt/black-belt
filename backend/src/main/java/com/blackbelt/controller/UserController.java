package com.blackbelt.controller;


import static org.junit.jupiter.api.Assertions.assertEquals;

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

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
//	private static final String ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
//    private static final String CLIENT_ID = "706190010312-09mr50no41u7hs0s0nstpn4m41vnldbs.apps.googleusercontent.com";
//    private static final String REDIRECT_URI = "http://localhost:8000/login/oauth2/code/google";
//    private static final String RESPONSE_TYPE = "code";
//    private static final String SCOPE = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
	@Autowired
	CountryCrudRepository countryRepo;
	@Autowired
	UserCrudRepository userRepo;
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	HttpSession httpSession;
	// name에 persistance unit name을 등록할 수 있다. 

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login( @RequestBody Map<String,String> map) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			String userName = map.get("userName");
			String userEmail = map.get("userName");
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
					userRepo.deleteById(user.get().getUserId()); //유니크 조건 때문에 일단 삭제하도록 구현
					lastId = String.valueOf(Integer.parseInt(userRepo.findLastUser().getUserId()) + 1) ;
					userNick = "anonymous" + lastId;
					userRepo.save(UserDto.builder().userId(lastId).countryId("1").levelId("1").tierId("1").userScore("999")
							.userNick(userNick).userState('Y').userDelete('N').userSignupDate(new Date()).defaultLang('K')
			    			.userEmail(userEmail).userName(userName).build());
				}else {//현재 회원이다
					lastId = user.get().getUserId();
					//로그인 성공시 겨루기 상태값을 Y로 한다.
					userRepo.updateState(lastId,"Y");
				}
				String token = tokenProvider.createToken(lastId);// key, data, subject
				resultMap.put("Authorization", token);
				status = HttpStatus.OK;
				
			} else {
				status = HttpStatus.FAILED_DEPENDENCY;
			}
		} catch (Exception e) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@Test
	@DisplayName("회원 겨루기 가능여부가 잘 수정되었는지 확인할때 사용")
	@PutMapping("/logout")
	public ResponseEntity<String> registerUser(@RequestBody Map<String,String> map ) {
		ResponseEntity<String> re = null;
		
		try {
			String userId = map.get("userId");
			Optional<UserDto> updateUser = userRepo.findById(userId);
			if(!updateUser.isEmpty()) {
				updateUser.get().setUserId(userId);
				updateUser.get().setUserState('N');
			}else {
				return new ResponseEntity<String>("NOT FOUND", HttpStatus.FAILED_DEPENDENCY);
			}
			
			UserDto saveUser = userRepo.save(updateUser.get());
			assertEquals(updateUser.get().getUserState(), saveUser.getUserState(), "not updated properly!!");
			re = new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		}catch(Exception e) {
			re = new ResponseEntity<String>("ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return re;
	}
	
	@GetMapping("/country")
	public ResponseEntity<List<CountryDto>> getCountries() {
		ResponseEntity<List<CountryDto>> re = null;
		try {
			List<CountryDto> clist = countryRepo.findAll();
			
			System.out.println(clist.get(0).getCountryId());
		  if(clist != null) {
			  re = new ResponseEntity<List<CountryDto>>(clist, HttpStatus.OK);
		  }
		} catch (Exception e) {
			re = new ResponseEntity<List<CountryDto>>(new ArrayList<CountryDto>(), HttpStatus.INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}		
		return re;
	}
}
