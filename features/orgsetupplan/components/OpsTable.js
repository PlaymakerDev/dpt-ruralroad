import React, { useState } from 'react';
import { Table, ConfigProvider, Button, Modal, Pagination, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '@/features/orgsetupplan/style/tableblack.module.css';
import '@/features/orgsetupplan/style/osp.module.css';
import EditDataModal from './modal/EditDataModal';
import ConfirmDelete from './modal/ConfirmDelete';
import ResponseModal from './modal/ResponseModal';

const OpsTable = () => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isResponseModal, setIsResponseModal] = useState(false)
  const [responseModalData, setResponseModalData] = useState({
    icon: '',
    firstline: '',
    secondline: ''
  })

  const oddTable = (_, rowIndex) => ({
    style: {
      backgroundColor: rowIndex % 2 === 0 ? '#205466' : '#194250', // Even rows get #56E4EE, odd rows get white
    },
  });

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'no',
      key: 'no',
      onCell: oddTable,
    },
    {
      title: 'รหัสปลายทาง',
      dataIndex: 'locate',
      key: 'locate',
      onCell: oddTable,
    },
    {
      title: 'รวม',
      dataIndex: 'total',
      key: 'total',
      onCell: oddTable,
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
            icon={<DeleteOutlined className="red-icon" style={{ color: '#FF4A4A' }} />}
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
    setIsResponseModal(false)
  };

  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
  };

  const responseModalScreen = (e) => {
    console.log(e);
    handleCancel()
    switch (e) {
      case "edit-success":
        setResponseModalData({
          icon: 'success',
          firstline: 'บันทึกข้อมูลสำเร็จ',
          secondline: ''
        })
        break;
      case 'edit-error':
        setResponseModalData({
          icon: 'error',
          firstline: 'บันทึกข้อมูลไม่สำเร็จ',
          secondline: 'กรุณาลองใหม่อีกครั้ง'
        })
        break;
      case 'delete-success':
        setResponseModalData({
          icon: 'success',
          firstline: 'ลบข้อมูลสำเร็จ',
          secondline: ''
        })
        break;
      case 'delete-error':
        setResponseModalData({
          icon: 'error',
          firstline: 'ลบข้อมูลไม่สำเร็จ',
          secondline: 'กรุณาลองใหม่อีกครั้ง'
        })
        break;
      default:
        setResponseModalData({
          icon: 'error',
          firstline: 'No Data',
          secondline: 'No Data'
        })
    }
    setIsResponseModal(true)
  }
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
                colorText: 'white'
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
      <Pagination align="center" style={{ margin: 20 }} defaultCurrent={1} total={10000} defaultPageSize={10} showSizeChanger={false}  />
      {/* Edit Modal */}
      <Modal
        title="แก้ไขข้อมูล"
        open={isEditModalVisible}
        onCancel={handleCancel}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        cancelButtonProps={{
          style: { color: 'white', }
        }}
        footer={[
          <Button key="submit" type="primary" onClick={() => responseModalScreen('edit-success')}>
            ยืนยัน
          </Button>,
          <Button key="back" onClick={() => responseModalScreen('edit-error')} style={{ color: 'white', backgroundColor: 'transparent', borderColor: 'transparent' }}>
            ยกเลิก
          </Button>,
        ]}
      >
        <EditDataModal />
      </Modal>
      {/* Delete Modal */}
      <Modal
        title=""
        open={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancel}
        closable={false}
        footer={
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Button key="submit" type="primary" onClick={() => responseModalScreen('delete-error')} style={{ color: '#A4A4A4', backgroundColor: 'white', borderColor: 'white' }}>
                ยกเลิก
              </Button>
            </Col>
            <Col>
              <Button key="submit" type="primary" onClick={() => responseModalScreen('delete-success')} style={{ color: 'white', backgroundColor: '#56E4EE', borderColor: '#56E4EE' }}>
                ยืนยัน
              </Button>
            </Col>
          </Row>
        }
      >
        <ConfirmDelete />
      </Modal>

      <ResponseModal
        visible={isResponseModal}
        onClose={handleCancel}
        icon={responseModalData.icon} // or "error"
        firstline={responseModalData.firstline}
        secondline={responseModalData.secondline}
      />
      {/* Is Success Modal */}
      {/* <Modal
        title=""
        open={isSuccessModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        closable={false}
        footer={
          <Row justify="center">
            <Col>
              <Button key="submit" type="primary" onClick={handleCancel}>
                ตกลง
              </Button>
            </Col>
          </Row>
        }
      >
        <ResponseModal
          type={'success'}
          firstline={'บันทึกข้อมูลสำเร็จ'} />

      </Modal> */}
      {/* Is Error Modal */}
      {/* <Modal
        title=""
        open={isErrorModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        closable={false}
        footer={
          <Row justify="center">
            <Col>
              <Button key="submit" type="primary" onClick={handleCancel}>
                ตกลง
              </Button>
            </Col>
          </Row>
        }
      >
        <ResponseModal
          type={'error'}
          firstline={'บันทึกข้อมูลไม่สำเร็จ'}
          secondline={'กรุณาลองใหม่อีกครั้ง'} />

      </Modal> */}
    </section >
  );
};

export default OpsTable;
