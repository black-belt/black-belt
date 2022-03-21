package com.blackbelt.model;

import lombok.Data;

@Data
public class BasicDto {
	private String basic_id;
	private String basic_name;
	private String basic_name_e;
	private String basic_explain;
	private String basic_explain_e;
	private String basic_img_path;
	private String basic_clear;
	private String basic_score;
	private String basic_locked;
		

	public BasicDto() {
		super();
	}


	public BasicDto(String basic_id, String basic_name, String basic_name_e, String basic_explain,
			String basic_explain_e, String basic_img_path, String basic_clear, String basic_score,
			String basic_locked) {
		super();
		this.basic_id = basic_id;
		this.basic_name = basic_name;
		this.basic_name_e = basic_name_e;
		this.basic_explain = basic_explain;
		this.basic_explain_e = basic_explain_e;
		this.basic_img_path = basic_img_path;
		this.basic_clear = basic_clear;
		this.basic_score = basic_score;
		this.basic_locked = basic_locked;
	}
	
}
