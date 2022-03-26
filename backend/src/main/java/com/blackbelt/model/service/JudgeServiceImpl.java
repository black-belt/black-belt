package com.blackbelt.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.JudgeDto;
import com.blackbelt.model.LevelPoomsaeDto;
import com.blackbelt.model.UserDto;
import com.blackbelt.model.mapper.JudgeMapper;

@Service
public class JudgeServiceImpl implements JudgeService {
	@Autowired
	private SqlSession sqlSession;
	@Override
	public List<LevelPoomsaeDto> getJudge(String user_id) throws Exception {
		Map<String, String> map = new HashMap<String, String>();

		map.put("user_id", user_id);
		map.put("user_state", "N");
		sqlSession.getMapper(JudgeMapper.class).updateuserState(map);
		System.out.println("test3:");
		//test
		List<LevelPoomsaeDto> test = sqlSession.getMapper(JudgeMapper.class).getJudge(user_id);
		System.out.println("test4: ");
		return test;
	}
	@Override
	public String insertJudge(JudgeDto judgeDto) throws Exception {
		
		sqlSession.getMapper(JudgeMapper.class).insertJudge(judgeDto);
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", judgeDto.getUser_id());
		map.put("user_state", "Y");
		sqlSession.getMapper(JudgeMapper.class).updateuserState(map);
		return  judgeDto.getJudge_ox();
	}

}
