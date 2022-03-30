package com.blackbelt.model.service;

public interface LevelService {

    void levelup(String user_id) throws Exception;

	void tierup(String red_id, String blue_id) throws Exception;

}
