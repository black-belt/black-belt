package com.blackbelt.model.mapper;

import java.util.List;

import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.PoomsaeStageDto;

public interface PoomsaeMapper {
	public List<PoomsaeDto> listPoomsae(String user_id) throws Exception;
	public PoomsaeDto getPoomsae(int poomsae_id) throws Exception;
	public void updatePoomsaeStage(PoomsaeStageDto poomsaeStageDto);
}
