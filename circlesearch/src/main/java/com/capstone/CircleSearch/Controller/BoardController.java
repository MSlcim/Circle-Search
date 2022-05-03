package com.capstone.CircleSearch.Controller;


import com.capstone.CircleSearch.Model.dao.BoardDAO;
import com.capstone.CircleSearch.Model.dao.FindDAO;
import com.capstone.CircleSearch.Model.dto.BoardDTO;
import com.capstone.CircleSearch.Model.dto.ListDTO;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@MapperScan(basePackages = "com.capstone.CircleSearch.Model.dao")
@EnableAutoConfiguration
public class BoardController {

    @Autowired
    private BoardDAO boardDAO;
    @Autowired
    private FindDAO findDAO;

    @RequestMapping(value = "/board", method = RequestMethod.POST)
    public ResponseEntity<BoardDTO> postBoard(BoardDTO board, MultipartFile file) throws Exception {
        if ((board.getId() == null) || (board.getContents() == null) || (board.getTitle() == null)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String projectPath = "/Users/gimminsu/Capstone/Circle-Search/circlesearch/src/main/resources/static/files";
        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);

        board.setFilename(fileName);
        board.setFilepath("/files/"+fileName);
        boardDAO.newBoard(board);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @RequestMapping(value = "/board/{seq}", method = RequestMethod.GET)
    public ResponseEntity<BoardDTO> getBoard(@PathVariable("seq") final int seq) throws Exception {
        BoardDTO param = new BoardDTO();
        param.setSeq(seq);

        boardDAO.addBoardReadCount(param);

        BoardDTO board = boardDAO.getBoard(param);
        if (board == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @RequestMapping(value = "/board/{seq}", method = RequestMethod.PUT)
    public ResponseEntity<BoardDTO> putBoard(@PathVariable("seq") final int seq, BoardDTO param) throws Exception {
        if ((param.getId() == null) || (param.getContents() == null)  || (param.getTitle() == null)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        param.setSeq(seq); // 조회할 게시물 번호 지정
        BoardDTO board = boardDAO.getBoard(param);
        if (board == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        board.setTitle(param.getTitle());
        board.setContents(param.getContents());
        boardDAO.editBoard(board);

        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @RequestMapping(value = "/board/{seq}", method = RequestMethod.DELETE)
    public ResponseEntity<BoardDTO> deleteBoard(@PathVariable("seq") final int seq, BoardDTO param) throws Exception {
        param.setSeq(seq); // 조회할 게시물 번호 지정
        BoardDTO board = boardDAO.getBoard(param);
        if (board == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        board.setDeleted("Y");
        boardDAO.editBoard(board);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/board", method = RequestMethod.GET)
    public ResponseEntity<List> getBoardList(ListDTO param) throws Exception {
        List<BoardDTO> board = boardDAO.getBoardList(param);

        return new ResponseEntity<>(board, HttpStatus.OK);
    }


    @GetMapping("get/boardfile/{seq}")
    public String getBoardfile(@PathVariable("seq") final int seq) throws Exception{
        return findDAO.findBoardfile(seq);
    }
}
