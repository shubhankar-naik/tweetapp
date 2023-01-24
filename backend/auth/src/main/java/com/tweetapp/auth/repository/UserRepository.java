package com.tweetapp.auth.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.tweetapp.auth.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	
	User findByUserName(String userName);
	
	@Query("{},{'userName':1}")
	List<User> findusers();

	List<User> findByUserNameStartsWith(String username);
}