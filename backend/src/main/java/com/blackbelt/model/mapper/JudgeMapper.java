package com.blackbelt.model.mapper;

import com.blackbelt.model.JudgeDto;

public interface JudgeMapper {

	JudgeDto getJudge(String user_id) throws Exception;

}
