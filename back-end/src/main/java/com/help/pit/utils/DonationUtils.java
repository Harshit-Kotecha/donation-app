package com.help.pit.utils;

public class DonationUtils {
    static public DonationStage getDonationStage(String stage) {
        return switch (stage) {
            case "open" -> DonationStage.open;
            case "closed" -> DonationStage.closed;
            case "processing" -> DonationStage.processing;
            default -> null;
        };
    }
}
