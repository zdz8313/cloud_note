package com.oracle.hrb.cloudnote.service;

import com.oracle.hrb.cloudnote.dao.NoteBookDao;
import com.oracle.hrb.cloudnote.dao.NoteBookTypeDao;
import com.oracle.hrb.cloudnote.entity.NoteBook;
import com.oracle.hrb.cloudnote.entity.NoteBookType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class NoteBookService {
    @Autowired
    private NoteBookDao noteBookDao;
    @Autowired
    private NoteBookTypeDao noteBookTypeDao;


    @Transactional
    public List<NoteBook> findSpecial(String userId){
    return  noteBookDao.findByUserSpecial(userId);
    }
    @Transactional

    public List<NoteBook> findNormal(String userId){
        return  noteBookDao.findByUserNormal(userId);
    }
    @Transactional
     public void deleteNotebook (String id){
        noteBookDao.delete(id);
    }
    @Transactional
    public Map<String,Object> addNotebook(String notebookName,String userId ){
        Map<String,Object> result =new HashMap<>();
        if (notebookName == null || notebookName.trim().length()==0){
            result.put("success",false);
            result.put("name_null",true);
            return result;
        }
        NoteBook nb =new NoteBook();
        nb.setName(notebookName);
        nb.setUserId(userId);
        NoteBook noteBook =noteBookDao.findByName(nb);
        if (noteBook != null){
            result.put("success",false);
            result.put("name_repeat",true);
            return  result;
        }
        nb.setName(nb.getName().trim());
        nb.setId(UUID.randomUUID().toString());
        nb.setCreateTime(new Date());
        NoteBookType noteBookType =noteBookTypeDao.findNormal();
        nb.setNotebookTypeId(noteBookType.getId());
        noteBookDao.add(nb);
        result.put("success",true);
        result.put("notebook",nb);
        return result;
    }
    @Transactional
    public  Map<String ,Object> updatenotebook(NoteBook nb){
        Map<String,Object> result =new HashMap<>();
        if (nb.getName() == null || nb.getName().trim().length()==0){
            result.put("success",false);
            result.put("name_null",true);
            return result;
        }
        NoteBook noteBook =noteBookDao.findByName(nb);
        if (noteBook != null){
            result.put("success",false);
            result.put("name_repeat",true);
            return  result;
        }
        noteBookDao.update(nb);
        result.put("success",true);
        return  result;
    }

    @Transactional
    public  void initSpacialNotebook(String userId){
        List<NoteBookType> nbts =noteBookTypeDao.findSpecial();
        for (NoteBookType nbt : nbts){
            NoteBook nb =new NoteBook();
            nb.setName(nbt.gettDesc());
            nb.setNotebookTypeId(nbt.getId());
            nb.setCreateTime(new Date());
            nb.setId(UUID.randomUUID().toString());
            nb.setUserId(userId);
            noteBookDao.add(nb);
        }
    }
}
