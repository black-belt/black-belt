package com.blackbelt.model;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.*;


@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Entity
@Table(name="country")
public class CountryDto {
	
	@Id@Column(name="country_id")
	private String countryId;
	@NonNull 
	@Column(name="country_name")
	private String countryName;
	@Column(name="country_image_path")
	private String countryImagePath;
//	@OneToMany(mappedBy = "countryId", fetch = FetchType.LAZY)
//	private Set<UserDto> userList = new LinkedHashSet<>(); // 굳이 필요 없을꺽 같아서 주석걸어둠 나중에도 안쓰면 제거
}
