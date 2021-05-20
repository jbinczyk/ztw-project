package com.ztw.projekt;

import com.ztw.projekt.configuration.GracefulShutdown;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

@SpringBootApplication
public class FoodDeliveryApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(FoodDeliveryApplication.class, args);
	}

	@Bean
	public GracefulShutdown gracefulShutdown(){
		return new GracefulShutdown();
	}

	@Bean
	public ConfigurableServletWebServerFactory webServerFactory(final GracefulShutdown gracefulShutdown) {
		TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
		factory.addConnectorCustomizers(gracefulShutdown);
		return factory;
	}
}
