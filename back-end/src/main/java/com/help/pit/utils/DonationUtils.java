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

    static public String getDonationMsg(DonationStage donationStage) {
        return switch (donationStage) {
            case open -> "Donation is open now!";
            case processing -> "We are processing this donation for you!";
            case closed ->"This donation is closed now!";
            default -> "Something went wrong!";
        };
    }
}
