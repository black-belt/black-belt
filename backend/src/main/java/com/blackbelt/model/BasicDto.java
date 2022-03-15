
package com.blackbelt.model;

import lombok.Data;

@Data
public class BasicDto {
	private String BasicId;
	private String BasicName;
	private String BasicNameE;
	private String BasicExplain;
	private String BasicExplainE;
	private String BasicImgPath;
	private String BasicClear;
	private String BasicScore;
	private String BasicLocked;
		
	public BasicDto(String basicId, String basicName, String basicNameE, String basicExplain, String basicExplainE,
			String basicImgPath, String basicClear, String basicScore, String basicLocked) {
		super();
		BasicId = basicId;
		BasicName = basicName;
		BasicNameE = basicNameE;
		BasicExplain = basicExplain;
		BasicExplainE = basicExplainE;
		BasicImgPath = basicImgPath;
		BasicClear = basicClear;
		BasicScore = basicScore;
		BasicLocked = basicLocked;
	}

	public BasicDto() {
		super();
	}
	
}
