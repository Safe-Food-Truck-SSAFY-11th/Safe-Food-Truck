package com.safefoodtruck.sft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableAspectJAutoProxy
@EnableJpaRepositories(basePackages = "com.safefoodtruck.sft")
@EnableRedisRepositories(basePackages = "com.safefoodtruck.sft.redis") public class SftApplication {
	public static void main(String[] args) {
		SpringApplication.run(SftApplication.class, args);
	}

}
