package com.blackbelt.model.service;

import java.util.List;
import com.blackbelt.model.ComboDto;

public interface ComboService {
	List<ComboDto> listCombo() throws Exception;
	ComboDto getCombo(int comboid) throws Exception;
}
