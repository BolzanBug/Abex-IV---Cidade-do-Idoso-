package br.com.cidadedoidoso.api_idosos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // Desativa CSRF para permitir POST no Postman

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/login/**",
                                "/idosos/**"
                        ).permitAll() // LIBERA login e cadastro
                        .anyRequest().authenticated() // protege o resto
                )

                .httpBasic(httpSec -> httpSec.disable()) // desativa auth padrão
                .formLogin(form -> form.disable()); // desativa formulário

        return http.build();
    }
}
