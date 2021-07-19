package com.karangandhi.chattingApplication.server.Services;

import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.utilities.Pair;
import com.karangandhi.chattingApplication.server.Components.User;

import javax.annotation.processing.SupportedSourceVersion;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static com.karangandhi.chattingApplication.server.Services.FirebaseService.app;

public class FirebaseAuthService {
    public static FirebaseAuth auth;
    public static ArrayList<User> users = new ArrayList<>();

    // initialize the service
    public static void Init() throws ExecutionException, InterruptedException {
        auth = FirebaseAuth.getInstance(app);
        // just populate the users in the local storage so it minimise the checks to the online database
        List<QueryDocumentSnapshot> users = FirestoreService.getCollectionSnapshot("users");
        for (QueryDocumentSnapshot user : users) {
            FirebaseAuthService.users.add(user.toObject(User.class));
        }
    }

    public static Pair<UserRecord, WriteResult> createUser(User user) throws FirebaseAuthException, ExecutionException, InterruptedException {
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(user.email)
                .setUid(user.id)
                .setDisplayName(user.displayName)
                .setPassword(user.password)
                .setEmailVerified(false);

        UserRecord record = auth.createUser(request);
        WriteResult result = FirestoreService.addData("users", user.id.toString(), user);
        users.add(user);
        return new Pair<>(record, result);
    }

    public static String signInWithEmailAndPassword(String email, String password) throws FirebaseAuthException {
        User found = null;
        try {
            for (User user : FirebaseAuthService.users) {
                if (user.email.equalsIgnoreCase(email) && user.password.equals(password)) {
                    found = user;
                    break;
                }
            }
            if (found == null) {
                List<QueryDocumentSnapshot> users = FirestoreService.getCollectionSnapshot("users");
                for (QueryDocumentSnapshot userDocumentSnapshot : users) {
                    User user = userDocumentSnapshot.toObject(User.class);
                    if (user.email.equalsIgnoreCase(email) && user.password.equals(password)) {
                        found = user;
                        break;
                    }
                }
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
        return found == null ? "" : auth.createCustomToken(found.id.toString());
    }

    public static String signInWithUsernameAndPassword(String username, String password) throws FirebaseAuthException {
        User found = null;
        try {
            for (User user : FirebaseAuthService.users) {
                if (user.username.equalsIgnoreCase(username) && user.password.equals(password)) {
                    found = user;
                    break;
                }
            }
            // check the database for the user in case it is not updated in the local storage
            if (found == null) {
                List<QueryDocumentSnapshot> users = FirestoreService.getCollectionSnapshot("users");
                for (QueryDocumentSnapshot userDocumentSnapshot : users) {
                    User user = userDocumentSnapshot.toObject(User.class);
                    if (user.username.equalsIgnoreCase(username) && user.password.equals(password)) {
                        found = user;
                        break;
                    }
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return found == null ? "" : auth.createCustomToken(found.id.toString());
    }

    public static Pair<UserRecord, WriteResult> updateUser(User user) throws FirebaseAuthException {
        UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(user.id.toString())
                .setEmail(user.email)
                .setPassword(user.password)
                .setDisplayName(user.displayName);

        WriteResult result = null;
        try {
            result = FirestoreService.addData("users", user.id.toString(), user);
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        for (User u : FirebaseAuthService.users) {
            if (u.id.toString().equals(user.id.toString())) {
                FirebaseAuthService.users.remove(u);
            }
        }
        FirebaseAuthService.users.add(user);
        return new Pair<>(auth.updateUser(request), result);
    }

    public static Pair<FirebaseToken, User> verifyToken(String token) throws FirebaseAuthException, ExecutionException, InterruptedException {
        FirebaseToken firebaseToken = auth.verifyIdToken(token);
        User user = getUser(UUID.fromString(firebaseToken.getUid()));
        return new Pair(firebaseToken, user);
    }

    public static void deleteUser(User user) throws FirebaseAuthException, ExecutionException, InterruptedException {
        auth.deleteUser(user.id.toString());
        FirebaseAuthService.users.remove(user);
        FirestoreService.deleteData("users", user.id.toString());
    }

    public static User getUser(UUID id) throws ExecutionException, InterruptedException {
        return FirestoreService.readData("users", id.toString()).toObject(User.class);
    }
}
