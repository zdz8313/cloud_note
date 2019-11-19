package com.oracle.hrb.cloudnote.dao;

import com.oracle.hrb.cloudnote.entity.NoteBookType;

import java.util.List;

public interface NoteBookTypeDao {
    NoteBookType findNormal();
    List<NoteBookType> findSpecial();
}
