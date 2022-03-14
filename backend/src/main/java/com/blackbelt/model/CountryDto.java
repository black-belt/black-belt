package com.blackbelt.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NonNull;


//@Getter
//@Setter
//@ToString
//@NoArgsConstructor
//@AllArgsConstructor
//@RequiredArgsConstructor

@Entity
@Table(name="country")
@Data
public class CountryDto {
	@NonNull
	@Id
	@Column(name="country_id")
	private String countryId;
	@NonNull 
	@Column(name="country_name")
	private String countryName;
	@Column(name="country_image_path")
	private String countryImagePath;
}
