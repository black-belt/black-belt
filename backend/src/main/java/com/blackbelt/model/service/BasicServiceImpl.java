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
		int user_id = Integer.parseInt(basicStageDto.getUser_id());
		int basic_id = Integer.parseInt(basicStageDto.getBasic_id());
		BasicDto basicData = sqlSession.getMapper(BasicMapper.class).getBasic(user_id, basic_id);
		int pre_score = 0;//null이면 0이 들어감.
		if(basicData.getBasic_score() != null) {
			pre_score = Integer.parseInt(basicData.getBasic_score());//현재 값
		}
		int after_score = Integer.parseInt(basicStageDto.getBasic_score());//바꿀 값..

		if(pre_score < after_score) {//바꿀값이 더 크면
			sqlSession.getMapper(BasicMapper.class).levelup(basicStageDto.getUser_id());
			sqlSession.getMapper(BasicMapper.class).updateBasicStage(basicStageDto);
		}
		
		
	}
	@Override
	public List<BasicDto> listBasic(String user_id) throws Exception {
		return sqlSession.getMapper(BasicMapper.class).listBasicuser(user_id);
	}
	@Override
	public String nowlevel(String user_id_str) throws Exception {
		// TODO Auto-generated method stub
		int user_id = Integer.parseInt(user_id_str); 
		return sqlSession.getMapper(BasicMapper.class).nowlevel(user_id);
	}
	
	


}
