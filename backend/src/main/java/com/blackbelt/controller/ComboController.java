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

import com.blackbelt.model.ComboDto;
import com.blackbelt.model.ComboStageDto;
import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.service.ComboService;

@RestController
@RequestMapping("api/combo")
public class ComboController {
	
	@Autowired
	private ComboService comboService;
	
	//@GetMapping("") ///api/combo/:comboid
	
	//@SuppressWarnings("null")
	@GetMapping("")
	public ResponseEntity<List<Map<String, Object>>> getCombos() throws Exception {
		//나중에 token값 유효여부만 판단하면 됨. id가 쓰이진 않을듯??
		
		List<PoomsaeDto> poomsaelist = comboService.getPoomsae();
		
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		//result.put("");

		for(PoomsaeDto poomsae: poomsaelist) {
			//System.out.println("getCombos1");
			
			Map<String, Object> map = new HashMap<String, Object>();
			//System.out.println("getCombos2");
			
			String poomsae_id = poomsae.getPoomsae_id();
			String poomsae_name = poomsae.getPoomsae_name();
			String poomsae_name_e = poomsae.getPoomsae_name_e();
			
			///System.out.println("getCombos3");
			map.put("poomsae_id", poomsae_id);
			map.put("poomsae_name", poomsae_name);
			map.put("poomsae_name_e", poomsae_name_e);
			//System.out.println("getCombos4");
			List<ComboDto> combolist = comboService.listCombo(Integer.parseInt(poomsae_id));
			//System.out.println("getCombos5");
			map.put("comboList", combolist);
			//System.out.println("getCombos6");
			result.add(map);
			
		}

		
		
		
		return ResponseEntity.status(200).body(result);
	}
	@GetMapping("/{comboid}")
	public ResponseEntity<ComboDto> getCombo(@PathVariable("comboid") int comboid) throws Exception {
		ComboDto result = comboService.getCombo(comboid);// getCombo(comboid);
		return ResponseEntity.status(200).body(result);
	} 
	
	@PatchMapping("/{comboid}")
	public ResponseEntity<Map<String, String>> updateComboStage(@PathVariable("comboid") int comboid, @RequestBody Map<String, String> map) throws Exception{
		//, @RequestHeader("Authorization") String authorization 
		String combo_id = Integer.toString(comboid);
		String user_id = "1";//나중에 token에서**
		String combo_score = map.get("comboScore");
		String combo_clear = map.get("comboClear");
		
//		if(authorization.indexOf("Bearer") != -1) {
//            authorization = authorization.replaceAll("^Bearer\\s", "");
//         }
////         if (tokenProvider.validateToken(authorization)) {// 유효하면
////            
////            String userId = String.valueOf(tokenProvider.getSubject(authorization));
////         }
//		if(map.get("comboClear")== "Y") {
//			combo_clear = "1";
//		}else {
//			combo_clear = "2";
//		}
		
		//System.out.println("combo_clear1: "+combo_clear);
		ComboStageDto comboStageDto = new ComboStageDto(user_id, combo_id, combo_score, combo_clear);
		comboService.updateComboStage(comboStageDto);
		
		Map<String, String> result = new HashMap<>();
//		result.put("", remappingFunction);
		//result.put("statusCode", "200");
		//result.compute("", remappingFunction);
		
		
		return ResponseEntity.status(200).body(result);
	}
	
}
