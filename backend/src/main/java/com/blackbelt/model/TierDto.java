package com.blackbelt.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@NoArgsConstructor
@AllArgsConstructor
@Table(name="tier")
public class TierDto {

	private String userId;
	@Column(name = "tier_id")
	private String tierId;
	@Column(name="tier_name")
	private String tierName;
	@Column(name="tier_name_e")
	private String tierNameE;
	@Column(name="tier_img_path")
	private String tierImgPath;
	
}


