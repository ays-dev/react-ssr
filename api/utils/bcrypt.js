import pbkdf2 from 'pbkdf2';

export function hashPassword(password, salt) {
  return pbkdf2.pbkdf2Sync(password, salt, 200000, 64, 'sha512').toString('base64');
}
