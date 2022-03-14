package com.blackbelt.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.CountryCrudRepository;
import com.blackbelt.model.CountryDto;

import lombok.RequiredArgsConstructor;


//회원 처리용 controller
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	CountryCrudRepository countryRepo;
	
	@GetMapping("/country")
	public ResponseEntity<List<CountryDto>> getCountries() {
		ResponseEntity<List<CountryDto>> re = null;
		try {
			List<CountryDto> clist = countryRepo.findAll();
			
			System.out.println(clist.get(0));
		  if(clist != null) {
			  re = new ResponseEntity<List<CountryDto>>(clist, HttpStatus.OK);
		  }
		} catch (Exception e) {
			re = new ResponseEntity<List<CountryDto>>(new ArrayList<CountryDto>(), HttpStatus.INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}		
		return re;
	}
}
