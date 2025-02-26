package com.kushagra.personal_diary.controller;

import com.kushagra.personal_diary.entity.Entry;
import com.kushagra.personal_diary.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "*")  // Allow frontend to connect
public class EntryController {

    @Autowired
    private EntryService entryService;

    @PostMapping
    public Entry createEntry(@RequestBody Entry entry) {
        return entryService.saveEntry(entry);
    }

    @GetMapping
    public List<Entry> getAllEntries() {
        return entryService.getAllEntries();
    }

    @GetMapping("/{id}")
    public Entry getEntryById(@PathVariable Long id) {
        return entryService.getEntryById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        entryService.deleteEntry(id);
    }
}


