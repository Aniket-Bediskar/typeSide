// ticketRoutes.ts

import express, { Request, Response } from "express";
import { createTicketAndUploadImage, deleteTicket, getAllTickets, getPropertyTickets,getAllTicketsForManager, getSingleTicket, getTicketWithChat, updateTicket  } from "../controllers/ticket.controller"; 
import { tenantAuth } from "../middlewares/authMiddleware";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use((req, res, next) => {
  req.body = {};
  next();
});


const router = express.Router();

router.post("/ticket/upload",tenantAuth, createTicketAndUploadImage);
router.get("/getAll", getAllTickets);
router.get("/:id", getSingleTicket);
router.get("/propertiesWise/:propertyId", getPropertyTickets);
router.get("/getAllTicket/:propertyId", getAllTicketsForManager);
router.delete("/:id", deleteTicket);
router.put("/:id", updateTicket);
router.get("/ticketchat/:id", getTicketWithChat);

export default router;
