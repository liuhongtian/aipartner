package com.huawei.aipartner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AipartnerApplication  implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(AipartnerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("AI Partner powered by Huawei Shiji is running!");
	}

}
