package com.help.pit.dao;

import com.help.pit.entity.User;
import com.help.pit.entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String name);

    @Query("SELECT new com.help.pit.entity.UserDTO(u.id, u.username, u.fullName, u.phoneNumber) FROM User u WHERE u.id = :id")
    UserDTO findUserDTOById(Integer id);

    @Query("SELECT id FROM User WHERE username = :username")
    Integer getUserId(String username);
}
