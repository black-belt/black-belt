package com.blackbelt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.tomcat.jni.Mmap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.JudgeDto;
import com.blackbelt.model.LevelPoomsaeDto;
import com.blackbelt.model.service.JudgeService;
import com.blackbelt.util.JwtTokenProvider;

@RestController
@RequestMapping("api/judge")
public class JudgeController {
	@Autowired
	private JudgeService judgeService;
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@PostMapping("")
	public ResponseEntity<Map<String, String>> postjudge(@RequestBody Map<String, String> map) throws Exception{
		String user_id = map.get("user_id");
		String level_id = map.get("level_id");
		String fail = "Y";
		if( map.get("fail") == "0") {
			fail = "N";
		}else {
			fail = "Y";
		}
		
		
		String judge_score = map.get("judge_score");
		
		JudgeDto judgeDto = new JudgeDto(user_id, level_id, fail, judge_score);
		String judge_ox = judgeService.insertJudge(judgeDto);
		
		Map<String, String> result = new HashMap<String, String>();
		result.put("judge_ox", judge_ox);
		
		return ResponseEntity.status(200).body(result);
	}
	
	@GetMapping("")
	public ResponseEntity<Map<String, Object>> getjudge(@RequestHeader("Authorization") String authorization) throws Exception{
		String user_id = "";
        if(authorization.indexOf("Bearer") != -1) {
           authorization = authorization.replaceAll("^Bearer\\s", "");
        }
        if (tokenProvider.validateToken(authorization)) {// 유효하면
        	user_id = String.valueOf(tokenProvider.getSubject(authorization));
            System.out.println("유효함!");
         }
		List<LevelPoomsaeDto> lplist = judgeService.getJudge(user_id);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("judgeLevelId", lplist.get(0).getLevel_id());
		result.put("judgeLevelName", lplist.get(0).getLevel_name());
		ArrayList<String> randomPoomsaeId = new ArrayList<String>();
		ArrayList<String> randomPoomsaeName = new ArrayList<String>();
		ArrayList<String> randomAnswer = new ArrayList<String>();		
		ArrayList<String> randomAnswerIndex = new ArrayList<String>();		
		String essentialPoomsaeId = "";
		String essentialPoomsaeName = "";
		String essentialAnswer = "";
		String essentialAnswerIndex = "";

		for(LevelPoomsaeDto lp:lplist) {
			if(lp.getIs_essential().equals("Y")) {
				essentialPoomsaeId = lp.getPoomsae_id();
				essentialPoomsaeName = lp.getPoomsae_name();
				essentialAnswer = lp.getPoomsae_answer();
				essentialAnswerIndex = lp.getPoomsae_answer_index();
			}else if(lp.getIs_essential().equals("N")) {
				
				randomPoomsaeId.add(lp.getPoomsae_id());
				randomPoomsaeName.add(lp.getPoomsae_name());
				randomAnswer.add(lp.getPoomsae_answer());
				randomAnswerIndex.add(lp.getPoomsae_answer_index());
			}
		}
		Random rand = new Random();
		int rint = rand.nextInt(randomPoomsaeId.size());
		result.put("randomPoomsaeId", randomPoomsaeId.get(rint));
		result.put("randomPoomsaeName", randomPoomsaeName.get(rint));
		//randomAnswer
		String random_answer_list = randomAnswer.get(rint);
		List<String[]> random_answer_array = new ArrayList<String[]>();
		if(random_answer_list != null) {
			for(String random_answer: random_answer_list.split("\\]\\s*,\\s*\\[")) {
				random_answer = random_answer.replaceAll("\\[", "").replaceAll("\\]", "");
				String[] random_answer_str = random_answer.replace(" \"", "").replace("\"", "").split(",");
				random_answer_array.add(random_answer_str);
			}
			result.put("randomAnswer", random_answer_array);
		}
		//randomAnswerIndex
		String random_answer_index_list = randomAnswerIndex.get(rint);
		List<String[]> random_answer_index_array = new ArrayList<String[]>();
		if(random_answer_index_list != null) {
			for(String random_answer_index: random_answer_index_list.split("\\]\\s*,\\s*\\[")) {
				random_answer_index = random_answer_index.replaceAll("\\[", "").replaceAll("\\]", "");
				String[] random_answer_index_str = random_answer_index.replace(" ", "").split(",");
				random_answer_index_array.add(random_answer_index_str);
			}
			result.put("randomAnswerIndex", random_answer_index_array);
		}
		//essentialPoomsaeId, essentialPoomsaeName
		result.put("essentialPoomsaeId", essentialPoomsaeId);
		result.put("essentialPoomsaeName", essentialPoomsaeName);
		//essentialAnswer
				String essential_answer_list = essentialAnswer;
				List<String[]> essential_answer_array = new ArrayList<String[]>();
				if(essential_answer_list != null) {
					for(String essential_answer: essential_answer_list.split("\\]\\s*,\\s*\\[")) {
						essential_answer = essential_answer.replaceAll("\\[", "").replaceAll("\\]", "");
						String[] essential_answer_str = essential_answer.replace(" \"", "").replace("\"", "").split(",");
						essential_answer_array.add(essential_answer_str);
					}
					result.put("essentialAnswer", essential_answer_array);
				}
				//essentialAnswerIndex
				String essential_answer_index_list = essentialAnswerIndex;
				List<String[]> essential_answer_index_array = new ArrayList<String[]>();
				if(essential_answer_index_list != null) {
					for(String essential_answer_index:essential_answer_index_list.split("\\]\\s*,\\s*\\[")) {
						essential_answer_index = essential_answer_index.replaceAll("\\[", "").replaceAll("\\]", "");
						String[] essential_answer_index_str = essential_answer_index.replace(" ", "").split(",");
						essential_answer_index_array.add(essential_answer_index_str);
					}
					result.put("essentialAnswerIndex", essential_answer_index_array);
				}
				//result.put("essentialAnswerIndex", essentialAnswerIndex);

		
		return ResponseEntity.status(200).body(result);
	}
}
