package com.blackbelt.model.service;

import java.util.List;

import com.blackbelt.model.BasicDto;
import com.blackbelt.model.BasicStageDto;

public interface BasicService {
	List<BasicDto> listBasic() throws Exception;
	List<BasicDto> getBasic(int basicid) throws Exception;
	void updateBasicStage(BasicStageDto basicStageDto) throws Exception;
	
}
