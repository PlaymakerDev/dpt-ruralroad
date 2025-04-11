const menu = [
  {
    icon: "ProductOutlined",
    path: "/admin/dashboard",
    path_active: "/admin/dashboard",
    path_list: [],
    label: "หน้าหลัก",
    label_key: "dashboard",
    default_color_icon: ''
  },
  {
    icon: "TruckIcon",
    path: "/admin/vehicle-weight/overview",
    path_active: "/admin/vehicle-weight",
    path_list: [],
    label: "ข้อมูลรถเข้าชั่ง",
    label_key: "vehicle_weight",
    default_color_icon: ''
  },
  {
    icon: "PaperIcon",
    path: "/admin/information",
    path_active: "/admin/information",
    path_list: [
      {
        label: 'แผนการจัดตั้งหน่วย',
        path: '/admin/information/unit-establishment-plan',
        path_active: "/admin/information",
      },
      {
        label: 'รถน้ำหนักเกินหน่วยชั่ง',
        path: '/admin/information/overweight-vehicle/overview',
        path_active: "/admin/information",
      },
      {
        label: 'การร่วมบูรณาการ',
        path: '/admin/information/collaboration-and-integration',
        path_active: "/admin/information",
      },
      {
        label: 'ข้อมูลรถ GPS',
        path: '/admin/information/vehicle-data-on-routes/overview',
        path_active: "/admin/information",
      },
      {
        label: 'รายงาน',
        path: '/admin/information/report/overview',
        path_active: "/admin/information",
      },
    ],
    label: "ข้อมูล",
    label_key: "information",
    default_color_icon: ''
  },
  {
    icon: "CCTVIcon",
    path: "/admin/cctv/overview",
    path_active: "/admin/cctv",
    path_list: [],
    label: "CCTV",
    label_key: "cctv",
    default_color_icon: ''
  }
  // {
  //   icon: "SettingOutlined",
  //   path: "/admin/setting/overview",
  //   path_list: [],
  //   label: "ตั้งค่าระบบ",
  //   label_key: "setting",
  //   default_color_icon: ''
  // },
  // {
  //   icon: "CCTVIcon",
  //   path: "/admin/cctv/overview",
  //   path_list: [],
  //   label: "CCTV",
  //   label_key: "cctv",
  //   default_color_icon: ''
  // },
]

export default menu