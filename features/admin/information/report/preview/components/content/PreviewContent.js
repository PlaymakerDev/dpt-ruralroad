import React, { useState, useCallback, useEffect, useForm } from 'react'
import { useRouter } from 'next/router'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Input, Button, Space, Row, Col, Radio, Flex, ConfigProvider, InputNumber, Select, Empty, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { DatePicker } from 'antd'
import locale from 'antd/locale/th_TH';
import dayjs from "dayjs";
import buddhistEra from 'dayjs/plugin/buddhistEra';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/th';

import th_TH from 'antd/es/date-picker/locale/th_TH';
import thLocale from 'antd/locale/th_TH';
import th from 'antd/es/date-picker/locale/th_TH';
// import dayjs from 'dayjs';
// import buddhistEra from 'dayjs/plugin/buddhistEra';
// dayjs.extend(buddhistEra);

dayjs.extend(buddhistEra);
dayjs.extend(localeData);
dayjs.locale('th');

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Color } from 'antd/es/color-picker';
import { OPTION_MONTH } from '@/utils/constant';

const buddhistLocale = {
  ...th,
  lang: {
    ...th.lang,
    fieldDateFormat: 'BBBB-MM-DD', // รูปแบบวันที่
    fieldDateTimeFormat: 'BBBB-MM-DD HH:mm:ss', // รูปแบบวันที่และเวลา
    yearFormat: 'BBBB', // ปีในรูปแบบ พ.ศ.
    cellYearFormat: 'BBBB', // ปีในรูปแบบ พ.ศ. ใน Cell
    locale: 'th', // กำหนดภาษาเป็นไทย
  },
};

