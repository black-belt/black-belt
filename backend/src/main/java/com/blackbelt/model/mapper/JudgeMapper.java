package com.blackbelt.model.mapper;

import java.util.List;
import java.util.Map;

import com.blackbelt.model.JudgeDto;
import com.blackbelt.model.LevelPoomsaeDto;

public interface JudgeMapper {

	List<LevelPoomsaeDto> getJudge(String user_id) throws Exception;

	void insertJudge(JudgeDto judgeDto) throws Exception;
	
	void updateuserState(Map<String, String> map) throws Exception;

}
