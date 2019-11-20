package com.oracle.hrb.cloudnote.web;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notebook")
public class NoteBookController {
@GetMapping
    public Object notebookList(){
        System.out.println("获取笔记本");
        return null;
    }
    @PostMapping
    public Object  addnotebookList(){
        System.out.println("添加笔记本");
        return null;
    }
    @PutMapping
    public Object  updatenotebookList(){
        System.out.println("修改笔记本");
        return null;
    }
    @DeleteMapping
    public Object  deletenotebookList(){
        System.out.println("删除笔记本");
        return null;
    }
}
