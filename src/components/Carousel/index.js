import Carousel from 'react-material-ui-carousel';
import Image from '../Image';

export default function CustomCarousel(props){
  const {
    images,
    style,
    className
  } = props;
  return(
    <Carousel autoPlay sx={{width:'98%', margin:'auto'}}>
      {images.map(item=>(
        <Image src={item} style={style} className={className} />
      ))}
    </Carousel>
  )
}