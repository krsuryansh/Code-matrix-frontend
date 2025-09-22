// socket.js
import { io } from "socket.io-client";

// Socket ko **single instance** ke liye create kar rahe hain
export const socket = io("https://college-project-backend-rtiw.onrender.com", {
  autoConnect: false,
});
