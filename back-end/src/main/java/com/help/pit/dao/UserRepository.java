package com.help.pit.dao;

import com.help.pit.entity.User;
import com.help.pit.entity.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String name);

    UserProjection findProjectedByUsername(String name);
}
