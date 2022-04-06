package com.blackbelt.model.service;


import java.util.*;

import org.springframework.stereotype.Service;

import com.blackbelt.model.UserDto;


public interface QueService {
	public List<UserDto> searchUserList(String search) throws Exception;
	//public String searchUserTier(String userNick) throws Exception;
	
}