package com.capstone.CircleSearch.Controller;

import com.capstone.CircleSearch.Model.dao.*;
import com.capstone.CircleSearch.Model.dto.*;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@MapperScan(basePackages = "com.capstone.CircleSearch.Model.dao")
public class UserController {


    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private CircleDAO circleDAO;


    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private UserDAO userDAO;
    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private CheckIdDAO checkIdDAO;
    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private InterestDAO interestDAO;


    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private FindDAO findDAO;

    //로그인 기능
    @PostMapping("/user/login")
    public int userLogin(@RequestBody UserDTO userDTO) throws Exception {

        String pw_stored = checkIdDAO.getLogin(userDTO.getUser_id());
        if(pw_stored.equals(userDTO.getUser_password())) {
            return 1;
        } else {
            return 0;
        }
    }

    //회원가입 1 id,password,email 수정완료
    @PostMapping("/user/register1")
    public ResponseEntity<UserDTO> users(@RequestBody UserDTO userDTO) throws Exception{
        userDAO.insertUsers(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    //ID 중복체크 수정완료
    @GetMapping("/user/register1/checkID")
    public int CheckIDPrimary(@RequestParam(value = "userID", defaultValue = "") String userID) throws Exception{
        return checkIdDAO.checkUserid(userID);
    }


    @GetMapping("/findcode")
    public int findcode(@RequestBody InputUserDTO inputUserDTO) throws Exception{
        FindDTO findDTO = new FindDTO();
        findDTO.setRegion(inputUserDTO.getUser_region());
        return findDAO.findRegioncode(findDTO);
    }

    //Interest 가져오기
    @GetMapping("/user/register2/interest")
    public List<InterestDTO> GetInterestList() throws Exception{
        return interestDAO.selectInterestList();
    }

    //Interest 저장하기 받는거에서 Id도 같이 받아야함. post로 보내는것에 주의
    @PostMapping("/user/register2/interest")
    public int InsertUserInterest(@RequestBody InterestInputDTO interestInputDTO) throws Exception {
        FindDTO find1 = new FindDTO();
        FindDTO find2 = new FindDTO();
        find1.setInterest(interestInputDTO.getUser_interest1());
        find2.setInterest(interestInputDTO.getUser_interest2());
        int a = findDAO.findInterestcode(find1);
        int b = findDAO.findInterestcode(find2);
        UserDTO userDTO = new UserDTO(interestInputDTO.getUser_id(),0,0,a,b,"","","","","");

        return userDAO.insertUsersInterest(userDTO);

    }

    // Register3 제작
    @GetMapping("/user/register3/checkNickname")
    public int CheckNicknamePrimary(@RequestParam(value = "userNickname", defaultValue = "") String userNickname) throws Exception{
        return checkIdDAO.checkUserNickname(userNickname);
    }

    @GetMapping("/user/register3/getCollegeList")
    public List<String> GetCollegeList() throws Exception{
        return checkIdDAO.selectAllCollegeList();
    }
    //region 가져오기
    @GetMapping("/user/register3/getRegionList")
    public List<String> GetRegion() throws Exception{
        return checkIdDAO.selectRegion();
    }
    //Register3 제작 필요 id는 받아오고 닉네임,birth,대학,지역 입력
    @PostMapping("/user/register3")
    public int insertuserinfo(@RequestBody InputUserDTO inputuserDTO) throws Exception{
        FindDTO findDTO = new FindDTO();
        findDTO.setCollege(inputuserDTO.getUser_college());
        findDTO.setRegion(inputuserDTO.getUser_region());
        int a = findDAO.findCollegecode(findDTO);
        int b= findDAO.findRegioncode(findDTO);
        UserDTO userDTO = new UserDTO(inputuserDTO.getUser_id(),a,b,0,0,inputuserDTO.getUser_birth(),"","", inputuserDTO.getUser_nickname(), "");
        return userDAO.insertUsersInfo(userDTO);
    }
    @GetMapping("/user/mycircle")
    public List<HashMap<String,String>> getMyCircle(@RequestParam String user_id) throws Exception{
        return checkIdDAO.getMyCircle(user_id);
    }

    @GetMapping("/user/getInterest/category")
    public String[] selectInterestName(@RequestParam String user_id) throws Exception{
       int interest1= findDAO.findUserInterest1(user_id);
       int interest2 = findDAO.findUserInterest2(user_id);
       String category1 = findDAO.selectCategory1(interest1);
       String category2 = findDAO.selectCategory2(interest2);
       String [] category = new String[2];
        category[0] = category1;
        category[1] = category2;
       return category;
    }

    @GetMapping("/user/getNickname")
    public String getUserNickname(@RequestParam String user_id) throws Exception{
        FindDTO findDTO = new FindDTO(null, null, null, user_id);
        return findDAO.findUsernickname(findDTO);
    }

    @GetMapping("/user/getCollege")
    public String getUserCollege(@RequestParam String user_id) throws Exception{
        FindDTO findDTO = new FindDTO(null, null, null, user_id);
        int code = findDAO.findUserCollege(findDTO);
        return findDAO.findCollegeByCode(code);
    }

    @GetMapping("/collegeName")
    public String getCollegeName(@RequestParam int college_code) throws Exception{
        return findDAO.findCollegeByCode(college_code);
    }
}

