import ROLE_CONFIG, { ROLE } from './roleConfig'

class Permission {
  user
  roleUser
  constructor(user) {
    this.user = user
    this.roleUser = user?.map_group_name || ''
  }

  isAdmin() {
    return this.roleUser === ROLE.ADMIN
  }

  isRoles(roles) {
    if (!roles || !roles?.length) return true
    return roles?.includes(this.roleUser)
  }

  isRole() {
    return this.roleUser
  }

  indexPage() {
    return ROLE_CONFIG[this.roleUser]?.index_page
  }
}

const permission = (user) => new Permission(user)

export default permission
