package com.smartdairy.service;

import com.smartdairy.dto.AiAdviceRequest;
import com.smartdairy.dto.AiAdviceResponse;
import com.smartdairy.model.Cow;
import com.smartdairy.repository.CowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AiAdvisorService {

    @Autowired
    private CowRepository cowRepository;

    public AiAdviceResponse generateAdvice(AiAdviceRequest request) {
        String topic = request.getTopic() != null ? request.getTopic().toUpperCase() : "GENERAL";
        String question = request.getQuestion() != null ? request.getQuestion().toLowerCase() : "";

        String cowInfo = "";
        if (request.getCowId() != null) {
            Cow cow = cowRepository.findById(request.getCowId()).orElse(null);
            if (cow != null) {
                cowInfo = " for " + cow.getName() + " (Tag: " + cow.getTagNumber() + ", Breed: " + cow.getBreed() + ", Stage: " + cow.getLactationStage() + ")";
            }
        }

        AiAdviceResponse response = new AiAdviceResponse();
        response.setDisclaimer("AI recommendations are based on standard dairy veterinary best practices. Always consult a licensed local veterinarian for clinical diagnoses.");

        if (topic.contains("FEED") || question.contains("feed") || question.contains("chara") || question.contains("diet")) {
            response.setSummary("Optimal Feeding & Balanced Ration Strategy" + cowInfo);
            response.setRecommendation("Maintain a 2:1 dry matter ratio of high-grade green fodder to dry roughage, supplemented with 1kg balanced concentrate per 2.5L of milk output.");
            response.setActionableTips(Arrays.asList(
                    "Include 50-100g of mineral mixture daily to prevent reproductive and metabolic disorders.",
                    "Ensure continuous access to cool, fresh drinking water (lactating cows need 70-100L daily).",
                    "Feed legumes (Berseem/Lucerne) mixed with non-legumes (Maize/Sorghum) to balance rumen protein digestion."
            ));
        } else if (topic.contains("MILK") || question.contains("yield") || question.contains("fat") || question.contains("increase")) {
            response.setSummary("Milk Yield & Fat Percentage Optimization" + cowInfo);
            response.setRecommendation("Optimize milking routines with strict 12-hour intervals and maintain consistent pre-milking udder stimulation to maximize oxytocin release.");
            response.setActionableTips(Arrays.asList(
                    "Increase bypass fat or cottonseed cake in feed to naturally improve milk Fat and SNF percentages.",
                    "Avoid sudden diet changes; transition feed components gradually over 7 to 10 days.",
                    "Ensure comfortable bedding with dry sand or rubber mats to boost rumination rest time (target: 12-14 hrs/day)."
            ));
        } else if (topic.contains("HEALTH") || question.contains("fever") || question.contains("mastitis") || question.contains("vaccine")) {
            response.setSummary("Veterinary Health & Preventative Protocol" + cowInfo);
            response.setRecommendation("Strict hygiene protocols are essential. Practice post-milking teat dipping using iodine solution to eliminate 90% of environmental mastitis risks.");
            response.setActionableTips(Arrays.asList(
                    "Conduct California Mastitis Test (CMT) strip cup checks weekly for early sub-clinical detection.",
                    "Maintain mandatory semi-annual Foot & Mouth Disease (FMD) and Hemorrhagic Septicemia (HS) vaccination logs.",
                    "Isolate sick animals immediately and monitor rectal temperature (normal range: 101.5°F - 102.5°F / 38.6°C - 39.2°C)."
            ));
        } else {
            response.setSummary("Smart Dairy Farm Management Insights" + cowInfo);
            response.setRecommendation("Consistent record keeping of daily yield, feed cost per liter, and proactive vaccination schedules maximizes farm profitability.");
            response.setActionableTips(Arrays.asList(
                    "Track dry periods (aim for 60 days before calving) for udder regeneration.",
                    "Review monthly Feed Conversion Ratio (FCR) against milk revenue.",
                    "Leverage regular deworming before monsoon and summer seasons."
            ));
        }

        return response;
    }
}
