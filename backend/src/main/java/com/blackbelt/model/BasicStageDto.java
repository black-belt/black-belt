package com.blackbelt.model;

import lombok.Data;

@Data
public class BasicStageDto {
	String user_id;
	String basic_id;
	String basic_score;
	String basic_clear;
	public BasicStageDto(String user_id, String basic_id, String basic_score, String basic_clear) {
		super();
		this.user_id = user_id;
		this.basic_id = basic_id;
		this.basic_score = basic_score;
		this.basic_clear = basic_clear;
	}
	public BasicStageDto() {
		super();
	}
}
