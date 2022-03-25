package com.blackbelt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.JudgeDto;
import com.blackbelt.model.service.JudgeService;

@RestController
@RequestMapping("api/judge")
public class JudgeController {
	@Autowired
	private JudgeService judgeService;
	
//	@PostMapping("")
//	public ResponseEntity<List<Map<String, Object>>> postjudge() throws Exception{
//		
//		return ResponseEntity.status(200).body(result);
//	}
	
	@GetMapping("")
	public ResponseEntity<JudgeDto> getjudge() throws Exception{
		String user_id = "1";////나중에 token에서**
		JudgeDto result = judgeService.getJudge(user_id);
		return ResponseEntity.status(200).body(result);
	}
}
