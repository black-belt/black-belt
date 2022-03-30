package com.blackbelt.model.mapper;

public interface LevelMapper {

	void levelup(String level_id, String user_id) throws Exception;

	int selectlevel(String user_id) throws Exception;

	int maxlevel() throws Exception;

	int getscore(String user_id) throws Exception;

	void updatetier(int tier_id, int user_id) throws Exception;

}
