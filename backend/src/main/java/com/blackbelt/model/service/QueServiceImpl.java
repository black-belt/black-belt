package com.blackbelt.model.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blackbelt.model.UserCrudRepository;
import com.blackbelt.model.UserDto;
import com.blackbelt.util.JwtTokenProvider;

@Service
public class QueServiceImpl implements QueService{

	//private QueRepository queRepository;
	@Autowired
	private UserCrudRepository userCrudRepository;
	
	@Transactional
	public List<UserDto> searchUserList(String search){
		List<UserDto> user = userCrudRepository.findByuserNickContaining(search);	// Containing 포함하면 다중검색 가능 

		
		return user;
	}
}
