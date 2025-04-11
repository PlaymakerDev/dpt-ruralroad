import ROLE_CONFIG, { ROLE } from './roleConfig'
// import { User } from './user'

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

  isUser() {
    return this.roleUser === ROLE.USER
  }

  isRoles(roles) {
    if (!roles || !roles?.length) return true
    return roles?.includes(this.roleUser)
  }

  isRole() {
    return this.roleUser
  }

  // เพิ่มเมธอด hasAccess เพื่อตรวจสอบสิทธิ์การเข้าถึงหน้าต่างๆ
  hasAccess(page) {
    // ตรวจสอบว่ามี roleUser หรือไม่
    if (!this.roleUser) return false;
    
    // ตรวจสอบว่า roleUser มีสิทธิ์เข้าถึงหน้าที่ต้องการหรือไม่
    switch (page) {
      case 'dashboard':
        // ทั้ง ADMIN และ USER สามารถเข้าถึงหน้า dashboard ได้
        return this.isAdmin() || this.isUser();
      default:
        // กรณีไม่ระบุหน้า ให้ตรวจสอบว่ามี role หรือไม่
        return !!this.roleUser;
    }
  }

  indexPage() {
    return ROLE_CONFIG[this.roleUser]?.index_page || ROLE_CONFIG["DEFAULT"].index_page
  }
}

const permission = (user) => new Permission(user)

export default permission
