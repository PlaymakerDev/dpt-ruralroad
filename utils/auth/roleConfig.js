export const ROLE = {
  'ADMIN': 'ADMIN',
  'USER': 'USER'
}

const ROLE_CONFIG = {
  [ROLE.ADMIN]: {
    "index_page": "/admin/dashboard"
  },
  [ROLE.USER]: {
    "index_page": "/admin/dashboard"
  },
  // Add a default index page for any role
  "DEFAULT": {
    "index_page": "/admin/dashboard"
  }
}

export default ROLE_CONFIG
