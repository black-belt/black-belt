package com.blackbelt.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryCrudRepository extends JpaRepository<CountryDto, String> { 
	//<S extends CountryDto> S save(S entity); 
	//Optional<CountryDto> findById(String id);
	//@Query(value = "select country_id AS countryId, country_name AS countryName from Country")
	public List<CountryDto> findAll();
	//void delete(CountryDto entity); 768
	//boolean existsById(String primaryKey); 
}
