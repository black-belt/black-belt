package com.blackbelt.model.service;

import java.util.List;

import com.blackbelt.model.JudgeDto;
import com.blackbelt.model.LevelPoomsaeDto;

public interface JudgeService{

	List<LevelPoomsaeDto> getJudge(String user_id) throws Exception;


	String insertJudge(JudgeDto judgeDto) throws Exception;

	
}
