import { ModelType, Sequelize } from 'sequelize';
import DocumentModel from './documents.model';
import userModel from './users.model';
import propertyModel, { PropertyInterface } from './properties.model';
import blocksModel, { BlocksInterface } from './blocks.model';
import unitsModel from './units.model';
import announcementModel from './announcement.model';
import ticketModel from './tickets.model';
import chatModel from './chats.model';

export interface Models {
  tenants: ModelType<any, any> | undefined;
  sequelize: any;
  document: ReturnType<typeof DocumentModel>;
  users: ReturnType<typeof userModel>;
  properties: ReturnType<typeof propertyModel>;
  blocks: ReturnType<typeof blocksModel>;
  units: ReturnType<typeof unitsModel>;
  announcement: ReturnType<typeof announcementModel>;
  ticket: ReturnType<typeof ticketModel>;
  chatModel: ReturnType<typeof chatModel>;
}

export default (sequelize: Sequelize): Models => {
  const models: Models = {
    document: DocumentModel(sequelize),
    users: userModel(sequelize),
    properties: propertyModel(sequelize),
    blocks: blocksModel(sequelize),
    units: unitsModel(sequelize),
    announcement: announcementModel(sequelize),
    ticket: ticketModel(sequelize),
    chatModel: chatModel(sequelize),
    tenants: undefined,
    sequelize: undefined
  };

  models.properties.hasMany(models.blocks, { foreignKey: 'propertyId' });
  models.blocks.belongsTo(models.properties, { foreignKey: 'propertyId' });

  models.blocks.hasMany(models.units, { foreignKey: 'blockId' });
  models.units.belongsTo(models.blocks, { foreignKey: 'blockId' });

  models.units.hasMany(models.users, { foreignKey: 'unitId' });
  models.users.belongsTo(models.units, { foreignKey: 'unitId' });

  models.properties.hasMany(models.users, { foreignKey: 'propertyId' });
  models.users.belongsTo(models.properties, { foreignKey: 'propertyId' });

  models.users.hasMany(models.chatModel, { foreignKey: 'userId' });
  models.chatModel.belongsTo(models.users, { foreignKey: 'receiver', as: 'user' });

  models.ticket.hasMany(models.chatModel, { foreignKey: 'ticketId' });
  models.chatModel.belongsTo(models.ticket, { foreignKey: 'ticketId' });

  models.properties.hasMany(models.ticket, { foreignKey: 'propertyId' });
  models.ticket.belongsTo(models.properties, { foreignKey: 'propertyId' });
  
  models.users.hasMany(models.announcement,{ foreignKey: 'userId' });
  models.announcement.belongsTo(models.users,{ foreignKey: 'userId' });
  
  models.properties.hasMany(models.announcement,{ foreignKey: 'propertyId' });
  models.announcement.belongsTo(models.properties,{ foreignKey: 'propertyId' });

  return models;
  
};
