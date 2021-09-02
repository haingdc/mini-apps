var cors = require('cors');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use('/api', createProxyMiddleware({
    target: 'https://www.metaweather.com',
    headers: {
        accept: "application/json",
        method: "GET",
    },
    changeOrigin: true,
}));
app.use('/data', createProxyMiddleware({
    target: 'http://api.openweathermap.org',
    headers: {
        accept: "application/json",
        method: "GET",
    },
    changeOrigin: true,
}));
app.use('/maps/api', createProxyMiddleware({
    target: 'https://maps.googleapis.com',
    headers: {
        accept: "application/json",
        method: "GET",
    },
    changeOrigin: true,
}))
app.use('/maps/api/directions', createProxyMiddleware({
    target: 'https://maps.googleapis.com',
    headers: {
        accept: "application/json",
        method: "GET",
    },
    changeOrigin: true,
}))
app.use('/get_contacts_fake', createProxyMiddleware({
    target: 'http://localhost:8000',
    headers: {
        accept: "application/json",
        method: "GET",
    },
    changeOrigin: true,
}))

app.listen(8080);