package com.blackbelt.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface UserCrudRepository extends JpaRepository<UserDto, String> { 
	//<S extends UserDto> S save(S entity); 
//	@Query(value="SELECT max(user_id) AS user_id FROM user")
//	public UserDto max(String n);
	@Query(value="SELECT * FROM user WHERE user_id = (SELECT max(user_id) FROM user)", nativeQuery = true)
	UserDto findLastUser();
	@Query(value="SELECT * FROM user WHERE user_email=:email", nativeQuery = true)
	Optional<UserDto> findByuserEmail(String email);
	@Modifying
	@Query(value="update user set user_state = :stateValue WHERE user_id=:userId", nativeQuery = true)
	int updateState(String userId, String stateValue);
//	<S extends UserDto> S saveCustom(S entity); 
}