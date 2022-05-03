package com.capstone.CircleSearch.Model.dao;

import com.capstone.CircleSearch.Model.dto.FindDTO;

import java.util.HashMap;
import java.util.List;

public interface FindDAO {
    int findInterestcode(FindDTO param) throws Exception;
    int findRegioncode(FindDTO param) throws Exception;
    int findCollegecode(FindDTO param) throws Exception;
    String findUsernickname(FindDTO param) throws Exception;
    String selectCategory1(int interest1) throws Exception;
    String selectCategory2(int interest2) throws Exception;
    int findUserInterest1(String user_id) throws Exception;
    int findUserInterest2(String user_id) throws Exception;
    String findCocircleurl(String circle_name) throws Exception;
    String findUnicircleurl(String circle_name) throws Exception;
    String findBoardfile(int seq) throws Exception;
}
