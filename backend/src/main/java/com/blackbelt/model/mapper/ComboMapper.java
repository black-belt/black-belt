package com.blackbelt.model.mapper;

import java.util.List;

import com.blackbelt.model.ComboDto;
import com.blackbelt.model.ComboStageDto;
import com.blackbelt.model.PoomsaeDto;

public interface ComboMapper {
	List<ComboDto> listCombo(int poomsae_id, int user_id) throws Exception;
	ComboDto getCombo(int comboid) throws Exception;
	List<PoomsaeDto> getPoomsae() throws Exception;
	void updateComboStage(ComboStageDto comboStageDto);
}
