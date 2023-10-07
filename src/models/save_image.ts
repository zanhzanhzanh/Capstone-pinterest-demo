import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { image, imageId } from './image';
import type { user, userId } from './user';

export interface save_imageAttributes {
  date_save?: Date;
  image_id: number;
  user_id: number;
}

export type save_imagePk = "image_id" | "user_id";
export type save_imageId = save_image[save_imagePk];
export type save_imageOptionalAttributes = "date_save";
export type save_imageCreationAttributes = Optional<save_imageAttributes, save_imageOptionalAttributes>;

export class save_image extends Model<save_imageAttributes, save_imageCreationAttributes> implements save_imageAttributes {
  date_save?: Date;
  image_id!: number;
  user_id!: number;

  // save_image belongsTo image via image_id
  image!: image;
  getImage!: Sequelize.BelongsToGetAssociationMixin<image>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<image, imageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<image>;
  // save_image belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof save_image {
    return save_image.init({
    date_save: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'image',
        key: 'image_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'save_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "image_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "fk_save_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
