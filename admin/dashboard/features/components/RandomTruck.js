import { Card } from 'antd';

const RandomTruck = () => {
  return (
    <>
    <Card title="Card title" style={{ width: '100%',height:'100%',borderRadius:10 }}>
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    
  </Card>

  </>
  )
}

export default RandomTruck