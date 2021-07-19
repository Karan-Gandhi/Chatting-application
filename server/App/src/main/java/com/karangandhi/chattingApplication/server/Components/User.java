package com.karangandhi.chattingApplication.server.Components;

import java.util.Objects;
import java.util.UUID;

public class User {
    public String id;
    public String displayName, username, password, email;

    public User() {
        this.id = UUID.randomUUID().toString();
        this.displayName = "";
        this.username = "";
        this.password = "";
        this.email = "";
    }

    public User(String displayName, String username, String password, String email) {
        this.id = UUID.randomUUID().toString();
        this.displayName = displayName;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public User(String id, String displayName, String username, String password, String email) {
        this.id = id;
        this.displayName = displayName;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(password, user.password) && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, displayName, username, password, email);
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", displayName='" + displayName + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
