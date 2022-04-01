package com.blackbelt.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserCrudRepository extends JpaRepository<UserDto, String> { 
	
	@Query(value="SELECT * FROM user WHERE user_id = (SELECT max(user_id) FROM user)", nativeQuery = true)
	UserDto findLastUser();
	
	@Query(value="SELECT * FROM user WHERE user_email=:email", nativeQuery = true)
	Optional<UserDto> findByuserEmail(String email);
	
	@Query(value="SELECT * FROM user WHERE user_nick=:nick", nativeQuery = true)
	Optional<UserDto> findByuserNick(String nick);
	
	@Query(value="SELECT * FROM user WHERE user_id=:id", nativeQuery = true)
	Optional<UserDto> findByuserId(String id);
	
	// for User 닉네임 검색 
	List<UserDto> findByuserNickContaining(String search);
	
	//@Query(value="SELECT userTier FROM user WHERE user_nick=:nick", nativeQuery = true)
	//String finduserTierByuserNick(String nick);
	
//	@Modifying
//	@Query(value="update user set user_state = :stateValue WHERE user_id=:userId", nativeQuery = true)
//	int updateState(String userId, String stateValue);
}