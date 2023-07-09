/*
CREATE TABLE `db`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `passwordHash` VARCHAR(60) NOT NULL,
  `registeredAt` DATETIME NOT NULL,
  `token` VARCHAR(60) NOT NULL,
  `birthday` DATETIME NOT NULL,
  `gender` ENUM('male', 'female') NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC));
 */
import { Model } from 'objection';
import randtoken from 'rand-token';

import { hashPassword } from '../utils/bcrypt';

export default class User extends Model {
  static tableName = 'users';

  static tokenSize = 60;

  static saltSize = 32;

  static makeUserJSON(user) {
    const passwordSalt = randtoken.generate(User.saltSize);

    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      registeredAt: new Date(),
      birthDay: new Date(user.birthYear, user.birthMonth, user.birthDay),
      token: randtoken.generate(User.tokenSize),
      passwordHash: hashPassword(user.password, passwordSalt),
      passwordSalt
    };
  }

  static hashPassword(password, passwordSalt) {
    return hashPassword(password, passwordSalt);
  }

  static generateToken() {
    return randtoken.generate(User.tokenSize);
  }
}
