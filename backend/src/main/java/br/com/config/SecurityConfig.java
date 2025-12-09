package br.com.cidadedoidoso.api_idosos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // Permite requisições POST no Postman
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/login/**",
                                "/idosos/**"
                        ).permitAll()  // LIBERA cadastro e login
                        .anyRequest().authenticated() // bloqueia o resto
                )
                .httpBasic(httpSec -> httpSec.disable()) // desativa login básico
                .formLogin(form -> form.disable()); // desativa formulário do Spring

        return http.build();
    }
}
