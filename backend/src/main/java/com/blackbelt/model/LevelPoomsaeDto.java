package com.blackbelt.model;

import lombok.Data;

@Data
public class LevelPoomsaeDto {
	private String level_id;
	private String level_name;
	private String poomsae_id;
	private String is_essential;
	private String poomsae_name;
	private String poomsae_answer;
	private String poomsae_answer_index;
	public LevelPoomsaeDto(String level_id, String level_name, String poomsae_id, String is_essential,
			String poomsae_name, String poomsae_answer, String poomsae_answer_index) {
		super();
		this.level_id = level_id;
		this.level_name = level_name;
		this.poomsae_id = poomsae_id;
		this.is_essential = is_essential;
		this.poomsae_name = poomsae_name;
		this.poomsae_answer = poomsae_answer;
		this.poomsae_answer_index = poomsae_answer_index;
	}
	public LevelPoomsaeDto() {
		super();
	}
}
