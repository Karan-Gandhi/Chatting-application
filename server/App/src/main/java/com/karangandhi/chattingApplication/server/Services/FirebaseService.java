package com.karangandhi.chattingApplication.server.Services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;
import java.io.IOException;

public class FirebaseService {
    public static FirebaseApp app;
    public static final boolean verbose = true;

    public static void InitializeApp() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("src/secrets/chatting-application-cdb32-firebase-adminsdk-1afzn-cc12caba48.json");
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        app = FirebaseApp.initializeApp(options, "Chatting-Application");
    }
}
