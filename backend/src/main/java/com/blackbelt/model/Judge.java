package com.blackbelt.model;

import lombok.Data;

@Data
public class Judge {
	private String judge_id;
	private String user_id;
	private String level_id;
	private String judge_ox;
	private String judge_score;
	private String judge_date;
	
	public Judge() {
		super();
	}

	public Judge(String judge_id, String user_id, String level_id, String judge_ox, String judge_score,
			String judge_date) {
		super();
		this.judge_id = judge_id;
		this.user_id = user_id;
		this.level_id = level_id;
		this.judge_ox = judge_ox;
		this.judge_score = judge_score;
		this.judge_date = judge_date;
	}
	
}
