/**
 * @desc  This file contains used user roles within application. These are used to authorize user access to application
 *        routes - for more information see one of those ***.routes.js files on sources.
 * @name  UserRoles
 *
 * @type {{
 *    ROLE_ANON: string,
 *    ROLE_LOGGED: string,
 *    ROLE_USER: string,
 *    ROLE_ADMIN: string,
 *    ROLE_ROOT: string
 *  }}
 */
const UserRoles = {
  ROLE_ANON: 'ROLE_ANON',
  ROLE_LOGGED: 'ROLE_LOGGED',
  ROLE_USER: 'ROLE_USER',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_ROOT: 'ROLE_ROOT',
};

export default UserRoles;
