package com.blackbelt.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.ComboDto;
import com.blackbelt.model.mapper.ComboMapper;

@Service
public class ComboServiceImpl implements ComboService {
	@Autowired
	private SqlSession sqlSession;
	@Override
	public List<ComboDto> listCombo() throws Exception {
		return sqlSession.getMapper(ComboMapper.class).listCombo();
	}
	@Override
	public ComboDto getCombo(int comboid) throws Exception {
		return sqlSession.getMapper(ComboMapper.class).getCombo(comboid);
	}

}