const PreviewContent = (props) => {
  const { onDownload, urlEndpoint = '', autoFetchOnFirst = false, autoSetURLOnFirst = true, stationData, wimData, departmentData, departmentFilter } = props


  const [urlCallData, setUrlCallData] = useState("");
  const [urlCallData2, setUrlCallData2] = useState("");
  const [urlCallDataExcel, setUrlCallDataExcel] = useState("");
  const [urlCallDataExcel2, setUrlCallDataExcel2] = useState("");
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed
    let buddhistYear = currentDate.getFullYear() + 543;

    // Increment year if the month is October or later (Thai fiscal year logic)
    if (currentMonth >= 10) {
      buddhistYear += 1;
    }
    return buddhistYear.toString();
  });

  const [station, setStation] = useState("1");
  const [department, setDepartment] = useState("1");
  const [department95, setDepartment95] = useState("95");
  const [option, setOption] = useState("cumulative")
  const [loading, setLoading] = useState(false)
  // const [startDate, setStartDate] = useState(dayjs().startOf('month'));
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const { RangePicker } = DatePicker;
  // GET DEFAULT LAYOUT
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const router = useRouter()
  const { key, description, urlPreview } = router.query

  const handleRangeChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
      // let paramQuery = `?start_date=${startDate}&end_date=${endDate}&department_id=${department}`
      // let updateUrl = urlPreview.split('?')[0]
      // onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
      // setStartDate(e.target.value);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const selectStartDate = (startDate) => {
    if (startDate) {
      setStartDate(startDate)
    } else {
      setStartDate(null);
    }
  }

  const selectEndDate = (endDate) => {
    if (endDate) {
      setEndDate(endDate)
    } else {
      setEndDate(null);
    }
  }


  const options = [
    {
      label: 'รายงานสะสม',
      value: 'cumulative',
    },
    {
      label: 'รายงานประจำเดือน',
      value: 'monthly',
    }
  ];

  const options2 = [
    {
      label: 'รายงานประจำเดือน',
      value: 'monthly',
    }
  ];

  const handleChange = (e) => {

    if (e.target.name === 'year') setYear(e.target.value);
    if (e.target.name === 'month') setMonth(e.target.value);

    // updateUrls = urlPreview.split('?')[0]
    


    if (key == '1') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
    }
    if (key == '2') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
    }
    if (key == '3') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'month') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setMonth(e.target.value);
      }
      if (e.target.name == 'option') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setOption(e.target.value);
        setMonth(prev => prev || OPTION_MONTH[0].value);
      }
    }
    if (key == '4') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'month') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setMonth(e.target.value);
      }
      if (e.target.name == 'option') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setOption(e.target.value);
        setMonth(prev => prev || OPTION_MONTH[0].value);
      }
    }
    if (key == '5') {
      if (e.target.id == 'year') {
        let paramQuery = `year_type=be_year&plan_year=${year}&option=monthly&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'month') {
        let paramQuery = `year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setMonth(e.target.value);
      }
      if (e.target.name == 'option') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setOption(e.target.value);
        setMonth(prev => prev || OPTION_MONTH[0].value);
      }
    }
    if (key == '6') {
      if (e.target.id == 'year') {
        let paramQuery = `year_type=be_year&plan_year=${year}&option=cumulative&month=${month}&station_type_id=2`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'month') {
        let paramQuery = `year_type=be_year&plan_year=${year}&option=cumulative&month=${month}&station_type_id=2`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setMonth(e.target.value);
      }
      if (e.target.name == 'option') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}&station_type_id=2`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setOption(e.target.value);
        setMonth(prev => prev || OPTION_MONTH[0].value);
      }
    }
    if (key == '7') {
      if (e.target.id == 'year') {
        let paramQuery = ``
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
    }
    if (key == '8') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&station_id=${station}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'station') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&station_id=${station}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setStation(e.target.value);
      }
    }
    if (key == '9') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&station_id=${station}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'station') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&station_id=${station}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setStation(e.target.value);
      }
    }
    if (key == '10') {
      if (e.target.id == 'year') {
        let paramQuery = `/${year}/${station}`
        let updateUrl = urlPreview.split(/\/$/)[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'station') {
        let paramQuery = `/${year}/${station}`
        let updateUrl = urlPreview.split(/\/$/)[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setStation(e.target.value);
      }
    }
    if (key == '11') {
      let paramQuery = `?year_type=ce_year&plan_year=${year}&option=cumulative&plan_month=${month}&station_id=${station}`
      let updateUrl = urlPreview.split('?')[0]
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)

    }
    if (key == '12') {
      let paramQuery = `?year_type=ce_year&plan_year=${year}&station_id=${station}&plan_month=${month}`
      let updateUrl = urlPreview.split('?')[0]
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
      
      // setYear(e.target.value);

    }
    if (key == '13') {
      if (e.target.id == 'year') {
        let paramQuery = `?year=${year}&year_type=be_year&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'month') {
        let paramQuery = `?year=${year}&year_type=be_year&month=${month}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setStation(e.target.value);
      }
      if (e.target.name == 'option') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}&station_type_id=2`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setOption(e.target.value);
        setMonth(prev => prev || OPTION_MONTH[0].value);
      }
    }
    if (key == '14') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&department_id=${department}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'department') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&department_id=${department}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setDepartment(e.target.value);
      }
    }
    if (key == '15') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
    }
    if (key == '16') {
      if (e.target.id == 'year') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&department_id=${department}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setYear(e.target.value);
      }
      if (e.target.id == 'department') {
        let paramQuery = `?year_type=be_year&plan_year=${year}&department_id=${department}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        // setDepartment(e.target.value);
      }
    }
    if (key == '17') {
      if (e.target.id == 'startDate') {
        let paramQuery = `?start_date=${startDate}&end_date=${endDate}&department_id=${department}`
        // let paramQuery = `?start_date=2024-08-01&end_date=2024-08-31&department_id=${department}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setStartDate(e.target.value);
      }
      if (e.target.id == 'endDate') {
        let paramQuery = `?start_date=${startDate}&end_date=${endDate}&department_id=${department}`
        // let paramQuery = `?start_date=2024-08-01&end_date=2024-08-31&department_id=${department}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        setEndDate(e.target.value);
      }
      if (e.target.id == 'department') {
        let paramQuery = `?start_date=${startDate}&end_date=${endDate}&department_id=${department}`
        // let paramQuery = `?start_date=2024-08-01&end_date=2024-08-31&department_id=${department}`
        let updateUrl = urlPreview.split('?')[0]
        onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        // setDepartment(e.target.value);
      }
    }
  }

  function handleClick() {
    if (loading) return
    setLoading(false)

    if (key == '1') {
      try {
        let paramQuery = `?year_type=be_year&plan_year=${year}`
        let updateUrl = urlPreview.split('?')[0]
        if (year) {
          setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
          setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
          onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
        }
      } catch (e) {
      }
    }
    if (key == '2') {
      let paramQuery = `?year_type=be_year&plan_year=${year}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '3') {
      let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '4') {
      let paramQuery = `?year_type=be_year&plan_year=${year}&option=cumulative&month=${month}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '6') {
      let paramQuery = `?year_type=be_year&plan_year=${year}&option=${option}&month=${month}&station_type_id=2`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '5') {
      setOption('monthly')
      let paramQuery = `?year_type=be_year&plan_year=${year}&option=monthly&month=${month}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)

      // setMonth('monthly')
      // setOption('monthly')
    }
    if (key == '7') {

      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData2(`${urlEndpoint}${updateUrl}?file_type=pdf`)
      setUrlCallDataExcel2(`${urlEndpoint}${updateUrl}?file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}`)

    }
    if (key == '8') {
      let paramQuery = `?year_type=be_year&plan_year=${year}&station_id=${station}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '9') {
      let paramQuery = `?year_type=be_year&plan_year=${year}&station_id=${station}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '10') {
      let paramQuery = `/${year}/${station}`
      let updateUrl = urlPreview.split(/\/$/)[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}?file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}?file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '11') {
      let paramQuery = `?year_type=ce_year&plan_year=${year-543}&option=cumulative&plan_month=${month}&station_id=${station}`
      let updateUrl = urlPreview.split('?')[0]
      
      
      
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '12') {
      let paramQuery = `?year_type=ce_year&plan_year=${year-543}&station_id=${station}&plan_month=${month}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '13') {
      setOption('monthly')
      let paramQuery = `?year=${year}&year_type=be_year&month=${month}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '14') {
      let paramQuery = `?year_type=be_year&plan_year=${year}&department_id=${department}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '15') {
      let paramQuery = `?year_type=be_year&plan_year=${year}&department_group_id=${department}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '16') {
      // let paramQuery = `?year_type=be_year&plan_year=${year}`
      let paramQuery = `?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}&department_id=${department}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
    if (key == '17') {
      let paramQuery = `?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}&department_id=${department}`
      // let paramQuery = `?start_date=2024-08-01&end_date=2024-08-31&department_id=${department}`
      let updateUrl = urlPreview.split('?')[0]
      setUrlCallData(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=pdf`)
      setUrlCallDataExcel(`${urlEndpoint}${updateUrl}${paramQuery}&file_type=xlsx`)
      onDownload(`${urlEndpoint}${updateUrl}${paramQuery}`)
    }
  }

  useEffect(() => {
    if (autoFetchOnFirst) {
      handleClick()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetchOnFirst])

  const renderErrorComponent = useCallback(() => {
    // FALLBACK ERROR (NO GPT)
    setLoading(false)
    // RETURN EMPTY AS FALLBACK (NO GPT)
    return (
      <Empty
        description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
      />
    )
  }, [])


  let planYear;
  const currentYear = dayjs();
  const currentMonth = currentYear.month();

  if (currentMonth > 9) {
    planYear = currentYear.add(1, 'year');
  } else {
    planYear = currentYear;
  }

  const startYearBE = 2557;
  const endYearBE = planYear.format('BBBB')

  const disabledDate = (current) => {
    if (!current) return false;
    const currentYearBE = current.year() + 543;
    return currentYearBE < startYearBE || currentYearBE > endYearBE;
  };

  const handleYearChange = (date) => {
    if (date) {
      setYear(date.year() + 543);
    }
  };

  const valueInGregorianYear = dayjs((year - 543).toString(), 'YYYY');

  const dataPickerGenerate = () => {
    return (
      <DatePicker
        picker="year"
        name='year'
        disabledDate={disabledDate}
        format='BBBB'
        locale={buddhistLocale}
        onChange={handleYearChange}
        value={valueInGregorianYear}

      />
    )
  }

  const rangeDateGenerate = () => {
    return (
      <RangePicker
        onChange={handleRangeChange}
        format={(value) => value.format('DD MMMM BBBB')}
        placeholder={['เริ่มวันที่', 'สิ้นสุดวันที่']}
        value={[startDate, endDate]}
        locale={buddhistLocale}
      />
    )
  }

  const selectStartDateUI = () => {
    return (
      <DatePicker
        onChange={selectStartDate}
        format={(value) => value.format('DD MMMM BBBB')}
        locale={buddhistLocale}
        value={startDate}
      />
    )
  }

  const selectEndDateUI = () => {
    return (
      <DatePicker
        onChange={selectEndDate}
        format={(value) => value.format('DD MMMM BBBB')}
        locale={buddhistLocale}
        value={endDate}
      />
    )
  }

  const selectMonth = () => {
    return (
      <Select
        id='month'
        value={month}
        onChange={v => handleChange({ target: { id: 'month', value: v, name: 'month' } })}
        options={OPTION_MONTH}
        style={{ minWidth: 110 }}
      />
    )
  }




  return (
    <>
      <div >
        {key == '1' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ :</h1></Col>
            {/* <Col><Input id='year' name='year' onChange={handleChange} value={year} /></Col> */}
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>

          </Row>
        </div>}
        {key == '2' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>

          </Row>
        </div>}
        {key == '3' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ :</h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#ffffff',
                  Radio: { fontSize: 16 }
                }
              }}
            >
              <Col>
                <Flex vertical gap="middle" className='!text-white' >
                  <Radio.Group options={options} name='option' id='option' value={option} onChange={handleChange} />
                </Flex>
              </Col>
            </ConfigProvider>
            {option === 'monthly' && (
              <>
                <Col><h1 style={{ fontSize: '16px' }}> เดือน : </h1></Col>
                <Col>
                  {selectMonth()}
                </Col>
              </>
            )}
          </Row>
        </div>}
        {key == '4' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ :</h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#ffffff',
                  Radio: { fontSize: 16 }
                }
              }}
            >
              <Col>
                <Flex vertical gap="middle" className='!text-white' >
                  <Radio.Group options={options} name='option' id='option' value={option} onChange={handleChange} />
                </Flex>
              </Col>
            </ConfigProvider>
            {option === 'monthly' && (
              <>
                <Col><h1 style={{ fontSize: '16px' }}> เดือน : </h1></Col>
                <Col>
                  {selectMonth()}
                </Col>
              </>
            )}
          </Row>
        </div>}
        {key == '5' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ :</h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}>
                  ค้นหา
                </Button>
              </Space>
            </Col>
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#ffffff',
                  Radio: { fontSize: 16 }
                }
              }}
            >
              <Col>
                <Flex vertical gap="middle" className='!text-white' >
                  <Radio.Group options={options2} name='option' id='option' value={'monthly'} onChange={handleChange} />
                </Flex>
              </Col>
            </ConfigProvider>
            {option === 'monthly' && (
              <>
                <Col><h1 style={{ fontSize: '16px' }}> เดือน : </h1></Col>
                <Col>
                  {selectMonth()}
                </Col>
              </>
            )}
          </Row>
        </div>}
        {key == '6' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ :</h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
            <ConfigProvider
              theme={{
                token: {
                  // colorPrimary: '#ffffff', // Global primary color
                  colorText: '#ffffff', // General text color (but might not affect Radio text directly)
                },
                components: {
                  Radio: { fontSize: 16 }
                }
              }}
            >
              <Col>
                <Flex vertical gap="middle" className='!text-white' >
                  <Radio.Group options={options} name='option' id='option' value={option} onChange={handleChange} />
                </Flex>
              </Col>
            </ConfigProvider>
            {option === 'monthly' && (
              <>
                <Col><h1 style={{ fontSize: '16px' }}> เดือน : </h1></Col>
                <Col>
                  {selectMonth()}
                </Col>
              </>
            )}
          </Row>
        </div>}

        {key == '8' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> สถานี : </h1></Col>
            <Col>
              <Select
                className='w-80'
                id='station'
                value={station}
                onChange={v => {
                  setStation(v)
                }}
                options={stationData.map(station => ({
                  label: station.station_description,
                  value: station.station_id.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}

        {key == '9' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> สถานี : </h1></Col>
            <Col>
              {/* <Input id='station' onChange={handleChange} value={station} /> */}
              <Select
                className='w-80'
                id='station'
                value={station}
                onChange={v => {
                  setStation(v)
                }}
                options={wimData.map(station => ({
                  label: station.station_description,
                  value: station.station_id.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}

        {key == '10' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> สถานี : </h1></Col>
            <Col>
              <Input id='station' onChange={handleChange} value={station} />
              <Select
                className='w-80'
                id='station'
                value={station}
                onChange={v => {
                  setStation(v)
                }}
                options={stationData.map(station => ({
                  label: station.station_description,
                  value: station.station_id.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}

        {key == '11' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> รายงานประจำเดือน : </h1></Col>
            <Col>
              {selectMonth()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> สถานี : </h1></Col>
            <Col>
              {/* <Input id='station' onChange={handleChange} value={station} /> */}
              <Select
                className='w-80'
                id='station'
                value={station}
                onChange={v => {
                  setStation(v)
                }}
                options={wimData.map(station => ({
                  label: station.station_description,
                  value: station.station_id.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}

        {key == '12' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> รายงานประจำเดือน : </h1></Col>
            <Col>
              {selectMonth()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> สถานี : </h1></Col>
            <Col>
              {/* <Input id='station' onChange={handleChange} value={station} /> */}
              <Select
                className='w-80'
                id='station'
                value={station}
                onChange={v => {
                  setStation(v)
                }}
                options={wimData.map(station => ({
                  label: station.station_description,
                  value: station.station_id.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}



        {key == '13' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ :</h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
            <ConfigProvider
              theme={{
                token: {
                  // colorPrimary: '#ffffff', // Global primary color
                  colorText: '#ffffff', // General text color (but might not affect Radio text directly)
                },
                components: {
                  Radio: { fontSize: 16 }
                }
              }}
            >
              <Col>
                <Flex vertical gap="middle" className='!text-white' >
                  <Radio.Group options={options2} name='option' id='option' value={'monthly'} onChange={handleChange} />
                </Flex>
              </Col>
            </ConfigProvider>
            {option === 'monthly' && (
              <>
                <Col><h1 style={{ fontSize: '16px' }}> เดือน : </h1></Col>
                <Col>
                  {selectMonth()}
                </Col>
              </>
            )}
          </Row>
        </div>}

        {key == '14' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> หน่วยงาน : </h1></Col>
            {/* <Col><Input id='department' onChange={handleChange} value={department} /></Col> */}
            <Col>
              <Select
                className='w-80'
                id='department'
                value={department}
                onChange={v => {
                  setDepartment(v)
                }}
                options={departmentData.map(station => ({
                  label: station.name,
                  value: station.id.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}

        {key == '15' && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> ปีงบประมาณ : </h1></Col>
            <Col>
              {dataPickerGenerate()}
            </Col>
            <Col><h1 style={{ fontSize: '16px' }}> หน่วยงาน : </h1></Col>
            <Col>
              {/* <Input id='department' onChange={handleChange} value={department} /> */}
              <Select
                className='w-80'
                id='department'
                value={department}
                onChange={v => {
                  setDepartment(v)
                }}
                options={departmentFilter.map(station => ({
                  label: station?.name,
                  value: station?.group?.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>

            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}
        {(key == '17' || key == '16') && <div>
          <Row gutter={[16, 16]} align={'middle'}>
            <Col><h1 style={{ fontSize: '16px' }}> วันที่ : </h1></Col>
            {/* {rangeDateGenerate()} */}
            {selectStartDateUI()}
            <Typography.Text className='mx-2'> ถึง </Typography.Text>
            {selectEndDateUI()}
            <Col><h1 style={{ fontSize: '16px' }}> หน่วยงาน : </h1></Col>
            <Col>
              {/* <Input id='department' onChange={handleChange} value={department} /> */}
              <Select
                className='w-80'
                id='department'
                value={department}
                onChange={v => {
                  setDepartment(v)
                }}
                options={departmentData.map(station => ({
                  label: station.name,
                  value: station.id.toString()
                }))}
                dropdownRender={menu => (
                  <div style={{ whiteSpace: 'normal' }}>
                    {menu}
                  </div>
                )}

              />
            </Col>
            <Col>
              <Space>
                <Button
                  loading={loading}
                  onClick={handleClick}
                  className='!bg-[#0594A4] !border-[#0594A4] hover:!bg-[#45acb8] hover:!border-[#45acb8] !text-white !p-4 !font-bold'
                  icon={<SearchOutlined />}
                >
                  ค้นหา
                </Button>
              </Space>
            </Col>
          </Row>
        </div>}



        <div className='mt-8'>
          {urlCallData && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={urlCallData}
              plugins={[
                defaultLayoutPluginInstance,
              ]}
              onDocumentLoad={() => setLoading(false)}
              renderError={() => renderErrorComponent()}
            />
          </Worker>}
        </div>

        <div className='mt-8'>
          {urlCallData2 && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={urlCallData2}
              plugins={[
                defaultLayoutPluginInstance,
              ]}
              onDocumentLoad={() => setLoading(false)}
              renderError={() => renderErrorComponent()}
            />
          </Worker>}
        </div>
      </div>

    </>
  );
};

export default React.memo(PreviewContent);
