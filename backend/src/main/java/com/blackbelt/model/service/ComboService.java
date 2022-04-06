package com.blackbelt.model.service;

import java.util.List;
import com.blackbelt.model.ComboDto;
import com.blackbelt.model.ComboStageDto;
import com.blackbelt.model.PoomsaeDto;

public interface ComboService {
	List<ComboDto> listCombo(int poomsae_id, String user_id) throws Exception;
	ComboDto getCombo(int comboid) throws Exception;
	List<PoomsaeDto> getPoomsae() throws Exception;
	void updateComboStage(ComboStageDto comboStageDto);
}
