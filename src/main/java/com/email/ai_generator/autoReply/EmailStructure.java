package com.email.ai_generator.autoReply;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailStructure {

    private String mailContent ;
    private String tone ;
}
