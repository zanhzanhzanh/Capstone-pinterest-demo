import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { image, imageId } from './image';
import type { save_image, save_imageId } from './save_image';

export interface userAttributes {
  user_id: number;
  email: string;
  password: string;
  username: string;
  age: number;
  avatar: string;
  path: string;
}

export type userPk = "user_id";
export type userId = user[userPk];
export type userOptionalAttributes = "user_id";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  user_id!: number;
  email!: string;
  password!: string;
  username!: string;
  age!: number;
  avatar!: string;
  path!: string;

  // user hasMany comment via user_id
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
  // user hasMany image via user_id
  images!: image[];
  getImages!: Sequelize.HasManyGetAssociationsMixin<image>;
  setImages!: Sequelize.HasManySetAssociationsMixin<image, imageId>;
  addImage!: Sequelize.HasManyAddAssociationMixin<image, imageId>;
  addImages!: Sequelize.HasManyAddAssociationsMixin<image, imageId>;
  createImage!: Sequelize.HasManyCreateAssociationMixin<image>;
  removeImage!: Sequelize.HasManyRemoveAssociationMixin<image, imageId>;
  removeImages!: Sequelize.HasManyRemoveAssociationsMixin<image, imageId>;
  hasImage!: Sequelize.HasManyHasAssociationMixin<image, imageId>;
  hasImages!: Sequelize.HasManyHasAssociationsMixin<image, imageId>;
  countImages!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsToMany image via user_id and image_id
  image_id_images!: image[];
  getImage_id_images!: Sequelize.BelongsToManyGetAssociationsMixin<image>;
  setImage_id_images!: Sequelize.BelongsToManySetAssociationsMixin<image, imageId>;
  addImage_id_image!: Sequelize.BelongsToManyAddAssociationMixin<image, imageId>;
  addImage_id_images!: Sequelize.BelongsToManyAddAssociationsMixin<image, imageId>;
  createImage_id_image!: Sequelize.BelongsToManyCreateAssociationMixin<image>;
  removeImage_id_image!: Sequelize.BelongsToManyRemoveAssociationMixin<image, imageId>;
  removeImage_id_images!: Sequelize.BelongsToManyRemoveAssociationsMixin<image, imageId>;
  hasImage_id_image!: Sequelize.BelongsToManyHasAssociationMixin<image, imageId>;
  hasImage_id_images!: Sequelize.BelongsToManyHasAssociationsMixin<image, imageId>;
  countImage_id_images!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany save_image via user_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
