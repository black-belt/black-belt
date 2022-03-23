package com.blackbelt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.ComboDto;
import com.blackbelt.model.service.ComboService;

@RestController
@RequestMapping("api/combo")
public class ComboController {
	
	@Autowired
	private ComboService comboService;
	
	//@GetMapping("") ///api/combo/:comboid
	
	@GetMapping("")
	public ResponseEntity<List<ComboDto>> getCombos() throws Exception {
		List<ComboDto> result = comboService.listCombo();
		return ResponseEntity.status(200).body(result);
	}
	@GetMapping("/{comboid}")
	public ResponseEntity<ComboDto> getCombo(@PathVariable("comboid") int comboid) throws Exception {
		ComboDto result = comboService.getCombo(comboid);// getCombo(comboid);
		return ResponseEntity.status(200).body(result);
	}
	
	
}
