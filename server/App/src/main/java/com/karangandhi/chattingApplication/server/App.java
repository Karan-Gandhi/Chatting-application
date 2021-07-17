package com.karangandhi.chattingApplication.server;


import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

/**
 * Hello world!
 *
 */
public class App {
    public static void main( String[] args ) {
        final int PORT = 3000;
        try {
            HttpServer httpServer = HttpServer.create(new InetSocketAddress(PORT), 0);
            System.out.println("Server started at: " + PORT);

            httpServer.createContext("/", new HttpHandler() {
                @Override
                public void handle(HttpExchange exchange) throws IOException {
                    String response = "<h1>Server start success if you see this message</h1>" + "<h1>Port: " + PORT + "</h1>";
                    exchange.sendResponseHeaders(200, response.length());
                    OutputStream outputStream = exchange.getResponseBody();
                    outputStream.write(response.getBytes(StandardCharsets.UTF_8));
                    outputStream.close();
                }
            });

            httpServer.setExecutor(null);
            httpServer.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
