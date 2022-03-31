package com.blackbelt.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.PoomsaeStageDto;
import com.blackbelt.model.service.PoomsaeService;
import com.blackbelt.util.JwtTokenProvider;

@RestController
@RequestMapping("api/poomsae")
public class PoomsaeController {
	@Autowired
	private PoomsaeService poomsaeService;
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@GetMapping("")
	public ResponseEntity<List<PoomsaeDto>> Poomsaelist(@RequestHeader("Authorization") String authorization) throws Exception {
		String user_id = "";
        if(authorization.indexOf("Bearer") != -1) {
           authorization = authorization.replaceAll("^Bearer\\s", "");
        }
        if (tokenProvider.validateToken(authorization)) {// 유효하면
       	 user_id = String.valueOf(tokenProvider.getSubject(authorization));
       	 System.out.println("토큰이 유효함.");
        }
		List<PoomsaeDto> result = poomsaeService.listPoomsae(user_id);
		for(PoomsaeDto poomsae: result) {
			//poomsae_explain
			String[] poomsae_explain_list = ((String) poomsae.getPoomsae_explain()).split("#");
			String[][] poomsae_explain_array = new String[poomsae_explain_list.length][] ;
			int r = 0;
			for(String poomsae_explain:poomsae_explain_list ) {
				poomsae_explain_array[r++] = poomsae_explain.split("/");
			}
			poomsae.setPoomsae_explain(poomsae_explain_array);
			//poomsae_explain_e
			String[] poomsae_explain_e_list = ((String) poomsae.getPoomsae_explain_e()).split("#");
			String[][] poomsae_explain_e_array = new String[poomsae_explain_e_list.length][];
			r = 0;
			for(String poomsae_explain_e:poomsae_explain_list) {
				poomsae_explain_e_array[r++] = poomsae_explain_e.split("/");
			}
			poomsae.setPoomsae_explain_e(poomsae_explain_e_array);
			//poomsae_answer
			String poomsae_answer_list = (String) poomsae.getPoomsae_answer();
			List<String[]> poomsae_answer_array = new ArrayList<String[]>(); 
			if(poomsae_answer_list != null) {
				for (String poomsae_answer: poomsae_answer_list.split("\\]\\s*,\\s*\\[")) {
			        poomsae_answer = poomsae_answer.replaceAll("\\[", "").replaceAll("\\]", "");
			        String[] poomsae_answer_str = poomsae_answer.replace(" \"", "").replace("\"", "").split(",");
			        poomsae_answer_array.add(poomsae_answer_str);
			    }
				poomsae.setPoomsae_answer(poomsae_answer_array);
			}
			//poomsae_answer_index
			String poomsae_answer_index_list = (String) poomsae.getPoomsae_answer_index();
			List<String[]> poomsae_answer_index_array = new ArrayList<String[]>(); 
			if(poomsae_answer_index_list != null) {
				for (String poomsae_answer_index: poomsae_answer_index_list.split("\\]\\s*,\\s*\\[")) {
			        poomsae_answer_index = poomsae_answer_index.replaceAll("\\[", "").replaceAll("\\]", "");
			        String[] poomsae_answer_index_str = poomsae_answer_index.replace(" ", "").split(",");
			        poomsae_answer_index_array.add(poomsae_answer_index_str);
			    }
				poomsae.setPoomsae_answer_index(poomsae_answer_index_array);
			}
		}
		return ResponseEntity.status(200).body(result);
	}
	
	@GetMapping("/{poomsaeid}")
	public ResponseEntity<PoomsaeDto> getPoomsae(@PathVariable("poomsaeid") int poomsaeid) throws Exception {
		PoomsaeDto result = poomsaeService.getPoomsae(poomsaeid);
		
	
			//poomsae_explain
			String[] poomsae_explain_list = ((String) result.getPoomsae_explain()).split("#");
			String[][] poomsae_explain_array = new String[poomsae_explain_list.length][] ;
			int r = 0;
			for(String poomsae_explain:poomsae_explain_list ) {
				poomsae_explain_array[r++] = poomsae_explain.split("/");
			}
			result.setPoomsae_explain(poomsae_explain_array);
			//poomsae_explain_e
			String[] poomsae_explain_e_list = ((String) result.getPoomsae_explain_e()).split("#");
			String[][] poomsae_explain_e_array = new String[poomsae_explain_e_list.length][];
			r = 0;
			for(String poomsae_explain_e:poomsae_explain_list) {
				poomsae_explain_e_array[r++] = poomsae_explain_e.split("/");
			}
			result.setPoomsae_explain_e(poomsae_explain_e_array);
			//poomsae_answer
			String poomsae_answer_list = (String) result.getPoomsae_answer();
			List<String[]> poomsae_answer_array = new ArrayList<String[]>(); 
			if(poomsae_answer_list != null) {
				for (String poomsae_answer: poomsae_answer_list.split("\\]\\s*,\\s*\\[")) {
			        poomsae_answer = poomsae_answer.replaceAll("\\[", "").replaceAll("\\]", "");
			        String[] poomsae_answer_str = poomsae_answer.replace(" \"", "").replace("\"", "").split(",");
			        poomsae_answer_array.add(poomsae_answer_str);
			    }
				result.setPoomsae_answer(poomsae_answer_array);
			}
			//poomsae_answer_index
			String poomsae_answer_index_list = (String) result.getPoomsae_answer_index();
			List<String[]> poomsae_answer_index_array = new ArrayList<String[]>(); 
			if(poomsae_answer_index_list != null) {
				for (String poomsae_answer_index: poomsae_answer_index_list.split("\\]\\s*,\\s*\\[")) {
			        poomsae_answer_index = poomsae_answer_index.replaceAll("\\[", "").replaceAll("\\]", "");
			        String[] poomsae_answer_index_str = poomsae_answer_index.replace(" ", "").split(",");
			        poomsae_answer_index_array.add(poomsae_answer_index_str);
			    }
				result.setPoomsae_answer_index(poomsae_answer_index_array);
			}
		
		return ResponseEntity.status(200).body(result);
	}
	@PatchMapping("/{poomsaeid}")
	public ResponseEntity<Map<String, String>> updatePoomsaeStage(@RequestHeader("Authorization") String authorization,@PathVariable("poomsaeid") int poomsaeid, @RequestBody Map<String, String> map) throws Exception{
		String user_id = "";
        if(authorization.indexOf("Bearer") != -1) {
           authorization = authorization.replaceAll("^Bearer\\s", "");
        }
        if (tokenProvider.validateToken(authorization)) {// 유효하면
        	user_id = String.valueOf(tokenProvider.getSubject(authorization));
            System.out.println("유효함!");
         }
		String poomsae_id = Integer.toString(poomsaeid);
		
		String poomsae_score= map.get("poomsaeScore");
		String poomsae_clear = map.get("poomsaeClear");
		PoomsaeStageDto poomsaeStageDto = new PoomsaeStageDto(user_id, poomsae_id, poomsae_score, poomsae_clear);
		poomsaeService.updatePoomsaeStage(poomsaeStageDto);
		
		Map<String, String> result = new HashMap<>();
		
		result.put("statusCode", "200");
		return ResponseEntity.status(200).body(result);
	
	}
	
	
}
