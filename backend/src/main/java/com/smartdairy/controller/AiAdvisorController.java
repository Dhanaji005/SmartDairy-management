package com.smartdairy.controller;

import com.smartdairy.dto.AiAdviceRequest;
import com.smartdairy.dto.AiAdviceResponse;
import com.smartdairy.service.AiAdvisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiAdvisorController {

    @Autowired
    private AiAdvisorService aiAdvisorService;

    @PostMapping("/advise")
    public AiAdviceResponse getAiAdvice(@RequestBody AiAdviceRequest request) {
        return aiAdvisorService.generateAdvice(request);
    }
}
