export function validatePermissionRoute(user, roles) {
  // console.log("=== userPerm ===",user)
  let canView = false
  if (user?.token) {
    if (user.token && roles.includes(user.map_group_name)) {
      canView = true
    }
  }

  return canView
}

export function redirectToLogin(path = '/login') {
  let destinationPath = path
  return {
    redirect: {
      destination: destinationPath,
      permanent: false,
    },
  }
}

export function sessionToProps(session, message) {
  return {
    props: {
      user: session || null,
      error: {
        message: message || null,
      },
    },
  }
}
