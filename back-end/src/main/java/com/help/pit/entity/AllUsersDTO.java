package com.help.pit.entity;

import com.help.pit.utils.DonationStage;
import com.help.pit.utils.IntermediateDonationStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AllUsersDTO {
    private User receiverUser;
    private User createrUser;
    private IntermediateDonationStage intermediateStatus;
    private DonationStage donationStatus;
}
