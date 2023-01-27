import http from "http";
import app from "./app.js";

app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
