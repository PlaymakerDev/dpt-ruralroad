
import { Layout } from 'antd';
const { Content } = Layout;

const DashboardContent = ({children}) => {


  return (
    <Content
        style={{
          padding: '36px',
          backgroundColor:'#030918'
        }}
      >
        <div
          style={{
            minHeight: 280,
          }}
        >
          {children}
        </div>
      </Content>
  )
}

export default DashboardContent