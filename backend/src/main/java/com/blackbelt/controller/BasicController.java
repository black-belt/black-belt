package com.blackbelt.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.BasicDto;
import com.blackbelt.model.service.BasicService;

//회원 처리용 controller
@RestController
@RequestMapping("api/basic")
public class BasicController {
		@Autowired
		private BasicService basicService;
		
		@GetMapping("")
		public ResponseEntity<List<BasicDto>> getBasics() throws Exception {
			List<BasicDto> result = basicService.listBasic();
			System.out.println("result"+result);
			return ResponseEntity.status(200).body(result);
		}
//		@GetMapping("/test")
//		public ResponseEntity<List<BasicDto>> getBasics() throws Exception {
//			List<BasicDto> result = basicService.listBasic();
//			System.out.println("result"+result);
//			return ResponseEntity.status(200).body(result);
//		}
		
		
	
}
