package com.capstone.CircleSearch.Controller;

import com.capstone.CircleSearch.Model.dao.CircleDAO;
import com.capstone.CircleSearch.Model.dao.FindDAO;
import com.capstone.CircleSearch.Model.dto.*;
import com.mysql.cj.x.protobuf.MysqlxCrud;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@MapperScan(basePackages = "com.capstone.CircleSearch.Model.dao")
public class CircleController {

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private CircleDAO circleDAO;

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private FindDAO findDAO;

    @PostMapping("/circle/register/CoCircle")
    public int insertCircle(InputCircleDTO inputCircleDTO , MultipartFile file
                            )throws  Exception{
        String projectPath = "/Users/gimminsu/Capstone/Circle-Search/circlesearch/src/main/resources/static/files/Cocircle";
        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);

        FindDTO findDTO = new FindDTO();
        findDTO.setCollege(inputCircleDTO.getCollege());
        findDTO.setInterest(inputCircleDTO.getInterest());
        findDTO.setId(inputCircleDTO.getId());
        int a = findDAO.findCollegecode(findDTO);
        int b = findDAO.findInterestcode(findDTO);
        String c = String.valueOf(findDAO.findUsernickname(findDTO));
        final CoCircleDTO param = new CoCircleDTO(0,a,b, inputCircleDTO.getCircle_name(), inputCircleDTO.getPurpose(), inputCircleDTO.getUrl(),inputCircleDTO.getId(),fileName,"/files/Cocircle/"+fileName);
        circleDAO.storeMyCircle(inputCircleDTO.getId(),inputCircleDTO.getCircle_name(),inputCircleDTO.getUrl());
        return circleDAO.insertCoCircle(param);
        //위의 리턴값에는 동아리 페이지를 만들 유저의 아이디,관리자 등급으로 바로 insert시키는거로 해보자. 

    }


    @PostMapping("/circle/register/UniCircle")
    public int insertUniCircle(InputCircleDTO inputCircleDTO ,MultipartFile file) throws Exception{

        String projectPath = "/Users/gimminsu/Capstone/Circle-Search/circlesearch/src/main/resources/static/files/Unicircle";
        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);


        FindDTO findDTO = new FindDTO();
        findDTO.setInterest(inputCircleDTO.getInterest());
        findDTO.setRegion(inputCircleDTO.getRegion());
        findDTO.setId(inputCircleDTO.getId());
        int a = findDAO.findInterestcode(findDTO);
        int b = findDAO.findRegioncode(findDTO);
        String c = String.valueOf(findDAO.findUsernickname(findDTO));
        final UniCircleDTO param = new UniCircleDTO(0,a,b, inputCircleDTO.getCircle_name(), inputCircleDTO.getPurpose(), inputCircleDTO.getUrl(),inputCircleDTO.getId(),fileName,"/files/Unicircle/"+fileName);
        circleDAO.storeMyCircle(inputCircleDTO.getId(),inputCircleDTO.getCircle_name(),inputCircleDTO.getUrl());
        return circleDAO.insertUniCircle(param);
    }

    @GetMapping("/circle/uni")
    public List<UniCircleDTO> getUniCircle(@RequestParam String interest, @RequestParam String region) throws Exception {
        int iCode;
        int rCode;
        FindDTO findDTO = new FindDTO(region, "", interest, "");
        if (interest != "") {
            iCode = findDAO.findInterestcode(findDTO);
        } else iCode = 0;
        if (region != "") {
            rCode = findDAO.findRegioncode(findDTO);
        } else rCode = 0;
        return circleDAO.selectUniCircle(iCode, rCode);
    }


    //4.	School로 교내동아리 정보 가져오는 API
    @GetMapping("circle/co")
    public List<CoCircleDTO> getCoCircle(@RequestParam String college) throws Exception{
        FindDTO findDTO = new FindDTO();
        findDTO.setCollege(college);
        int a = findDAO.findCollegecode(findDTO);
        return circleDAO.selectCoCircle(a);

    }
    @GetMapping("/check/grade") //관리자 맞으면 Y 아니면 N
    public String checkGrade(@RequestParam String user_id , @RequestParam String circle_name) throws Exception{
       int grade = circleDAO.checkMygrade(user_id,circle_name);
       String manager;
       if (grade == 3 || grade ==2){
           manager = "Y";
       }
       else{
           manager = "N";
       }
       return manager;
    }
    @GetMapping("/check/member") // circle_name입력 --> 회원아이디, 등급 나오는 API
    public List<MyCircleDTO> checkCirclemember(@RequestParam String circle_name) throws Exception{
        return circleDAO.circlemember(circle_name);
    }
    @GetMapping("/check/circlename")
    public List<String> getCircle_name(@RequestParam String user_id) throws Exception{
        return circleDAO.getcirclename(user_id);
    }
    @GetMapping("/check/managecircle")
    public List<String> getMangeCircle(@RequestParam String user_id) throws Exception{
        return circleDAO.getmanagecircle(user_id);
    }
    @PutMapping("/put/usergrade")
    public int putUser_grade(@RequestParam String user_id, @RequestParam String circle_name) throws Exception{
        return circleDAO.editupgrade(user_id,circle_name);
    }
}
