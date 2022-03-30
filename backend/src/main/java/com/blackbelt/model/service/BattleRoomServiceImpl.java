package com.blackbelt.model.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.BattleHistoryDto;
import com.blackbelt.model.mapper.BattleMapper;

@Service
public class BattleRoomServiceImpl implements BattleRoomService {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<Map<String, Object>> getBattleRoomInfo(BattleHistoryDto battleHistoryDto) throws Exception {
		return sqlSession.getMapper(BattleMapper.class).getBattleRoomInfo(battleHistoryDto);
	}

}
