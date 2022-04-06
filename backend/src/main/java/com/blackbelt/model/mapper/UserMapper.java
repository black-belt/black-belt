package com.blackbelt.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.blackbelt.model.UserDto;

public interface UserMapper {

	Map<String, Object> getUserInfo(String userid) throws SQLException;
}
