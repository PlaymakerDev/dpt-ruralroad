const menu = [
  {
    icon: "HomeOutlined",
    path: "/admin/dashboard",
    path_list: [],
    label: "หน้าหลัก",
    label_key: "dashboard",
    default_color_icon: ''
  },
  {
    icon: "TruckOutlined",
    path: "/admin/vehicle-weight",
    path_list: [],
    label: "ข้อมูลรถเข้าชั่ง",
    label_key: "vehicle_weight",
    default_color_icon: ''
  },
  {
    icon: "FileTextOutlined",
    path: "#",
    path_list: [
      {
        label: 'ข้อมูลแผนการจัดตั้งหน่วย',
        path: '/admin/information/unit-establishment-plan'
      },
      {
        label: 'รถน้ำหนักเกินหน่วยชั่ง',
        path: '/admin/information/overweight-vehicle/overview'
      },
      {
        label: 'การบูรณาการ',
        path: '/admin/information/collaboration-and-integration'
      },
      {
        label: 'ข้อมูลรถในสายทาง',
        path: '/admin/information/vehicle-data-on-routes/overview'
      },
      {
        label: 'รายงาน',
        path: '/admin/information/report'
      },
    ],
    label: "ข้อมูล",
    label_key: "information",
    default_color_icon: ''
  },
  {
    icon: "SettingOutlined",
    path: "/admin/setting/overview",
    path_list: [],
    label: "ตั้งค่าระบบ",
    label_key: "setting",
    default_color_icon: ''
  },
]

export default menu