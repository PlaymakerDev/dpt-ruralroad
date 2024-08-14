
import Image from 'next/image';
import doe1 from '@/public/images/doe1.gif'

const Webcam = () => {
  
  return (
    <>
    <div className='w-full h-full bg-blue-700 rounded-lg overflow-hidden border border-blue-500'>
    <Image 
        src={doe1} 
        alt="Example Image" 
        width={500} 
        height={300} 
        layout="fixed" 
      />
    </div>

  </>
  )
}

export default Webcam