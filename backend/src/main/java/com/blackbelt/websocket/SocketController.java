package com.blackbelt.websocket;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.*;
/*
//@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("api/que/select")
public class SocketController {
    private final BattleRoomRepository battleRoomRepository;

    
    
    @GetMapping("")
    public String rooms(Model model, SocketRoomForm form){
        model.addAttribute("rooms",battleRoomRepository.findAllRoom());
        //String userId = form.getUserId();
        //battleRoomRepository.createBattleRoom(userId);
        //model.addAttribute("form",form);
        SocketRoom socketroom = SocketRoom.create(form.getUserId());
        
        return "rooms";
    }

    @GetMapping("/rooms/{id}")
    public String room(@PathVariable String id, Model model){
    	BattleRoom room = battleRoomRepository.findRoomById(id);
        model.addAttribute("room",room);
        return "room";
    }

    @GetMapping("new")		// new앞에 / 붙여주면 thymeleaf 오류 뜸 
    public String make(Model model){
        BattleRoomForm form = new BattleRoomForm();
        model.addAttribute("form",form);	// 방에 이름 추가로 붙여 주는 것 
        return "newRoom";
    }

    @PostMapping("/room/new")
    public String makeRoom(BattleRoomForm form){
    	// body에 데이터 담아서 보내주면 , senderId, recieverId 
        battleRoomRepository.createBattleRoom(form.getSenderId(),form.getRecieverId());
        // 백에서 repository로 방생성 함 
        return "redirect:/api/que/select";
    }
    
    
    


}*/