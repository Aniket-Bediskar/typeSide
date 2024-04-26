import { Request, Response } from 'express';
import { Models } from '../models';
import 'dotenv/config';
import admin from '../common/firebase';

const sendNotification = async (token: string, title: string, body: string) => {
  const message = {
    data: {
      title,
      body,
    },
    token,
  };

  await admin.messaging().send(message);
};

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { announcement_title, description, userId, deviceToken, propertyId } = req.body;

    const models: Models = req.app.locals.models;
    const newAnnouncement = await models.announcement.create({
      announcement_title,
      description,
      propertyId,
      userId,
      deviceToken
    });

    await sendNotification(deviceToken, 'New Announcement', announcement_title);

    return res.status(201).json({ announcement: newAnnouncement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getAnnouncement = async (req: Request, res: Response) => {
  try {
    const models: Models = req.app.locals.models;
    const Announcements = await models.announcement.findAll();

    return res.status(200).json({ Announcements });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getAnnouncementsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   const models: Models = req.app.locals.models;
    const Announcements = await models.announcement.findByPk(id);

    if (!Announcements) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    return res.status(200).json({ Announcements });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const updateAnnouncements = async (req: Request, res: Response) => {
  let responseData;
  const { id } = req.params;
  const { body } = req;

  try {
    const models: Models = req.app.locals.models;
    const result = await models.announcement.update(
      {
        announcement_title: body.announcement_title,
        description: body.description
      },
      { where: { id } }
    );

    if (result) {
      responseData = { status: 200, message: 'Announcement updated successfully' };
    } else {
      responseData = { status: 404, message: 'Announcement not found' };
    }

    return res.status(responseData.status).json(responseData);
  } catch (error) {
    console.error(error);
    responseData = { status: 500, message: `Internal server error, contact API administrator` };
    return res.status(responseData.status).json(responseData);
  }
};

export const deleteAnnouncements = async (req: Request, res: Response) => {
  let responseData;
  const { id } = req.params;
  try {
    const models: Models = req.app.locals.models;
    const result = await models.announcement.destroy({
      where: {
        id,
      },
    });
    if (result) {
      responseData = { status: 200, message: 'Announcement deleted succesfully' };
    } else {
      responseData = { status: 404, message: 'Announcement not found' };
    }
    return res.status(responseData.status).json(responseData);
  } catch (error) {
    console.log(error);
    responseData = { status: 500, message: 'Internal server error, contact API administrator' };
  }
};

const AnnouncementsServices = {
  createAnnouncement,
  getAnnouncement,
  getAnnouncementsById,
  updateAnnouncements,
  deleteAnnouncements
};

export default AnnouncementsServices;
