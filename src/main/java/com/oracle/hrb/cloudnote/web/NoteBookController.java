package com.oracle.hrb.cloudnote.web;

import com.oracle.hrb.cloudnote.entity.NoteBook;
import com.oracle.hrb.cloudnote.entity.User;
import com.oracle.hrb.cloudnote.service.NoteBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notebook")
public class NoteBookController {
    @Autowired
    private NoteBookService noteBookService;

@GetMapping
    public Object notebookList(HttpSession session){
        User  user = (User) session.getAttribute("user");
        List<NoteBook> special =noteBookService.findSpecial(user.getId());
        List<NoteBook> normal =noteBookService.findNormal(user.getId());
        Map<String,Object> result =new HashMap<>();
        result.put("special",special);
        result.put("normal",normal);
        return  result;
    }
    @GetMapping("/normal")
    public Object normalNotebookList(HttpSession session){
        User  user = (User) session.getAttribute("user");
        List<NoteBook> normal =noteBookService.findNormal(user.getId());
        return  normal;
    }



    @PostMapping
    public Object  addnotebookList(String name , HttpSession session){
        User  user = (User) session.getAttribute("user");
        Map<String ,Object> result =noteBookService.addNotebook(name,user.getId());
        return result;
    }
    @PutMapping
    public Object  updatenotebookList(NoteBook notebook ,HttpSession session){
        User  user = (User) session.getAttribute("user");
        notebook.setUserId(user.getId());
        Map<String ,Object> result =noteBookService.updatenotebook(notebook);
        return result;
    }
    @DeleteMapping
    public void  deletenotebook(String  id){
        noteBookService.deleteNotebook(id);
    }



}
