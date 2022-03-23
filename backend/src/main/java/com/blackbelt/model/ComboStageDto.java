package com.blackbelt.model;

import lombok.Data;

@Data
public class ComboStageDto {
	private String user_id;
	private String combo_id;
	private String combo_score;
	private String combo_clear;
	private String combo_date;
	private String combo_locked;
	
	public ComboStageDto() {
		super();
	}

	public ComboStageDto(String user_id, String combo_id, String combo_score, String combo_clear, String combo_date,
			String combo_locked) {
		super();
		this.user_id = user_id;
		this.combo_id = combo_id;
		this.combo_score = combo_score;
		this.combo_clear = combo_clear;
		this.combo_date = combo_date;
		this.combo_locked = combo_locked;
	}

	
	
}