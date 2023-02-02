import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@mui/material'

type ResourceCardProps = {
  title: string
  description: string
  // image: {
  //   alt: string
  //   url: string
  // }
  detailsPageUrl: string
}

export const ResourceCard: FunctionComponent<ResourceCardProps> = ({
  title,
  description,
  // image,
  detailsPageUrl
}) => {
  const navigate = useNavigate()

  return (
    <Card
      // sx={{ width: '33.33%' }}
    >
      {/* <CardMedia
        sx={{ height: 140 }}
        image={image.url}
        title={image.alt}
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(detailsPageUrl)}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
