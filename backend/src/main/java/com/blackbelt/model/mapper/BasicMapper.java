package com.blackbelt.model.mapper;

import java.util.List;

import com.blackbelt.model.BasicDto;
import com.blackbelt.model.BasicStageDto;

public interface BasicMapper {
	List<BasicDto> listBasic() throws Exception;
	BasicDto getBasic(int user_id, int basicid) throws Exception;
	void updateBasicStage(BasicStageDto basicStageDto) throws Exception;
	List<BasicDto> listBasicuser(String user_id) throws Exception;
	void levelup(String user_id) throws Exception;
	String nowlevel(int user_id) throws Exception;
	
//	UserDto login(Map<String, String> map) throws Exception;
//	
//	int idCheck(String checkId) throws Exception;
//	void registerUser(UserDto UserDto) throws Exception;
//	
//	List<UserDto> listUser() throws Exception;
//	UserDto getUser(String userId) throws Exception;
//	void updateUser(UserDto UserDto) throws Exception;
//	void deleteUser(String userId) throws Exception;
	
}
