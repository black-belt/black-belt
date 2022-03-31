package com.blackbelt.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.BasicDto;
import com.blackbelt.model.BasicStageDto;
import com.blackbelt.model.mapper.BasicMapper;

@Service
public class BasicServiceImpl implements BasicService {
	@Autowired
	private SqlSession sqlSession;
	@Override
	public List<BasicDto> listBasic() throws Exception {
		return sqlSession.getMapper(BasicMapper.class).listBasic();
	}
	@Override
	public BasicDto getBasic(String userid, int basicid) throws Exception {
		int user_id = Integer.parseInt(userid);
		return sqlSession.getMapper(BasicMapper.class).getBasic(user_id, basicid);
	}
	@Override
	public void updateBasicStage(BasicStageDto basicStageDto) throws Exception {
		sqlSession.getMapper(BasicMapper.class).updateBasicStage(basicStageDto);
		
	}
	@Override
	public List<BasicDto> listBasic(String user_id) throws Exception {
		return sqlSession.getMapper(BasicMapper.class).listBasicuser(user_id);
	}


}
