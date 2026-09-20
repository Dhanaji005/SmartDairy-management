package com.smartdairy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiAdviceRequest {
    private String topic; // FEED, HEALTH, MILK_YIELD, GENERAL
    private String question;
    private Long cowId; // Optional specific cow reference

    public AiAdviceRequest() {}

    public AiAdviceRequest(String topic, String question, Long cowId) {
        this.topic = topic;
        this.question = question;
        this.cowId = cowId;
    }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public Long getCowId() { return cowId; }
    public void setCowId(Long cowId) { this.cowId = cowId; }
}
