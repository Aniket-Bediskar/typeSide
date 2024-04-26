
// announcement.model.ts

import { Sequelize, Model, DataTypes } from 'sequelize';

export interface AnnouncementInterface extends Model {
  id: number;
  announcement_title: string;
  description: string;
  userId: number;
  propertyId: number
}

export default (sequelize: Sequelize) => {
  const Announcement = sequelize.define<AnnouncementInterface>('announcement', {
    announcement_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceToken :{
      type : DataTypes.TEXT,
      allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },    
  },
  {
    freezeTableName: true,
    tableName: "announcement",
    updatedAt: "updated_at",
    createdAt: "created_at"
  });

  return Announcement;
};