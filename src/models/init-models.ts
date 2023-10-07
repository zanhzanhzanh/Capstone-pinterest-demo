import type { Sequelize } from "sequelize";
import { comment as _comment } from "./comment";
import type { commentAttributes, commentCreationAttributes } from "./comment";
import { image as _image } from "./image";
import type { imageAttributes, imageCreationAttributes } from "./image";
import { save_image as _save_image } from "./save_image";
import type { save_imageAttributes, save_imageCreationAttributes } from "./save_image";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _comment as comment,
  _image as image,
  _save_image as save_image,
  _user as user,
};

export type {
  commentAttributes,
  commentCreationAttributes,
  imageAttributes,
  imageCreationAttributes,
  save_imageAttributes,
  save_imageCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const comment = _comment.initModel(sequelize);
  const image = _image.initModel(sequelize);
  const save_image = _save_image.initModel(sequelize);
  const user = _user.initModel(sequelize);

  image.belongsToMany(user, { as: 'user_id_users', through: save_image, foreignKey: "image_id", otherKey: "user_id" });
  user.belongsToMany(image, { as: 'image_id_images', through: save_image, foreignKey: "user_id", otherKey: "image_id" });
  comment.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(comment, { as: "comments", foreignKey: "image_id"});
  save_image.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(save_image, { as: "save_images", foreignKey: "image_id"});
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "user_id"});
  image.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(image, { as: "images", foreignKey: "user_id"});
  save_image.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(save_image, { as: "save_images", foreignKey: "user_id"});

  return {
    comment: comment,
    image: image,
    save_image: save_image,
    user: user,
  };
}
