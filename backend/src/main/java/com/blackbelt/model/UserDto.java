package com.blackbelt.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
//@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="user")
public class UserDto {
	
	@Id@GeneratedValue(strategy = GenerationType.IDENTITY)@Column(name="user_id")
	private String userId;
	@Column(name="country_id")
	private String countryId;
	@Column(name="user_name")
	private String userName;
	@Column(name="level_id")
	private String levelId;
	@Column(name="tier_id")
	private String tierId;
	@Column(name="user_email")
	private String userEmail;
	@Column(name="user_nick")
	private String userNick;
	@Column(name="user_state")
	private char userState;
	@Column(name="user_delete")
	private char userDelete;
	@Column(name="user_win")
	private String userWin;
	@Column(name="user_lose")
	private String userLose;
	@Column(name="user_draw")
	private String userDraw;
	@Column(name="user_profile_path")
	private String userProfilePath;
	@Column(name="user_score")
	private String userScore;
	@Column(name="user_signup_date")
	private Date userSignupDate;
	@Column(name="user_lv2_date")
	private Date userLv2Date;
	@Column(name="user_lv3_date")
	private Date userLv3Date;
	@Column(name="user_lv4_date")
	private Date userLv4Date;
	@Column(name="default_lang")
	private char defaultLang;
}
