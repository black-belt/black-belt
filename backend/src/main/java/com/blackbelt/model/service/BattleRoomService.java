package com.blackbelt.model.service;

import java.util.List;
import java.util.Map;

import com.blackbelt.model.BattleHistoryDto;

public interface BattleRoomService {
	List<Map<String, Object>> getBattleRoomInfo(BattleHistoryDto battleHistoryDto) throws Exception;
}
