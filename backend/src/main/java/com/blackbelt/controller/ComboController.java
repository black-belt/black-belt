package com.blackbelt.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blackbelt.model.ComboDto;
import com.blackbelt.model.PoomsaeDto;
import com.blackbelt.model.service.ComboService;

@RestController
@RequestMapping("api/combo")
public class ComboController {
	
	@Autowired
	private ComboService comboService;
	
	//@GetMapping("") ///api/combo/:comboid
	
	//@SuppressWarnings("null")
	@GetMapping("")
	public ResponseEntity<List<Map<String, Object>>> getCombos() throws Exception {
		//나중에 token값 유효여부만 판단하면 됨. id가 쓰이진 않을듯??
		
		List<PoomsaeDto> poomsaelist = comboService.getPoomsae();
		
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		//result.put("");

		for(PoomsaeDto poomsae: poomsaelist) {
			System.out.println("getCombos1");
			
			Map<String, Object> map = new HashMap<String, Object>();
			System.out.println("getCombos2");
			
			String poomsae_id = poomsae.getPoomsae_id();
			String poomsae_name = poomsae.getPoomsae_name();
			String poomsae_name_e = poomsae.getPoomsae_name_e();
			
			System.out.println("getCombos3");
			map.put("poomsae_id", poomsae_id);
			map.put("poomsae_name", poomsae_name);
			map.put("poomsae_name_e", poomsae_name_e);
			System.out.println("getCombos4");
			List<ComboDto> combolist = comboService.listCombo(Integer.parseInt(poomsae_id));
			System.out.println("getCombos5");
			map.put("comboList", combolist);
			System.out.println("getCombos6");
			result.add(map);
			System.out.println("getCombos7");
			System.out.println("map:"+map);
			System.out.println("getCombos8");
			System.out.println("result: "+result.toString());
		}

		
		
		
		return ResponseEntity.status(200).body(result);
	}
	@GetMapping("/{comboid}")
	public ResponseEntity<ComboDto> getCombo(@PathVariable("comboid") int comboid) throws Exception {
		ComboDto result = comboService.getCombo(comboid);// getCombo(comboid);
		return ResponseEntity.status(200).body(result);
	} 
	
	
	
	
}
