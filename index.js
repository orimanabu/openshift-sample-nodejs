import date from "date-utils";
import ip from "ip";
import networkInterface from "os";
import express from "express";

const portNumber = 8080;
const app = express();

app.get("/", (req, res) => {
    const date = new Date();
    const currentTime = date.toFormat('YYYY/MM/DD HH24:MI:SS');
    // const remoteAddr = req.connection.remoteAddress;
    const remoteAddr = req.socket.remoteAddress;
    const host = req.headers.host;
    const localAddr = ip.address();
    res.status(200).send(
        `${currentTime} Hello, World: HOST=${host}, LocalAddr=${localAddr}, RemoteAddr=${remoteAddr}\n`
    );
});

app.listen(portNumber, '0.0.0.0');
console.log(`PortNumber is ${portNumber}`);
