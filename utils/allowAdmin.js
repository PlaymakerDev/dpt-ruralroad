export const allowAdmin = (role) => {
  switch (role) {
    case 'ADMIN':
      return true
    case 'USER':
      return false
    default:
      return false
  }
}


export const checkUserType = (role) => {
  switch (role) {
    case 'EXECUTIVE':
      return true
    case 'CITIZEN':
      return false
    default:
      return false
  }
}

export const filterDeptType = (dept_type,role) => {
  // switch (dept_type) {
  //   case 2:
  //     return false
  //   default:
  //     return true
  // }

  // if((dept_type == 2) && (role == "ADMIN")){
  //   return true
  // }

  // if((dept_type == 2) && (role != "ADMIN")){
  //   return false
  // }

  if(dept_type == 2){
    return false
  }

  return true
}
