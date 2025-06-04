import React, { useCallback } from "react";
import { Table, Modal, Typography, Button, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Bin from "@/components/icon/Bin";
import Edit from "@/components/icon/Edit";
import { calculate_index } from '@/utils/calculator'
import stf from '@/utils/stringformat'
import useDeleteAPI from "@/utils/hooks/api/useDeleteAPI";
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import { allowAdmin } from "@/utils/allowAdmin";

const TableEstablishUnit = (props) => {
  const { setOpen, data, loading, page, perPage, total, onChange, apiGetData, role } = props
  const workplans = useSelector((state) => state.information.unit_establishment_plan.workplans)
  const [funcDelete, loadingDelete, dataDelete] = useDeleteAPI();
  const oddTable = (_, rowIndex) => ({
    style: {
      backgroundColor: rowIndex % 2 === 0 ? '#205466' : '#194250'
    },
  });

  const columns = [
    {
      title: 'ลำดับ',
      key: '',
      dataIndex: '',
      align: 'center',
      width: 100,
      onCell: oddTable,
      render: (item, record, index) => {
        return stf(calculate_index(index, page, perPage, total)).normal()
      }
    },
    {
      title: 'รหัสปลายทาง',
      key: 'way_code',
      dataIndex: 'way_code',
      align: 'center',
      width: 200,
      onCell: oddTable,
    },
    {
      title: 'รวม',
      key: 'plan_total',
      dataIndex: 'plan_total',
      align: 'center',
      width: 100,
      onCell: oddTable,
      sorter: (a, b) => Number(a.plan_total) - Number(b.plan_total)
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
      render: (item, record) => {
        // if (allowAdmin(role)) {
        return (
          <div className='inline-flex  items-center gap-5'>
            <Edit
              className='!cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setOpen({ open: true, is_updatable: true, info: record })
              }
              }
            />
            <Bin
              className='!cursor-pointer !text-[#FF4a4a]'
              onClick={(e) => {
                e.stopPropagation();
                confirm(record)
              }
              }
            />
          </div>
        )
        // }
      }
    },
  ];
  const DeleteRow = useCallback(async (record, workplans) => {
    const res = await funcDelete(
      `/api/v1/info/workplan_way/${record?.id}`,
      undefined,
      false
    );
    if (res?.success) {
      Modal.destroyAll();
      apiGetData(`/api/v1/info/workplan_way`, { ...workplans?.search, plan_year: workplans.search.plan_year ? workplans.search.plan_year : dayjs().format('YYYY') }, false, {})
      message.success(res?.message)
    } else {
      Modal.destroyAll();
    }
  }, [apiGetData, funcDelete]);

  const confirm = useCallback((record) => {
    Modal.confirm({
      title: <Typography.Text className='font-IBMPlexSansThaiBold' strong>{'ยืนยันการลบข้อมูลแผนจัดตั้งหน่วย ?'}</Typography.Text>,
      content: (
        <div className='flex flex-wrap flex-col items-start'>
          <Typography.Text className='font-IBMPlexSansThaiRegular'>{'ท่านต้องการยืนยันการลบแผนจัดตั้งหน่วยใช่หรือไม่'}</Typography.Text>
        </div>
      ),
      icon: <ExclamationCircleFilled style={{ color: '#E01E3C' }} />,
      maskClosable: true,
      footer: (
        <div className='mt-5 text-right'>
          <Button type="link" onClick={() => Modal.destroyAll()}><span className='underline font-IBMPlexSansThaiRegular' style={{ color: 'rgba(43, 43, 43, 0.8)' }}>ยกเลิก</span></Button>
          <Button type="text" loading={loadingDelete} style={{ backgroundColor: '#E01E3C' }} onClick={() => DeleteRow(record, workplans)}><span className='font-IBMPlexSansThaiRegular text-white'>ยืนยัน</span></Button>
        </div>
      ),
    })
  }, [loadingDelete, workplans, DeleteRow])

  return (
    <Table
      dataSource={data || []}
      columns={columns}
      scroll={{ x: 1600 }}
      loading={loading}
      rowClassName='!cursor-pointer'
      onRow={(record) => ({
        onClick: () => {
          setOpen({ open: true, is_updatable: true, info: record })
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

export default React.memo(TableEstablishUnit);
