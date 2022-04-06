package com.blackbelt.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Entity
@Table(name="battlehistory")
public class BattleHistoryDto {
	@Id@GeneratedValue(strategy = GenerationType.IDENTITY)@Column(name="battlehistory_id")
	private String battleHistoryId;
	@Column(name = "user_blue_id")
	private String enemyId;
	@Column(name = "blue_tier_id")
	private String enemyTierId;
	@Column(name = "blue_country_id")
	private String enemyCountryId;
	@Column(name = "user_red_id")
	private String myId;
	@Column(name = "red_tier_id")
	private String myTierId;
	@Column(name = "red_country_id")
	private String myCountryId;
	@Column(name = "red_win_lose_draw")
	private char redWinLoseDraw;
	@Column(name = "end_time")
	private Date endTime;
	@Column(name = "session_name")
	private String sessionName;
	private char winLoseDraw;
	private char enemyColor;
}
