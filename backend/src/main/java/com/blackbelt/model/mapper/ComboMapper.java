package com.blackbelt.model.mapper;

import java.util.List;

import com.blackbelt.model.ComboDto;

public interface ComboMapper {
	List<ComboDto> listCombo() throws Exception;
	ComboDto getCombo(int comboid) throws Exception;
}
