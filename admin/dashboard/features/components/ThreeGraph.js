import { Card } from 'antd';

const ThreeGraph = () => {
  return (
    <>
    <Card title="Card title" style={{ width: '100%',height:'100%',borderRadius:20 }}>
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    
  </Card>

  </>
  )
}

export default ThreeGraph