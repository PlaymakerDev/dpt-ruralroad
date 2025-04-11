import React, { useCallback } from "react";
import { message, Modal, Table } from "antd";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import Edit from "@/components/icon/Edit";
import Bin from "@/components/icon/Bin";
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";

const TableTrollway = (props) => {
  const { setOpen, data, loading, page, perPage, total, onChange, funcGet } = props;

  const [funcDelete, loadingDelete] = useDeleteAPI();

  const handlerDelete = useCallback(async (id) => {
    const { success } = await funcDelete(`/api/v1/masters/way/${id}`, {}, {}, false)
    if (success) {
      funcGet({})
      message.success('ลบข้อมูลสำเร็จ')
    } else {
      message.error('ไม่สามารถลบข้อมูลได้')
    }
  }, [funcDelete, funcGet])

  const confirmDelete = useCallback((id) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล ?',
      content: 'ท่านต้องการลบข้อมูลสายทางใช่หรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onCancel: () => Modal.destroyAll(),
      onOk: () => handlerDelete(id),
      okButtonProps: {
        loading: loadingDelete
      }
    })
  }, [handlerDelete, loadingDelete])

  const columns = [
    {
      title: "รหัสสายทาง",
      key: "way_code",
      dataIndex: "way_code",
      width: 100,
      sorter: (a, b) => a.way_code.localeCompare(b.way_code),
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "ชื่อสายทาง",
      key: "name",
      dataIndex: "name",
      width: 300,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "ตำบล",
      key: "subdistrict",
      dataIndex: "subdistrict",
      width: 200,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "อำเภอ",
      key: "district",
      dataIndex: "district",
      width: 200,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "จังหวัด",
      key: "province",
      dataIndex: "province",
      width: 200,
      sorter: (a, b) => a.province.localeCompare(b.province),
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: "หน่วยงาน",
      key: "department",
      dataIndex: "department",
      // key: "department",
      // dataIndex: "department",
      width: 300,
      render: (item) => {
        if (item.name2) {
          return item.name2
        }
        return '-'
      }
    },
    {
      title: "ระยะทาง ",
      key: "distance",
      dataIndex: "distance",
      width: 100,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (v, r) => {
        return (
          <div className='inline-flex flex-wrap items-center gap-5'>
            <Edit
              className='!cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setOpen({ open: true, type: 'edit', data: r }
                )
              }
              }
            />
            <Bin
              className='!cursor-pointer !text-[#FF4a4a]'
              // onClick={() => { hadlerDelete(r?.id) }}
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete(r.id)
              }

              }
            />
          </div>
        )
      }
    },
  ];

  return (
    <Table
      dataSource={data}
      loading={loading}
      columns={columns}
      scroll={{ x: 1600 }}
      onRow={(record) => ({
        onClick: () => {
          setOpen({ open: true, type: 'edit', data: record })
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
    />
  );
};

export default React.memo(TableTrollway);
