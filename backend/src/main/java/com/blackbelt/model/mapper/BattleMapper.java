package com.blackbelt.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.blackbelt.model.BattleHistoryDto;

public interface BattleMapper {
	List<Map<String, Object>> getBattleRoomInfo(BattleHistoryDto battleHistoryDto) throws SQLException;
}
