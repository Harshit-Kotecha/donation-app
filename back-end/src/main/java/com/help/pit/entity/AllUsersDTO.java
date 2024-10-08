package com.help.pit.entity;

import com.help.pit.utils.DonationStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AllUsersDTO {
    private User receiverUser;
    private User createrUser;
    private DonationStage donationStage;
}
