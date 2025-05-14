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
}

export default ROLE_CONFIG
