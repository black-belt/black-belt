package com.blackbelt.model;

import lombok.Data;

@Data
public class PoomsaeDto {
	private String poomsae_id;
	private String poomsae_name;
	private String poomsae_name_e;
	private Object poomsae_explain;
	private Object poomsae_explain_e;
	private String poomsae_img_path;
	private String poomsae_movie_path;
	private String poomsae_clear;
	private String poomsae_score;
	private String poomsae_locked;
	private Object poomsae_answer;
	private Object poomsae_answer_index;
	private String poomsae_desc;
	private String poomsae_desc_e;
	
	public PoomsaeDto() {
		super();
	}
	
	public PoomsaeDto(String poomsae_id, String poomsae_name, String poomsae_name_e, Object poomsae_explain,
			Object poomsae_explain_e, String poomsae_img_path, String poomsae_movie_path) {

		this.poomsae_id = poomsae_id;
		this.poomsae_name = poomsae_name;
		this.poomsae_name_e = poomsae_name_e;
		this.poomsae_explain = poomsae_explain;
		this.poomsae_explain_e = poomsae_explain_e;
		this.poomsae_img_path = poomsae_img_path;
		this.poomsae_movie_path = poomsae_movie_path;
	}
	
	public PoomsaeDto(String poomsae_id, String poomsae_name, String poomsae_name_e) {

		this.poomsae_id = poomsae_id;
		this.poomsae_name = poomsae_name;
		this.poomsae_name_e = poomsae_name_e;
	}
	
	public PoomsaeDto(String poomsae_id, String poomsae_name, String poomsae_name_e, Object poomsae_explain,
			Object poomsae_explain_e, String poomsae_img_path, String poomsae_movie_path,
			String poomsae_clear, String poomsae_score, String poomsae_locked) {
		this.poomsae_id = poomsae_id;
		this.poomsae_name = poomsae_name;
		this.poomsae_name_e = poomsae_name_e;
		this.poomsae_explain = poomsae_explain;
		this.poomsae_explain_e = poomsae_explain_e;
		this.poomsae_img_path = poomsae_img_path;
		this.poomsae_movie_path = poomsae_movie_path;
		this.poomsae_clear = poomsae_clear;
		this.poomsae_score = poomsae_score;
		this.poomsae_locked = poomsae_locked;
	}
	
	public PoomsaeDto(String poomsae_id, String poomsae_name, String poomsae_name_e, Object poomsae_explain,
			Object poomsae_explain_e, String poomsae_img_path, String poomsae_movie_path,
			Object poomsae_answer, Object poomsae_answer_index) {
		this.poomsae_id = poomsae_id;
		this.poomsae_name = poomsae_name;
		this.poomsae_name_e = poomsae_name_e;
		this.poomsae_explain = poomsae_explain;
		this.poomsae_explain_e = poomsae_explain_e;
		this.poomsae_img_path = poomsae_img_path;
		this.poomsae_movie_path = poomsae_movie_path;
		this.poomsae_answer = poomsae_answer;
		this.poomsae_answer_index = poomsae_answer_index;
	}

	public PoomsaeDto(String poomsae_id, String poomsae_name, String poomsae_name_e, Object poomsae_explain,
			Object poomsae_explain_e, String poomsae_img_path, String poomsae_movie_path, String poomsae_clear,
			String poomsae_score, String poomsae_locked, Object poomsae_answer, Object poomsae_answer_index,
			String poomsae_desc, String poomsae_desc_e) {
		this.poomsae_id = poomsae_id;
		this.poomsae_name = poomsae_name;
		this.poomsae_name_e = poomsae_name_e;
		this.poomsae_explain = poomsae_explain;
		this.poomsae_explain_e = poomsae_explain_e;
		this.poomsae_img_path = poomsae_img_path;
		this.poomsae_movie_path = poomsae_movie_path;
		this.poomsae_clear = poomsae_clear;
		this.poomsae_score = poomsae_score;
		this.poomsae_locked = poomsae_locked;
		this.poomsae_answer = poomsae_answer;
		this.poomsae_answer_index = poomsae_answer_index;
		this.poomsae_desc = poomsae_desc;
		this.poomsae_desc_e = poomsae_desc_e;
	}
}