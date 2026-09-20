package com.smartdairy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiAdviceResponse {
    private String summary;
    private String recommendation;
    private List<String> actionableTips;
    private String disclaimer;

    public AiAdviceResponse() {}

    public AiAdviceResponse(String summary, String recommendation, List<String> actionableTips, String disclaimer) {
        this.summary = summary;
        this.recommendation = recommendation;
        this.actionableTips = actionableTips;
        this.disclaimer = disclaimer;
    }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

    public List<String> getActionableTips() { return actionableTips; }
    public void setActionableTips(List<String> actionableTips) { this.actionableTips = actionableTips; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}
