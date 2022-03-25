package com.blackbelt.model.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.JudgeDto;
import com.blackbelt.model.mapper.JudgeMapper;

@Service
public class JudgeServiceImpl implements JudgeService {
	@Autowired
	private SqlSession sqlSession;
	@Override
	public JudgeDto getJudge(String user_id) throws Exception {
		return sqlSession.getMapper(JudgeMapper.class).getJudge(user_id);
	}

}
