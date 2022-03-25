package com.blackbelt.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.ComboDto;
import com.blackbelt.model.ComboStageDto;
import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.mapper.ComboMapper;

@Service
public class ComboServiceImpl implements ComboService {
	@Autowired
	private SqlSession sqlSession;
	@Override
	public List<ComboDto> listCombo(int poomsae_id) throws Exception {
		return sqlSession.getMapper(ComboMapper.class).listCombo(poomsae_id);
	}
	@Override
	public ComboDto getCombo(int comboid) throws Exception {
		return sqlSession.getMapper(ComboMapper.class).getCombo(comboid);
	}
	@Override
	public List<PoomsaeDto> getPoomsae() throws Exception {
		return sqlSession.getMapper(ComboMapper.class).getPoomsae();
	}
	@Override
	public void updateComboStage(ComboStageDto comboStageDto) {
		//System.out.println("combo2"+comboStageDto.getCombo_clear());
		sqlSession.getMapper(ComboMapper.class).updateComboStage(comboStageDto);
		
	}

}
