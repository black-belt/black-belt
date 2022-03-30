package com.blackbelt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.PoomsaeStageDto;
import com.blackbelt.model.service.PoomsaeService;

@RestController
@RequestMapping("api/poomsae")
public class PoomsaeController {
	@Autowired
	private PoomsaeService poomsaeService;
	
	@GetMapping("")
	public ResponseEntity<List<PoomsaeDto>> Poomsaelist() throws Exception {
		String user_id = "1";//*****(나중에 token에서 가져와야 됨.)
		List<PoomsaeDto> result = poomsaeService.listPoomsae(user_id);
		
		return ResponseEntity.status(200).body(result);
	}
	
	@GetMapping("/{poomsaeid}")
	public ResponseEntity<PoomsaeDto> getPoomsae(@PathVariable("poomsaeid") int poomsaeid) throws Exception {
		PoomsaeDto result = poomsaeService.getPoomsae(poomsaeid);
		return ResponseEntity.status(200).body(result);
	}
	@PatchMapping("/{poomsaeid}")
	public ResponseEntity<Map<String, String>> updatePoomsaeStage(@PathVariable("poomsaeid") int poomsaeid, @RequestBody Map<String, String> map) throws Exception{
		String poomsae_id = Integer.toString(poomsaeid);
		String user_id = "1";//나중에 token에서**
		String poomsae_score= map.get("poomsaeScore");
		String poomsae_clear = map.get("poomsaeClear");
		PoomsaeStageDto poomsaeStageDto = new PoomsaeStageDto(user_id, poomsae_id, poomsae_score, poomsae_clear);
		poomsaeService.updatePoomsaeStage(poomsaeStageDto);
		
		Map<String, String> result = new HashMap<>();
		return ResponseEntity.status(200).body(result);
	
	}
}
