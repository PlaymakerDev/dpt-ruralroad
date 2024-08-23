import React from "react";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TableEstablishUnit = (props) => {
  const { setOpen } = props;

  const generateDataSource = (numRows) => {
    const data = [];

    for (let i = 1; i <= numRows; i++) {
      data.push({
        key: i.toString(),
        no: i.toString(),
        destinate_code: `Location ${String.fromCharCode(65 + i % 26)}`,
        total: 0,
        october: 0,
        november: 0,
        december: 0,
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
      });
    }

    return data;
  };

  const oddTable = (_, rowIndex) => ({
    style: {
      backgroundColor: rowIndex % 2 === 0 ? '#205466' : '#194250'
    },
  });

  const columns = [
    {
      title: 'ลำดับ',
      key: 'no',
      dataIndex: 'no',
      align: 'center',
      width: 100,
      onCell: oddTable,
    },
    {
      title: 'รหัสปลายทาง',
      key: 'destinate_code',
      dataIndex: 'destinate_code',
      align: 'center',
      width: 200,
      onCell: oddTable,
    },
    {
      title: 'รวม',
      key: 'total',
      dataIndex: 'total',
      align: 'center',
      width: 100,
      onCell: oddTable,
    },
    {
      title: 'ตุลาคม',
      key: 'october',
      dataIndex: 'october',
      align: 'center',
      width: 100,
    },
    {
      title: 'พฤศจิกายน',
      key: 'november',
      dataIndex: 'november',
      align: 'center',
      width: 100,
    },
    {
      title: 'ธันวาคม',
      key: 'december',
      dataIndex: 'december',
      align: 'center',
      width: 100,
    },
    {
      title: 'มกราคม',
      key: 'january',
      dataIndex: 'january',
      align: 'center',
      width: 100,
    },
    {
      title: 'กุมภาพันธ์',
      key: 'february',
      dataIndex: 'february',
      align: 'center',
      width: 100,
    },
    {
      title: 'มีนาคม',
      key: 'march',
      dataIndex: 'march',
      align: 'center',
      width: 100,
    },
    {
      title: 'เมษายน',
      key: 'april',
      dataIndex: 'april',
      align: 'center',
      width: 100,
    },
    {
      title: 'พฤษภาคม',
      key: 'may',
      dataIndex: 'may',
      align: 'center',
      width: 100,
    },
    {
      title: 'มิถุนายน',
      key: 'june',
      dataIndex: 'june',
      align: 'center',
      width: 100,
    },
    {
      title: 'กรกฎาคม',
      key: 'july',
      dataIndex: 'july',
      align: 'center',
      width: 100,
    },
    {
      title: 'สิงหาคม',
      key: 'august',
      dataIndex: 'august',
      align: 'center',
      width: 100,
    },
    {
      title: 'กันยายน',
      key: 'september',
      dataIndex: 'september',
      align: 'center',
      width: 100,
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: () => {
        return (
          <div className='inline-flex flex-wrap items-center gap-5'>
            <EditOutlined
              className='!cursor-pointer'
              onClick={() => setOpen({ open: true })}
            />
            <DeleteOutlined
              className='!cursor-pointer !text-[#FF4a4a]'
            />
          </div>
        )
      }
    },
  ];

  return (
    <Table
      dataSource={generateDataSource(7)}
      columns={columns}
      scroll={{ x: 1600 }}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  );
};

export default React.memo(TableEstablishUnit);
