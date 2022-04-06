package com.blackbelt.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

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
import com.blackbelt.util.JwtTokenProvider;

@RestController
@RequestMapping("api/combo")
public class ComboController {
	
	@Autowired
	private ComboService comboService;
	@Autowired
	private JwtTokenProvider tokenProvider;
	//@GetMapping("") ///api/combo/:comboid
	
	//@SuppressWarnings("null")
	@GetMapping("")
	public ResponseEntity<List<Map<String, Object>>> getCombos( @RequestHeader("Authorization") String authorization) throws Exception {
		String user_id = "";
        if(authorization.indexOf("Bearer") != -1) {
           authorization = authorization.replaceAll("^Bearer\\s", "");
        }
        if (tokenProvider.validateToken(authorization)) {// 유효하면
           
       	 user_id = String.valueOf(tokenProvider.getSubject(authorization));
       	 System.out.println("토큰이 유효함.");
        }
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
			List<ComboDto> combolist = comboService.listCombo(Integer.parseInt(poomsae_id), user_id);
			
//			/ArrayList<String> testlist = new ArrayList<String>();
			
			for(ComboDto combo: combolist) {
				String[] combo_explain_list = ((String) combo.getCombo_explain()).split("/"); 
				combo.setCombo_explain(combo_explain_list);
				String[] combo_explain_e_list = ((String) combo.getCombo_explain_e()).split("/"); 
				combo.setCombo_explain_e(combo_explain_e_list);
				String combo_answer = ((String) combo.getCombo_answer());
				if(combo_answer != null) {
					String[] combo_answer_list = combo_answer.replace("[", "").replace("]", "").replace(" ", "").split(",");
					combo.setCombo_answer(combo_answer_list);
				}
				String combo_answer_index = ((String) combo.getCombo_answer_index());
				if(combo_answer_index != null) {
					String[] combo_answer_index_list = combo_answer_index.replace("[", "").replace("]", "").replace(" ", "").split(",");
					combo.setCombo_answer_index(combo_answer_index_list);
				}

			}

			map.put("comboList", combolist);
			//System.out.println("getCombos6");
			result.add(map);
			
		}

		
		
		
		return ResponseEntity.status(200).body(result);
	}
	@GetMapping("/{comboid}")
	public ResponseEntity<ComboDto> getCombo(@PathVariable("comboid") int comboid) throws Exception {
		ComboDto result = comboService.getCombo(comboid);// getCombo(comboid);
		
			String[] combo_explain_list = ((String) result.getCombo_explain()).split("/"); 
			result.setCombo_explain(combo_explain_list);
			String[] combo_explain_e_list = ((String) result.getCombo_explain_e()).split("/"); 
			result.setCombo_explain_e(combo_explain_e_list);
			String combo_answer = ((String) result.getCombo_answer());
			if(combo_answer != null) {
				String[] combo_answer_list = combo_answer.replace("[", "").replace("]", "").replace(" ", "").split(",");
				result.setCombo_answer(combo_answer_list);
			}
			String combo_answer_index = ((String) result.getCombo_answer_index());
			if(combo_answer_index != null) {
				String[] combo_answer_index_list = combo_answer_index.replace("[", "").replace("]", "").replace(" ", "").split(",");
				result.setCombo_answer_index(combo_answer_index_list);
			}

		
		return ResponseEntity.status(200).body(result);
	} 
	
	@PatchMapping("/{comboid}")
	public ResponseEntity<Map<String, String>> updateComboStage(@RequestHeader("Authorization") String authorization, @PathVariable("comboid") int comboid, @RequestBody Map<String, String> map) throws Exception{
		String user_id = "";
        if(authorization.indexOf("Bearer") != -1) {
           authorization = authorization.replaceAll("^Bearer\\s", "");
        }
        if (tokenProvider.validateToken(authorization)) {// 유효하면
        	user_id = String.valueOf(tokenProvider.getSubject(authorization));
            System.out.println("유효함!");
         }
		String combo_id = Integer.toString(comboid);
		String combo_score = map.get("comboScore");
		String combo_clear = map.get("comboClear");

		ComboStageDto comboStageDto = new ComboStageDto(user_id, combo_id, combo_score, combo_clear);
		comboService.updateComboStage(comboStageDto);
		
		Map<String, String> result = new HashMap<>();

		result.put("statusCode", "200");
		
		
		return ResponseEntity.status(200).body(result);
	}
	
}
