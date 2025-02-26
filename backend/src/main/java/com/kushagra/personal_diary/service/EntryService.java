package com.kushagra.personal_diary.service;

import com.kushagra.personal_diary.entity.Entry;
import java.util.List;

public interface EntryService {
    Entry saveEntry(Entry entry);
    List<Entry> getAllEntries();
    Entry getEntryById(Long id);
    void deleteEntry(Long id);
}
