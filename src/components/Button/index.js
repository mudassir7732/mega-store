import { Box, Button, IconButton, Typography } from "@mui/material"
import Image from "../Image";

export default function CustomButton(props){
  const {
    title,
    onClick,
    variant,
    style,
    className,
    isIcon,
    isImage,
    imagePath,
    imageClassName,
    iconName,
  } = props;

  return(
    <Box>
      {isIcon?
        (
          <IconButton style={style} className={className} onClick={onClick} >
            {iconName}
          </IconButton>
        ):(
          isImage?
          (
            <Button onClick={onClick} >
              <Image src={imagePath} style={style} />
            </Button>
          ):(
          <Button variant={variant} className={className} endIcon={iconName} onClick={onClick}>
            {isIcon? null:(<Typography className={className} style={style}>{title}</Typography>)}  
          </Button>
          )
        )
      }
    </Box>
  )
}