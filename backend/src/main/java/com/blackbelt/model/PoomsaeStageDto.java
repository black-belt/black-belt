package com.blackbelt.model;

import lombok.Data;

@Data
public class PoomsaeStageDto {
	private String user_id;
	private String poomsae_id;
	private String poomsae_score;
	private String poomsae_clear;
	private String poomsae_date;
	private String poomsae_locked;
	
	public PoomsaeStageDto() {
		super();
	}

	public PoomsaeStageDto(String user_id, String poomsae_id, String poomsae_score, String poomsae_clear,
			String poomsae_date, String poomsae_locked) {
		super();
		this.user_id = user_id;
		this.poomsae_id = poomsae_id;
		this.poomsae_score = poomsae_score;
		this.poomsae_clear = poomsae_clear;
		this.poomsae_date = poomsae_date;
		this.poomsae_locked = poomsae_locked;
	}
	
	public PoomsaeStageDto(String user_id, String poomsae_id, String poomsae_score, String poomsae_clear) {
		super();
		this.user_id = user_id;
		this.poomsae_id = poomsae_id;
		this.poomsae_score = poomsae_score;
		this.poomsae_clear = poomsae_clear;
	}
	
	
	
}