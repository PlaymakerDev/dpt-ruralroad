import React, { useCallback, useMemo, useState } from "react";
import { Radio, Table, ConfigProvider } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
import 'antd/dist/reset.css';
// import '../styles/globals.css';

const TableUser = (props) => {
  const { data, loading, page, perPage, total, onChange, onTableChange } = props;

  const ldapUserList = useMemo(() => {
    const ldapUser = data?.map((item, index) => {
      return {
        key: index + 1,
        ...item
      }
    })
    return ldapUser || []
  }, [data])

  // const data = [
  //   {
  //     key: '1',
  //     // user_record: '',
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",
  //   },
  //   {
  //     key: '2',
  //     // user_record: '',
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",

  //   },
  //   {
  //     key: '3',
  //     // user_record: '',
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",

  //   },
  //   {
  //     key: '4',
  //     // user_record: '',
  //     username: "adisai_t",
  //     name: "นายอดิศัย ทองไทย",
  //     department: "แขวงทางหลวงชนบทพังงา",
  //     position: "นายช่างโยธาอาวุโส",
  //     role: "หัวหน้าหน่วยชั่งน้ำหนัก  ",
  //     group: "ผู้ใช้งาน",

  //   },
  // ];

  const columns = [
    // {
    //   title: "",
    //   key: "user_record",
    //   dataIndex: "user_record",
    //   width: 50,
    //   render: (value, record, index) => {
    //     return (
    //       <Radio
    //         value={index + 1}
    //         onChange={(e) => onChangeRadio(e.target.value, index + 1)}
    //         checked={radioChecked ? true : false}
    //       />
    //     )
    //   }
    // },
    {
      title: "Username",
      key: "Username",
      dataIndex: "Username",
      width: 100,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      },
      sorter: (a, b) => a?.Username?.localeCompare(b?.Username)
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "Description",
      dataIndex: "Description",
      width: 200,
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      },
      sorter: (a, b) => a?.Description?.localeCompare(b?.Description)
    },
    // {
    //   title: "หน่วยงาน",
    //   key: "department",
    //   dataIndex: "department",
    //   width: 200,
    // },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#5671EE',
          }
        }
      }}
    >
      <Table
        columns={columns}
        dataSource={ldapUserList || []}
        loading={loading}
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
        scroll={{ x: 500 }}
        rowSelection={{
          type: 'radio',
          onChange: (key, row) => onTableChange(key, row)
        }}
      />
    </ConfigProvider>
  );
};

export default React.memo(TableUser);
