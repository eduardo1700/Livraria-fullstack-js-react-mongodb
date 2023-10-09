const express = require("express");



module.exports = (app) => {
    // Because this is a server that will accept requests from outside and it will be hosted ona server with a proxy, express needs to know that it should trust that setting.
    // Services like heroku use something called a proxy and you need to add this to your server
    app.set("trust proxy", 1);

    // controls a very specific header to pass headers from the frontend


    // In development environment the app logs

    // To have access to body property in the request
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
  };