package com.blackbelt.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.BasicDto;
import com.blackbelt.model.BasicStageDto;
import com.blackbelt.model.service.BasicService;
import com.blackbelt.util.JwtTokenProvider;

@RestController
@RequestMapping("api/basic")
public class BasicController {
		
		@Autowired
		private BasicService basicService;
		@Autowired
		private JwtTokenProvider tokenProvider;
		
//		@GetMapping("")
//		public ResponseEntity<List<BasicDto>> getBasics() throws Exception {
//			List<BasicDto> result = basicService.listBasic();
//			//System.out.println("result"+result);
//			return ResponseEntity.status(200).body(result);
//		}
//		
		@GetMapping("")
		public ResponseEntity<List<BasicDto>> getBasics(@RequestHeader("Authorization") String authorization) throws Exception {
			String user_id = "";
	         if(authorization.indexOf("Bearer") != -1) {
	            authorization = authorization.replaceAll("^Bearer\\s", "");
	         }
	         List<BasicDto> result = new ArrayList<BasicDto>();
	         if (tokenProvider.validateToken(authorization)) {// 유효하면
	        	user_id = String.valueOf(tokenProvider.getSubject(authorization));
	            result = basicService.listBasic(user_id);
	            System.out.println("유효함!");
	         }else {
	        	 result = basicService.listBasic();
	        	 System.out.println("유효하지 않음!");
	         }
			return ResponseEntity.status(200).body(result);
		}
		@GetMapping("/{basicid}")
		public ResponseEntity<BasicDto> getBasic(@PathVariable("basicid") int basicid, @RequestHeader("Authorization") String authorization ) throws Exception {
			String user_id = "";
	         if(authorization.indexOf("Bearer") != -1) {
	            authorization = authorization.replaceAll("^Bearer\\s", "");
	         }
	         if (tokenProvider.validateToken(authorization)) {// 유효하면
	            
	        	 user_id = String.valueOf(tokenProvider.getSubject(authorization));
	        	 System.out.println("토큰이 유효함.");
	         }else {
	        	 System.out.println("토큰이 유효하지 않음.");
	         }
	         
	         
			BasicDto result = basicService.getBasic(user_id, basicid);
			
			return ResponseEntity.status(200).body(result);
		}
		@PatchMapping("/{basicid}")
		public ResponseEntity<Map<String, String>> updateBasicStage(@PathVariable("basicid") int basicid, @RequestBody Map<String, String> map, @RequestHeader("Authorization") String authorization) throws Exception {
			
			String user_id = "";
	         if(authorization.indexOf("Bearer") != -1) {
	            authorization = authorization.replaceAll("^Bearer\\s", "");
	         }
	         if (tokenProvider.validateToken(authorization)) {// 유효하면
	            
	        	 user_id = String.valueOf(tokenProvider.getSubject(authorization));
	        	 System.out.println("토큰이 유효함.");
	         }else {
	        	 System.out.println("토큰이 유효하지 않음.");
	         }
			//String userId = map.get("userId");
			//System.out.println("맵값: "+map);
			//String user_id =  map.get("userId");//나중에 token에서**
			//String test = map.get("basicId");
			String basic_id =  Integer.toString(basicid);
			String basic_score = map.get("basicScore");
			

			 String basic_clear = "";
			 if(map.get("basicClear").equals("Y")) {
				 basic_clear = "1";
			 }else if(map.get("basicClear").equals("N")){
				 basic_clear = "2";
			 }
			

			BasicStageDto basicStageDto = new BasicStageDto(user_id, basic_id, basic_score, basic_clear);
			basicService.updateBasicStage(basicStageDto);
			
			Map<String,String> result = new HashMap<>();//Map<String,String> map=new HashMap<>();
			result.put("levelpre", (Integer.parseInt(basic_clear)-1)+"");
			result.put("levelafter", basic_clear);					
			
			return ResponseEntity.status(200).body(result);
		}
		
	
}
