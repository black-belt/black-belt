package com.blackbelt.model;

import lombok.Data;

@Data
public class PoomsaeDto {
	private String poomsae_id;
	private String poomsae_name;
	private String poomsae_name_e;
	private String poomsae_explain;
	private String poomsae_explain_e;
	private String poomsae_img_path;
	private String poomsae_movie_path;
	
	public PoomsaeDto() {
		super();
	}
	
	public PoomsaeDto(String poomsae_id, String poomsae_name, String poomsae_name_e, String poomsae_explain,
			String poomsae_explain_e, String poomsae_img_path, String poomsae_movie_path) {
		super();
		this.poomsae_id = poomsae_id;
		this.poomsae_name = poomsae_name;
		this.poomsae_name_e = poomsae_name_e;
		this.poomsae_explain = poomsae_explain;
		this.poomsae_explain_e = poomsae_explain_e;
		this.poomsae_img_path = poomsae_img_path;
		this.poomsae_movie_path = poomsae_movie_path;
	}
	
}