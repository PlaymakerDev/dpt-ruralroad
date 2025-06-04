import React, { useCallback } from "react";
import { message, Modal, Table } from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import Edit from "@/components/icon/Edit";
import Bin from "@/components/icon/Bin";
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";
import { ROLE_TH_UNCAP } from "@/utils/constant";

const TableUser = (props) => {
  const { data, loading, page, perPage, total, onChange, setOpen, onReload } = props;
  const [apiDelete, loadingDelete] = useDeleteAPI('overlay')

  const deleteRecord = useCallback(async (username) => {
    const response = await apiDelete(`/api/v1/users/${username}`, {}, {}, false)
    if (response?.success) {
      message.success('ลบข้อมูลสำเร็จ')
      onReload()
      Modal.destroyAll()
    } else {
      message.error('ไม่สามารถลบข้อมูลได้')
    }
  }, [apiDelete, onReload])

  const confirmDelete = useCallback((record) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล ?',
      content: 'ท่านตัองการลบข้อมูลผู้ใช้งานใช่หรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => deleteRecord(record?.username),
      onCancel: () => Modal.destroyAll(),
      okButtonProps: {
        loading: loadingDelete
      }
    })
  }, [deleteRecord, loadingDelete])

  // const data = [
  //   {
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",
  //   },
  //   {
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",

  //   },
  //   {
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",

  //   },
  //   {
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",

  //   },
  // ];

  const renderName = useCallback((data) => {
    let nameDestructure = [
      data?.title,
      data?.first_name,
      data?.last_name
    ]
    return nameDestructure.join(' ')
  }, [])

  const columns = [
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      width: 200,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "name",
      dataIndex: "name",
      width: 300,
      render: (item, record) => {
        const name = renderName(record)
        if (name) {
          return name
        }
        return '-'
      }
    },
    {
      title: "หน่วยงาน",
      key: "dept_id",
      dataIndex: "dept_id",
      width: 200,
      render: (item, record) => {
        if (record?.department?.name) {
          return record?.department?.name
        }
        return '-'
      },
      sorter: (a, b) => a?.department?.name.localeCompare(b?.department?.name)
    },
    {
      title: "ตำแหน่ง",
      key: "position",
      dataIndex: "position",
      width: 200,
      render: (item, record) => {
        if (record?.user_position?.p_name) {
          return record?.user_position?.p_name
        }
        return '-'
      },
      sorter: (a, b) => a?.user_position?.p_name.localeCompare(b?.user_position?.p_name)
    },
    {
      title: "หน้าที่",
      key: "role",
      dataIndex: "role",
      width: 200,
      render: (item, record) => {
        if (record?.user_role?.role) {
          return record?.user_role?.role
        }
        return '-'
      }
    },
    {
      title: "กลุ่ม",
      key: "group_name",
      dataIndex: "group_name",
      width: 100,
      render: (item) => {
        if (item) {
          return ROLE_TH_UNCAP[item]
        }
        return '-'
      },
      sorter: (a, b) => a?.group_name.localeCompare(b?.group_name)
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (item, record) => {
        return (
          <div className='inline-flex flex-wrap items-center gap-5'>
            <Edit
              className='!cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setOpen({ open: true, info: record })
              }
              }
            />
            <Bin
              className='!cursor-pointer !text-[#FF4a4a]'
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete(record)
              }}
            />
          </div>
        )
      }
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={loading}
      rowClassName='!cursor-pointer'
      onRow={(record) => ({
        onClick: () => {
          setOpen({ open: true, info: record })
        },
      })}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 100,
        current: page,
        pageSize: perPage,
        total: Number(total) || 0,
        onChange: onChange,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      scroll={{ x: 1600 }}
    />
  );
};

export default React.memo(TableUser);
