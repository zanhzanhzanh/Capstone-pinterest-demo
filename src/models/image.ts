import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { save_image, save_imageId } from './save_image';
import type { user, userId } from './user';

export interface imageAttributes {
  image_id: number;
  image_name: string;
  path: string;
  desc?: string;
  user_id: number;
}

export type imagePk = "image_id";
export type imageId = image[imagePk];
export type imageOptionalAttributes = "image_id" | "desc";
export type imageCreationAttributes = Optional<imageAttributes, imageOptionalAttributes>;

export class image extends Model<imageAttributes, imageCreationAttributes> implements imageAttributes {
  image_id!: number;
  image_name!: string;
  path!: string;
  desc?: string;
  user_id!: number;

  // image hasMany comment via image_id
  comments!: comment[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<comment>;
  setComments!: Sequelize.HasManySetAssociationsMixin<comment, commentId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<comment, commentId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<comment, commentId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<comment>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<comment, commentId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<comment, commentId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<comment, commentId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<comment, commentId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // image hasMany save_image via image_id
  save_images!: save_image[];
  getSave_images!: Sequelize.HasManyGetAssociationsMixin<save_image>;
  setSave_images!: Sequelize.HasManySetAssociationsMixin<save_image, save_imageId>;
  addSave_image!: Sequelize.HasManyAddAssociationMixin<save_image, save_imageId>;
  addSave_images!: Sequelize.HasManyAddAssociationsMixin<save_image, save_imageId>;
  createSave_image!: Sequelize.HasManyCreateAssociationMixin<save_image>;
  removeSave_image!: Sequelize.HasManyRemoveAssociationMixin<save_image, save_imageId>;
  removeSave_images!: Sequelize.HasManyRemoveAssociationsMixin<save_image, save_imageId>;
  hasSave_image!: Sequelize.HasManyHasAssociationMixin<save_image, save_imageId>;
  hasSave_images!: Sequelize.HasManyHasAssociationsMixin<save_image, save_imageId>;
  countSave_images!: Sequelize.HasManyCountAssociationsMixin;
  // image belongsToMany user via image_id and user_id
  user_id_users!: user[];
  getUser_id_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_id_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_id_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_id_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_id_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_id_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_id_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_id_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_id_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_id_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // image belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof image {
    return image.init({
    image_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "No Description"
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
    tableName: 'image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
      {
        name: "fk_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
