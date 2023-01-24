package com.tweetapp.auth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tweetapp.auth.model.User;
import com.tweetapp.auth.repository.UserRepository;

@SpringBootTest
class JwtUserDetailsServiceTest {
	
	@Mock
	private UserRepository userDao;

	@Mock
	private PasswordEncoder bcryptEncoder;

	@InjectMocks
	private JwtUserDetailsService service;
	
	
	@BeforeEach
	void setUp() throws Exception {
	}

	@Test
	void loadUserByUserNameShouldThrowExceptionTest() {
		when(userDao.findByUserName("wrongUserName")).thenReturn(null);
		assertThatThrownBy(() -> service.loadUserByUsername("wrongUserName")) 
        .isInstanceOf(UsernameNotFoundException.class)
        .hasMessage("User not found with username: wrongUserName");
		verify(userDao, Mockito.times(1)).findByUserName("wrongUserName");
	}
	
	@Test
	void loadUserByUserNameShouldUserNameTest() {
		when(userDao.findByUserName("user")).thenReturn(new User("user", "pass", "firstname","lastname","a@b.com","0987676543"));
		assertThat(service.loadUserByUsername("user")).isNotNull();
		verify(userDao, Mockito.times(1)).findByUserName("user");
	}

}
