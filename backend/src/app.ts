import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import CONFIG from './config';
import usersController from './6-controllers/users-controller';
import vacationController from './6-controllers/vacation-controller';
import followersController from './6-controllers/followers-controller';
import expressFileUpload from 'express-fileupload';

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api",usersController);
server.use("/api",vacationController);
server.use("/api",followersController)
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(CONFIG.PORT, () => {
    console.log(`listening on http://localhost:${CONFIG.PORT}`)
});