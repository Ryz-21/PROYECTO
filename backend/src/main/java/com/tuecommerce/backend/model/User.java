package com.tuecommerce.backend.model;

import jakarta.persistence.*; // Usa jakarta.persistence si usas Spring Boot 3+

@Entity
@Table(name = "users") // Buena práctica nombrar tablas en plural
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username; // O email, dependiendo de tu estrategia de login
    private String password; // Contraseña ENCRIPTADA

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}