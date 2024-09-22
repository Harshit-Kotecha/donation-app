package com.help.pit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserDto {
    String fullName;
    String phoneNumber;
}
