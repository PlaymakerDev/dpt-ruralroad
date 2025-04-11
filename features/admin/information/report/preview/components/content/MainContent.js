import React, { useState, useEffect, useMemo } from 'react'
import { Typography, Button, Dropdown, Space } from 'antd';
import { PreviewContent } from '../content'
import { DownOutlined } from '@ant-design/icons'
import config from '@/config'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { getDepartment, getDepartmentAll, getStation, getWIM } from '@/store/features/masterSlice';

const MainContent = (props) => {
  const { id, description, key } = props
  const [urlCallData, setUrlCallData] = useState("");
  const [urlCallData2, setUrlCallData2] = useState("");
  const [urlCallDataExcel, setUrlCallDataExcel] = useState("");
  const [urlCallDataExcel2, setUrlCallDataExcel2] = useState("");

  const [apiGetstationData, stationDataLoading, stationData] = useGetAPI('overlay', {
    funcDispatch: getStation, reducerName: 'master', reducerKey: 'station'
  })

  const [apiGetwinData, winDataLoading, wimData] = useGetAPI('overlay', {
    funcDispatch: getWIM, reducerName: 'master', reducerKey: 'wim'
  })
  const [apiGetdepartmentData, departmentDataLoading, departmentData] = useGetAPI('overlay', {
    funcDispatch: getDepartmentAll, reducerName: 'master', reducerKey: 'departments'
  })
  const [apiGetDepartmentFilter, loadingDepartmentFilter, departmentFilterData] = useGetAPI('overlay', {
    funcDispatch: getDepartment, reducerName: 'master', reducerKey: 'departments'
  })

  



  const items = useMemo(() => [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href={urlCallData}>
          PDF File
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href={urlCallDataExcel}>
          Excel File
        </a>
      ),
    }
  ], [urlCallData, urlCallDataExcel]);


  const onDownload = (url) => {
    // Check if id (or key) is '7', then set URL for `urlCallData2`
    if (url.indexOf('?') >= 0) {
      setUrlCallData(`${url}&file_type=pdf`);
      setUrlCallDataExcel(`${url}&file_type=xlsx`);
    } else {
      setUrlCallData(`${url}?file_type=pdf`);
      setUrlCallDataExcel(`${url}?file_type=xlsx`);
    }
  };

  useEffect(() => {
    apiGetstationData(`/api/v1/masters/station`, {}, false)
    apiGetwinData(`/api/v1/masters/wim`, {}, false)
    apiGetdepartmentData(`/api/v1/masters/departments_all`, {}, false)
    apiGetDepartmentFilter(`/api/v1/masters/departments?page=1&page_size=2000000&order=ASC&type=1`,{},false)


    // This effect runs every time urlCallData changes
    if (urlCallData) {
    }
    if (urlCallDataExcel) {
    }
    if (urlCallData2) {
    }
    if (urlCallDataExcel2) {
    }
  }, [urlCallData, urlCallDataExcel, urlCallData2, urlCallDataExcel2, id, key]); // Dependency array includes urlCallData


  return (
    <div>
      <section className='flex justify-between'>
        <div>
          <Typography.Title level={3} className='!m-0'>{description}</Typography.Title>
        </div>
        <div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
              >
                {/* <Button className='!border-[#0594A4] !bg-[#0594A4] !text-white !p-4 !font-bold !rounded-xl'>
                  ดาวโหลดไฟล์
                  <DownOutlined />
                </Button> */}
                <Button
                  className='!border-[#0594A4] !bg-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold !rounded-xl'
                  icon={<DownOutlined />}
                >
                  ดาวโหลดไฟล์
                </Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </section>
      <section className='mt-5'>
        <PreviewContent
          onDownload={onDownload}
          urlEndpoint={config.hostBackend}
          autoFetchOnFirst
          // data={data.all}
          stationData={stationData.all}
          wimData={wimData.all}
          departmentData={departmentData.all.data}
          departmentFilter={departmentFilterData?.overview?.data}
        />
      </section>
    </div>
  );
};

export default React.memo(MainContent);
