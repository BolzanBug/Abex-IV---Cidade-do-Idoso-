package br.com.cidadedoidoso.api_idosos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // 🚨 IMPORTANTE: desabilita CSRF para permitir POST do front
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/idosos/**").permitAll() // 👈 libera seu endpoint
                        .anyRequest().permitAll()                  // libera tudo
                )
                .cors(Customizer.withDefaults()); // habilita CORS

        return http.build();
    }
}
