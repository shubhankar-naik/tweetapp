package com.tweetapp.tweet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.tweet.exception.AuthorizationException;
import com.tweetapp.tweet.feign.AuthorisingClient;
import com.tweetapp.tweet.model.Tweet;
import com.tweetapp.tweet.model.TweetReply;
import com.tweetapp.tweet.serviceimpl.TweetServiceImpl;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping("/api/v1.0/tweets")
public class TweetController {
	
	@Autowired
	AuthorisingClient authClient;
	
	@Autowired
	TweetServiceImpl service;
	
	@Autowired
	KafkaTemplate<String, String> kafkaTemplate;
	
	String topic="my_logs";
	
	@GetMapping("/all")
	public List<Tweet> getAllTweet(@RequestHeader(value = "Authorization", required = true) String token)  throws AuthorizationException{
		log.info("log.info url get all tweets called");
		if(!authClient.authorizeTheRequest(token)) {
			throw new AuthorizationException("Not allowed");
		}
		log.info("tweets added");
		return service.getAllTweets();	
	}
	
	@PostMapping("/{userName}/add")
	public ResponseEntity<String> addTweet(@RequestHeader(value = "Authorization", required = true) String token,
			@RequestBody Tweet tweet,@PathVariable String userName) throws AuthorizationException{
		log.info("url add tweet called");
		if(!authClient.authorizeTheRequest(token)) {
			throw new AuthorizationException("Not allowed");
		}
		service.addTweet(tweet,userName);
		return new ResponseEntity<>("Tweet added",HttpStatus.OK);
		
	}
	
	@DeleteMapping("/{username}/delete/{id}")
	public ResponseEntity<String> deleteTweet(@RequestHeader(value = "Authorization", required = true) String token,
			@PathVariable String id ) throws AuthorizationException{
		log.info("url delete tweet called");
		if(!authClient.authorizeTheRequest(token)) {
			log.error("Unauthorised token");
			throw new AuthorizationException("Not allowed");
		}
		service.deleteTweet(id);
		return new ResponseEntity<>("Tweet deleted",HttpStatus.OK);
		
	}
	
	@PutMapping("/{username}/update/{id}")
	public ResponseEntity<String> updateTweet(@RequestHeader(value = "Authorization", required = true) String token,
			@PathVariable String id, @RequestBody Tweet tweet ) throws AuthorizationException{
		log.info("url update tweet called "+tweet);
		if(!authClient.authorizeTheRequest(token)) {
			log.error("Unauthorised token");
			throw new AuthorizationException("Not allowed");
		}
		service.updateTweet(id,tweet);
		return new ResponseEntity<>("Tweet updated",HttpStatus.OK);
		
	}
	
	@GetMapping("/{username}")
	public List<Tweet> tweetsOfUsername(@RequestHeader(value = "Authorization", required = true) String token,
			 @PathVariable String username ) throws AuthorizationException{
		log.info("url tweets of username called");
		if(!authClient.authorizeTheRequest(token)) {
			log.error("Unauthorised token");
			throw new AuthorizationException("Not allowed");
		}
		return service.tweetsOfUsername(username);
		
	}
	
	@PostMapping("/{username}/reply/{id}")
	public ResponseEntity<String> replyTweet(@RequestHeader(value = "Authorization", required = true) String token,
			 @PathVariable String username,@PathVariable String id,@RequestBody TweetReply reply ) throws AuthorizationException{
		log.info("url reply to tweet called");
		if(!authClient.authorizeTheRequest(token)) {
			log.error("Unauthorised token");
			throw new AuthorizationException("Not allowed");
		}
		service.reply(id,reply,username);
		return new ResponseEntity<>("replied to tweet",HttpStatus.OK);
	}
	
	@PutMapping("/{username}/like/{id}")
	public ResponseEntity<String> likeTweet(@RequestHeader(value = "Authorization", required = true) String token,
			 @PathVariable String username,@PathVariable String id) throws AuthorizationException{
		log.info("url like tweet called");
		if(!authClient.authorizeTheRequest(token)) {
			log.error("Unauthorised token");
			throw new AuthorizationException("Not allowed");
		}
		
		boolean flag=service.like(id,username);
		String message;
		if(flag) message="liked tweet";
		else message="unliked tweet";
		return new ResponseEntity<>(message,HttpStatus.OK);
	}
}
