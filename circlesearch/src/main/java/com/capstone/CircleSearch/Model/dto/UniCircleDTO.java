package com.capstone.CircleSearch.Model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UniCircleDTO {
    private int index;
    private int region_code;
    private int interest_code;
    private String circle_name;
    private String purpose;
    private String url;
    private String manager;
    private String filename;
    private String filepath;
}
