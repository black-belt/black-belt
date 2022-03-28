package com.blackbelt.model.service;

import java.util.List;

import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.PoomsaeStageDto;

public interface PoomsaeService {

	public List<PoomsaeDto> listPoomsae(String user_id) throws Exception;

	public PoomsaeDto getPoomsae(int poomsaeid) throws Exception;

	public void updatePoomsaeStage(PoomsaeStageDto poomsaeStageDto);
	
}
