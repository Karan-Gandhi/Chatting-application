package com.karangandhi.chattingApplication.server.Routes;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;

public class loginWithEmailAndPassword implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        switch (exchange.getRequestMethod()) {
            case "POST":
                String a = new String(exchange.getRequestBody().readAllBytes());

                Gson gson = new Gson();
                Object o = gson.fromJson(a, Object.class);
                System.out.println(o.toString());

                break;
        }
    }
}
