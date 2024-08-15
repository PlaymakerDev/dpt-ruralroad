import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '@/features/orgsetupplan/style/osp.module.css';
export const columns = [
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
       <span style={{ display: 'flex', alignItems: 'center' }}>
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => handleEdit(record.key)}
          style={{ marginRight: 8 }}
        />
        <Button 
          type="text" 
          icon={<DeleteOutlined className="red-icon" />} 
          onClick={() => handleDelete(record.key)}
        />
      </span>
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
      'edit': 0,
      'delete': 0,
    });
  }
  
  return data;
};
export const dataSource = generateDataSource(10); // Change 10 to the number of rows you need




