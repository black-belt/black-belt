package com.blackbelt.model.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.mapper.LevelMapper;

@Service
public class LevelServiceImpl implements LevelService {
	@Autowired
	private SqlSession sqlSession;
	@Override
	public void levelup(String user_id) throws Exception{
		int level = sqlSession.getMapper(LevelMapper.class).selectlevel(user_id);
		int maxlevel = sqlSession.getMapper(LevelMapper.class).maxlevel();
		if(level > maxlevel) { //도전하는 레벨이 max레벨 초과하면 안 됨.
			level = maxlevel;
		}
		
		sqlSession.getMapper(LevelMapper.class).levelup(Integer.toString(level), user_id);
	}
	@Override
	public void tierup(String red_id, String blue_id) throws Exception {
		int red_score = sqlSession.getMapper(LevelMapper.class).getscore(red_id);
		int blue_score = sqlSession.getMapper(LevelMapper.class).getscore(blue_id);
		
		sqlSession.getMapper(LevelMapper.class).updatetier(scoretotier(red_score), Integer.parseInt(red_id));
		sqlSession.getMapper(LevelMapper.class).updatetier(scoretotier(blue_score), Integer.parseInt(blue_id));
	}
	
	private int scoretotier(int score) {
		int result = 0;
		if(score<1000) { //500미만도 그냥 브론즈로 표시?
			result = 1;
		}else if(score>=1000 && score<1500) {
			result = 2;
		}else if(score>=1500 && score<2000) {
			result = 3;
		}else if(score>=2000 && score<2500) {
			result = 4;
		}else if(score>=2500) {
			result = 5;
		}
		return result;
	}
}
