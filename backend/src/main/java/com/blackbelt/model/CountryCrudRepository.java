package com.blackbelt.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryCrudRepository extends JpaRepository<CountryDto, String> { 
	
}
