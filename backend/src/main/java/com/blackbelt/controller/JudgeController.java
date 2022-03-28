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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.JudgeDto;
import com.blackbelt.model.LevelPoomsaeDto;
import com.blackbelt.model.service.JudgeService;

@RestController
@RequestMapping("api/judge")
public class JudgeController {
	@Autowired
	private JudgeService judgeService;
	
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
	public ResponseEntity<Map<String, Object>> getjudge() throws Exception{
		String user_id = "1";////나중에 token에서**
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
		result.put("randomAnswer", randomAnswer.get(rint));
		result.put("randomAnswerIndex", randomAnswerIndex.get(rint));

		result.put("essentialPoomsaeId", essentialPoomsaeId);
		result.put("essentialPoomsaeName", essentialPoomsaeName);
		result.put("essentialAnswer", essentialAnswer);
		result.put("essentialAnswerIndex", essentialAnswerIndex);

		
		return ResponseEntity.status(200).body(result);
	}
}
