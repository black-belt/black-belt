package com.blackbelt.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.model.UserDto;
import com.blackbelt.model.service.QueService;
import com.blackbelt.model.service.UserService;

@RestController
@RequestMapping("api/que")
//@Api("큐 컨트롤러 API")
public class QueController {

	//logger 관련
	private static final String SUCCESS ="success";
	private static final String FAIL ="fail";
	
	@Autowired
	private QueService queService;

	
	// 닉네임 검색
	@GetMapping("/select/{search}")	
	public ResponseEntity<List<UserDto>> searchUserList(
			@PathVariable("search") String search)	throws Exception{		// 이 줄에 ApiParam 등도 추가 ! 	
		List<UserDto> userlist = queService.searchUserList(search);
		
		return new ResponseEntity<List<UserDto>>( userlist,HttpStatus.OK);
	}
	

}