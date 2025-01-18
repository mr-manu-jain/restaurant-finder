package com.sjsu.cmpe202.finedine.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sjsu.cmpe202.finedine.entity.User;

public interface UserRepository extends MongoRepository<User,String>{

	 Optional<User> findByOid(String oid);

	void deleteByOid(String oid);
}
