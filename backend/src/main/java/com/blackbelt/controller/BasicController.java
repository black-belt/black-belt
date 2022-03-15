package com.blackbelt.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.blackbelt.model.BasicDto;
import com.blackbelt.model.service.BasicService;

//회원 처리용 controller
@Controller
@RequestMapping("/basic")
public class BasicController {
		@Autowired
		private BasicService basicService;
		
		@GetMapping("/")
		public String list() {
			return "api/list";
		}
		
	
	
}
