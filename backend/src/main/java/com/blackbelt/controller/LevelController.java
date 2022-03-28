package com.blackbelt.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.service.LevelService;

@RestController
@RequestMapping("api/levelup")
public class LevelController {
	@Autowired
	private LevelService levelService;
	
	@PutMapping("")
	public ResponseEntity<Map<String, String>> levelup(@RequestBody Map<String, String> map) throws Exception{
		String user_id = map.get("userId");
		levelService.levelup(user_id);
		
		Map<String, String> result = new HashMap<String, String>();
		result.put("statuscode", "200");
		return ResponseEntity.status(200).body(result);
	}
	
	@PutMapping("/tier")
	public ResponseEntity<Map<String, String>> tierup(@RequestBody Map<String, String> map)  throws Exception {
		String red_id = map.get("redId");
		String blue_id = map.get("blueId");
		String red_win_lose_draw = map.get("redWinLoseDraw");
		
		levelService.tierup(red_id, blue_id);
		
		Map<String, String> result = new HashMap<String, String>();
		result.put("statuscode", "200");
		return ResponseEntity.status(200).body(result);
	}
}
