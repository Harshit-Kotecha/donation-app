package com.help.pit.utils;

import com.help.pit.entity.User;
import com.help.pit.entity.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SnGMapper {
    UserDTO toUserDTO(User user);
}
