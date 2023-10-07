import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { image, imageId } from './image';
import type { user, userId } from './user';

export interface commentAttributes {
  comment_id: number;
  date_comment?: Date;
  content: string;
  image_id: number;
  user_id: number;
}

export type commentPk = "comment_id";
export type commentId = comment[commentPk];
export type commentOptionalAttributes = "comment_id" | "date_comment";
export type commentCreationAttributes = Optional<commentAttributes, commentOptionalAttributes>;

export class comment extends Model<commentAttributes, commentCreationAttributes> implements commentAttributes {
  comment_id!: number;
  date_comment?: Date;
  content!: string;
  image_id!: number;
  user_id!: number;

  // comment belongsTo image via image_id
  image!: image;
  getImage!: Sequelize.BelongsToGetAssociationMixin<image>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<image, imageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<image>;
  // comment belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comment {
    return comment.init({
    comment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_comment: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'image',
        key: 'image_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "fk_comment_image",
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
      {
        name: "fk_comment_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
