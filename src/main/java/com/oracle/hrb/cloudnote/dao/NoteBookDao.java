package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.NoteBook;

import java.util.List;

public interface NoteBookDao {
    void  add(NoteBook noteBook);
    void  update(NoteBook noteBook);
    void delete(String id);
    List<NoteBook> finadByUserSpecial(String userId);
    List<NoteBook> findByUserNormal(String userId);

}
