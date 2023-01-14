
export default function Image(props){
  const {
    src,
    style,
    className
  } = props;
  return(
    <img src={src} style={style} className={className} />
  )
}