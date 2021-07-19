package com.karangandhi.chattingApplication.server;


import com.google.firebase.auth.FirebaseAuthException;
import com.karangandhi.chattingApplication.server.Routes.loginWithEmailAndPassword;
import com.karangandhi.chattingApplication.server.Services.FirebaseAuthService;
import com.karangandhi.chattingApplication.server.Services.FirebaseService;
import com.karangandhi.chattingApplication.server.Services.FirestoreService;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.ExecutionException;

public class App {
    public static void main(String[] args){
        final int PORT = 5000;
        try {
            FirebaseService.InitializeApp();
            FirestoreService.Init();
            FirebaseAuthService.Init();

            HttpServer httpServer = HttpServer.create(new InetSocketAddress(PORT), 0);
            System.out.println("Server started at: " + PORT);

            httpServer.createContext("/loginWithEmailAndPassword" , new loginWithEmailAndPassword());


            httpServer.start();
        } catch (IOException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
