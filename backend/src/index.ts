import "dotenv/config";
import { db } from "../drizzle/db";
import { UserTable } from "../drizzle/schema";
import userRouter from "./routes/User";
import chatRouter from "./routes/Chat";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chat-app-psi-neon.vercel.app/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.listen(3000);

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

// import { sql } from "drizzle-orm";
// const { instrument } = require("@socket.io/admin-ui");

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: ["http://localhost:5173", "https://admin.socket.io"],
//     credentials: true,
//   },
// });

// const socketMapping = new Map();

async function main() {
  // await db.delete(UserTable);
  // const user = await db
  //   .insert(UserTable)
  //   .values([
  //     { name: "Parikshit", age: 22, email: "parik@gmail.com" },
  //     { name: "Sally", age: 25, email: "sally@gmail.com" },
  //   ])
  //   .returning({
  //     id: UserTable.id,
  //   });
  // console.log(user);
  // const users = await db.query.UserTable.findMany({
  //   columns: { email: true, name: true },
  //   extras: {
  //     lowercaseCaseName: sql<string>`LOWER(${UserTable.name})`.as(
  //       "lowerCaseName"
  //     ),
  //   },
  // });
  // const users = await db.query.UserTable.findMany({
  //   columns: { name: true },
  //   with: { preferences: true },
  // });
  // console.log(users);
  //   io.on("connection", (socket) => {
  //     console.log({ socketId: socket.id });
  //     // console.log(getConnectedClientIds());
  //     socket.on("send-message", (message, username) => {
  //       socket.to(socketMapping.get(username)).emit("receive-message", message);
  //     });
  //     socket.on("set-username", (username) => {
  //       socketMapping.set(username, socket.id);
  //       for (const [key, value] of socketMapping) {
  //         console.log(`${key} = ${value}`);
  //       }
  //     });
  //   });
  // }
  // function getConnectedClientIds() {
  //   const connectedClients: string[] = [];
  //   for (const [id, client] of io.sockets.sockets) {
  //     connectedClients.push(id);
  //   }
  //   return connectedClients;
  // (await db.delete(UserTable)).values();
  // await db.insert(UserTable).values({
  //   username: "bingo",
  // });
  // const user = await db.query.UserTable.findFirst();
  // console.log(user);
}

main();
