import React, { useState } from 'react';
import { Table, ConfigProvider, Button, Modal, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '@/features/orgsetupplan/style/tableblack.module.css';
import '@/features/orgsetupplan/style/osp.module.css';
import Typography from 'antd/es/typography/Typography';

const OpsTable = () => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'รหัสปลายทาง',
      dataIndex: 'locate',
      key: 'locate',
    },
    {
      title: 'รวม',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'ตุลาคม',
      dataIndex: '10',
      key: '10',
    },
    {
      title: 'พฤศจิกายน',
      dataIndex: '11',
      key: '11',
    },
    {
      title: 'ธันวาคม',
      dataIndex: '12',
      key: '12',
    },
    {
      title: 'มกราคม',
      dataIndex: '1',
      key: '1',
    },
    {
      title: 'กุมภาพันธ์',
      dataIndex: '2',
      key: '2',
    },
    {
      title: 'มีนาคม',
      dataIndex: '3',
      key: '3',
    },
    {
      title: 'เมษายน',
      dataIndex: '4',
      key: '4',
    },
    {
      title: 'พฤษภาคม',
      dataIndex: '5',
      key: '5',
    },
    {
      title: 'มิถุนายน',
      dataIndex: '6',
      key: '6',
    },
    {
      title: 'กรกฎาคม',
      dataIndex: '7',
      key: '7',
    },
    {
      title: 'สิงหาคม',
      dataIndex: '8',
      key: '8',
    },
    {
      title: 'กันยายน',
      dataIndex: '9',
      key: '9',
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined className="red-icon" />}
            onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ];

  const generateDataSource = (numRows) => {
    const data = [];

    for (let i = 1; i <= numRows; i++) {
      data.push({
        key: i.toString(),
        no: i.toString(),
        locate: `Location ${String.fromCharCode(65 + i % 26)}`, // Generate dummy locations (A, B, C, ...)
        total: 0,
        '10': 0,
        '11': 0,
        '12': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
      });
    }

    return data;
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setEditModalVisible(true);
  };

  const handleDelete = (record) => {
    setCurrentRecord(record);
    setDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setEditModalVisible(false);
    setDeleteModalVisible(false);
  };

  const handleConfirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting record:', currentRecord);
    setDeleteModalVisible(false);
  };

  const dataSource = generateDataSource(7);

  return (
    <section className='w-full bg-gradient border border-lightblue rounded-lg mt-4'>
      <div className='rounded-lg overflow-hidden'>
        <div className='overflow-auto'>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: '#194250'
                }
              },
              token: {
                colorText: 'black'
              }
            }}
          >
            <Table
              dataSource={dataSource}
              columns={columns}
              scroll={{ x: 1600 }}
              pagination={false}
            />
          </ConfigProvider>
        </div>
      </div>

      <Pagination align="center" style={{ margin: 20 }} defaultCurrent={1} total={50} />

      {/* Edit Modal */}
      <Modal
        title="แก้ไขข้อมูล"
        open={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Typography.Title level={5}>
            รหัสปลายทาง {currentRecord?.locate}
          </Typography.Title>
          {/* Add your edit form or other content here */}
          <p>Here you can add a form or other details to edit the record.</p>
        </div>

      </Modal>

      {/* Delete Modal */}
      <Modal
        title="ต้องการลบหรือไม่"
        open={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancel}
      >
        <div>
          <Typography.Title level={5}>
            รหัสปลายทาง {currentRecord?.locate}
          </Typography.Title>
          <p>หากทำการลบแล้วจะไม่สามารถกู้คืนข้อมูลได้อีก</p>
        </div>

      </Modal>
    </section >
  );
};

export default OpsTable;
