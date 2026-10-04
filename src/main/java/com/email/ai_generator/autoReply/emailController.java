package com.email.ai_generator.autoReply;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
//@CrossOrigin(origins = "https://mail.google.com")
@CrossOrigin(origins = "http://localhost:4200/")
public class emailController {

     private final EmailService emailService ;

    @PostMapping()
    public ResponseEntity<String> generatereply(@RequestBody EmailStructure emailStructure){
        return ResponseEntity.ok(emailService.resultReply(emailStructure)) ;
    }
}
