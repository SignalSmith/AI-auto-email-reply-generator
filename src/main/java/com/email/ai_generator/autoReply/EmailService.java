package com.email.ai_generator.autoReply;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class EmailService {

     private final WebClient webClient ;
    @Value("${spring.api.url}")
    private String geminiUrl ;
    @Value("${spring.api.key}")
    private String geminiKey ;

    public EmailService(WebClient.Builder  webClient) {
        this.webClient = webClient.build();
    }

    public String resultReply(EmailStructure emailStructure){

        //create a prompt
        String prompt = CreateProompt(emailStructure) ;
        //craft a request
        Map<String ,Object> emailRequest = Map.of("contents", new Object[]{
                                         Map.of("parts" , new Object[]{
                                                 Map.of("text", prompt)
                                         })
        }) ;
        //do the request and generate a response
        String response  = webClient.post()
                .uri(geminiUrl)
                .header("x-goog-api-key" , geminiKey)
                .header("Content-Type" , "Application/json")
                .bodyValue(emailRequest)
                .retrieve()
                .bodyToMono(String.class)
                .block() ;

        // extract the response and return it
        return extractResponse(response) ;
    }

    public String extractResponse(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(response);

            return node.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "the error msg is : " + e.getMessage();
        }
    }

    public String CreateProompt (EmailStructure emailStructure){

         StringBuilder prompt = new StringBuilder() ;
         prompt.append("generate one professional reply for the following email content ") ;
         if(emailStructure.getTone()!= null && !emailStructure.getTone().isEmpty() ){
             prompt.append("use a tone " + emailStructure.getTone()) ;
         }
         prompt.append("\n The original email content is \n" + emailStructure.getMailContent()) ;
         return prompt.toString() ;

    }


}
