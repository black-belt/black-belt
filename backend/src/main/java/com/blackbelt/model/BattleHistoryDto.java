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
@Table(name="judge")
public class BattleHistoryDto {
	@Id@GeneratedValue(strategy = GenerationType.IDENTITY)@Column(name="battlehistory_id")
	private String battleHistoryId;
	private String enemyId;
	private String enemyTier;
	private String enemyTierE;
	private String enemyTierPath;
	private String enemyCountryName;
	private String enemyCountryImagePath;
	private String myTier;
	private String myTierE;
	private String myTierPath;
	private char redWinLoseDraw;
	private char enemyColor;
}
