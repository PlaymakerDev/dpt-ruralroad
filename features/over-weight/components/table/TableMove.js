import React from 'react'
import { Table, Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';

const TableMove = (props) => {
  const { setStep } = props

  // const data = [
  //   {
  //     key: '1',
  //     date: '20 สิงหาคม 2567',
  //     timestart: '13:30',
  //     timeend: '15.50',
  //     duty: 'ตลิ่งชัน',
  //     code: 'กกน.123',
  //     wtf: 'กช.',
  //     manyin: '1',
  //     over: '1',
  //   },
  //   {
  //     key: '2',
  //     date: '25 สิงหาคม 2567',
  //     timestart: '16:30',
  //     timeend: '18.50',
  //     duty: 'น่านไง',
  //     code: 'วดฟ.789',
  //     wtf: '-',
  //     manyin: '10',
  //     over: '5',
  //   },  
  // ]


  const data = [
    {
      key: '1',
      date: '12 สิงหาคม 2567',
      sation: 'พระประแดง',
      weighcar: '14',
      weighover: '425',
    },
    {
      key: '2',
      date: '7 สิงหาคม 2567',
      sation: 'รัชโยธิน',
      weighcar: '11',
      weighover: '96',
    },
    {
      key: '3',
      date: '18 สิงหาคม 2567',
      sation: 'บางนา',
      weighcar: '20',
      weighover: '380',
    },
    {
      key: '4',
      date: '23 สิงหาคม 2567',
      sation: 'พระราม 9',
      weighcar: '15',
      weighover: '450',
    },
    {
      key: '5',
      date: '25 สิงหาคม 2567',
      sation: 'ลาดพร้าว',
      weighcar: '18',
      weighover: '320',
    },
    {
      key: '6',
      date: '30 สิงหาคม 2567',
      sation: 'บางใหญ่',
      weighcar: '12',
      weighover: '500',
    },
    {
      key: '7',
      date: '5 กันยายน 2567',
      sation: 'พระโขนง',
      weighcar: '10',
      weighover: '600',
    },
    {
      key: '8',
      date: '10 กันยายน 2567',
      sation: 'บางบัวทอง',
      weighcar: '16',
      weighover: '280',
    },
    {
      key: '9',
      date: '15 กันยายน 2567',
      sation: 'บางแค',
      weighcar: '19',
      weighover: '450',
    },
    {
      key: '10',
      date: '20 กันยายน 2567',
      sation: 'บางซื่อ',
      weighcar: '13',
      weighover: '375',
    },
    {
      key: '11',
      date: '25 กันยายน 2567',
      sation: 'ดอนเมือง',
      weighcar: '17',
      weighover: '420',
    },
    {
      key: '12',
      date: '30 กันยายน 2567',
      sation: 'ลาดกระบัง',
      weighcar: '21',
      weighover: '290',
    },
    {
      key: '13',
      date: '5 ตุลาคม 2567',
      sation: 'รังสิต',
      weighcar: '9',
      weighover: '350',
    },
    {
      key: '14',
      date: '10 ตุลาคม 2567',
      sation: 'จตุจักร',
      weighcar: '11',
      weighover: '400',
    },
    {
      key: '15',
      date: '15 ตุลาคม 2567',
      sation: 'คลองเตย',
      weighcar: '14',
      weighover: '375',
    },
    {
      key: '16',
      date: '20 ตุลาคม 2567',
      sation: 'บางพลี',
      weighcar: '18',
      weighover: '420',
    },
    {
      key: '17',
      date: '25 ตุลาคม 2567',
      sation: 'ศรีนครินทร์',
      weighcar: '20',
      weighover: '310',
    },
    {
      key: '18',
      date: '30 ตุลาคม 2567',
      sation: 'สุขุมวิท',
      weighcar: '15',
      weighover: '350',
    },
    {
      key: '19',
      date: '4 พฤศจิกายน 2567',
      sation: 'อโศก',
      weighcar: '12',
      weighover: '430',
    },
    {
      key: '20',
      date: '9 พฤศจิกายน 2567',
      sation: 'อนุสาวรีย์ชัยสมรภูมิ',
      weighcar: '17',
      weighover: '280',
    },
  ];
  

  // const columns = [
  //   {
  //     title: 'ลำดับ',
  //     dataIndex: 'key',
  //     align: 'center',
  //   },
  //   {
  //     title: 'วันที่',
  //     dataIndex: 'date',
  //     align: 'center',
  //   },
  //   {
  //     title: 'เวลาจัดตั้ง',
  //     dataIndex: 'timestart',
  //     align: 'center',
  //   },
  //   {
  //     title: 'เวลาสิ้นสุด',
  //     dataIndex: 'timeend',
  //     align: 'center',
  //   },
  //   {
  //     title: 'หน่วยที่จัดตั้ง',
  //     dataIndex: 'duty',
  //     align: 'center',
  //   },
  //   {
  //     title: 'รหัสสายทาง',
  //     dataIndex: 'code',
  //     align: 'center',
  //   },
  //   {
  //     title: 'บูรณาการ',
  //     dataIndex: 'wtf',
  //     align: 'center',
  //   },
  //   {
  //     title: 'จำนวนรถเข้าชั่ง',
  //     dataIndex: 'manyin',
  //     align: 'center',
  //   },
  //   {
  //     title: 'น้ำหนักเกิน',
  //     dataIndex: 'over',
  //     align: 'center',
  //   },
  //   {
  //     title: '',
  //     key: 'operation',
  //     align: 'center',
  //     render: () =>
  //       <Button
  //         icon={<RightOutlined />}
  //         size='small'
  //         htmlType='submit'
  //         onClick={() => setStep(2)}
  //         type='text'
  //       />
  //   }
  // ]


  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      align: 'center',
    },
    {
      title: "วัน/เวลา",
      dataIndex: "date",
      align: 'center',
    },
    {
      title: "หน่วยงาน",
      dataIndex: "sation",
      align: 'center',
    },
    {
      title: "สายทาง",
      dataIndex: "weighcar",
      align: 'center',
    },
    {
      title: "ทะเบียน",
      dataIndex: "weighover",
      align: 'center',
    },
    // {
    //   title: '',
    //   key: 'operation',
    //   align: 'center',
    //   render: () =>
    //     <Button
    //       icon={<RightOutlined />}
    //       size='small'
    //       htmlType='submit'
    //       type='text'
    //       onClick={() => setStep(2)}
    //     />
    // },
    {
      title: "ประเภทรถ",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "น้ำหนักตาม กฎหมาย",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "น้ำหนักตามที่ชั่ง",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "น้ำหนักที่เกิน",
      dataIndex: "weighover",
      align: 'center',
    }, {
      title: "เพลาที่เกิน",
      dataIndex: "weighover",
      align: 'center',
    },{
      title: '',
      key: 'actions',
      render: (_, record) => (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            // onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            type="text"
            icon={<FileTextOutlined />}
            // onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ]

  return (

      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          total:10,
          position: ['bottomCenter']}}
        scroll={{ x: 1600 }}
      />
  )
}

export default React.memo(TableMove)
