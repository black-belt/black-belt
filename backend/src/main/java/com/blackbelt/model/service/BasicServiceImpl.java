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
	public List<BasicDto> getBasic(int basicid) throws Exception {
		return sqlSession.getMapper(BasicMapper.class).getBasic(basicid);
	}
	@Override
	public void updateBasicStage(BasicStageDto basicStageDto) throws Exception {
		sqlSession.getMapper(BasicMapper.class).updateBasicStage(basicStageDto);
		
	}


}
