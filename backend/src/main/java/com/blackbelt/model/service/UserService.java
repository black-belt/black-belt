package com.blackbelt.model.service;

import java.util.Map;

public interface UserService {
	Map<String,Object> getUserInfo(String userid) throws Exception;
}
