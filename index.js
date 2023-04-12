import date from "date-utils";
import ip from "ip";
import networkInterface from "os";
import express from "express";
import promClient from "prom-client";

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({timeout: 5000});

const apiPort = 8080;
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

app.listen(apiPort, '0.0.0.0');
console.log(`[${new Date()}] API endpoint started on ${apiPort}`);

const promPort = 9090;
const metrics = express();
metrics.get("/metrics", (req, res) => {
    res.set("Content-Type", "text/plain");
    promClient.register.metrics().then(str => res.send(str));
});
metrics.listen(promPort, () => console.log(`[${new Date()}] Prometheus exporter started on ${promPort}`));
