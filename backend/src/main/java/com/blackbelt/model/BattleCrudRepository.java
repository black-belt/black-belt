package com.blackbelt.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BattleCrudRepository extends JpaRepository<BattleHistoryDto, String>{

}
