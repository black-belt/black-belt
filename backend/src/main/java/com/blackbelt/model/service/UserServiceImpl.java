package com.blackbelt.model.service;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blackbelt.model.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public Map<String, Object> getUserInfo(String userid) throws Exception {
		return sqlSession.getMapper(UserMapper.class).getUserInfo(userid);
	}

}
