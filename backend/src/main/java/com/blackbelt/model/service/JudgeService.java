package com.blackbelt.model.service;

import com.blackbelt.model.JudgeDto;

public interface JudgeService{

	JudgeDto getJudge(String user_id) throws Exception;
	
}
