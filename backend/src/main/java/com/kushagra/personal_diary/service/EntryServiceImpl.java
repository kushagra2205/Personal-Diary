package com.kushagra.personal_diary.service;


import com.kushagra.personal_diary.entity.Entry;
import com.kushagra.personal_diary.repository.EntryRepository;
import com.kushagra.personal_diary.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntryServiceImpl implements EntryService {

    @Autowired
    private EntryRepository entryRepository;

    @Override
    public Entry saveEntry(Entry entry) {
        return entryRepository.save(entry);
    }

    @Override
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @Override
    public Entry getEntryById(Long id) {
        return entryRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteEntry(Long id) {
        entryRepository.deleteById(id);
    }
}

