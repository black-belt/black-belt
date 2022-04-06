package com.blackbelt.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.PoomsaeStageDto;
import com.blackbelt.model.mapper.PoomsaeMapper;

@Service
public class PoomsaeServiceImpl  implements PoomsaeService {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<PoomsaeDto> listPoomsae(String user_id) throws Exception {
		return sqlSession.getMapper(PoomsaeMapper.class).listPoomsae(user_id);
	}

	@Override
	public PoomsaeDto getPoomsae(int poomsae_id) throws Exception {
		return sqlSession.getMapper(PoomsaeMapper.class).getPoomsae(poomsae_id);
	}

	@Override
	public void updatePoomsaeStage(PoomsaeStageDto poomsaeStageDto) {
		sqlSession.getMapper(PoomsaeMapper.class).updatePoomsaeStage(poomsaeStageDto);
		
	}

}
