package com.blackbelt.model;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BattleCrudRepository extends JpaRepository<BattleHistoryDto, String>{
	@Query(value="SELECT * FROM battlehistory WHERE session_name=:session", nativeQuery = true)
	Optional<BattleHistoryDto> findBysessionName(String session);
}
