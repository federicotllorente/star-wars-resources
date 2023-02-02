import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button
} from '@mui/material'

type ResourceCardProps = {
  title: string
  description: string
  detailsPageUrl: string
}

export const ResourceCard: FunctionComponent<ResourceCardProps> = ({
  title,
  description,
  detailsPageUrl
}) => {
  const navigate = useNavigate()

  return (
    <Card>
      <CardContent>
        {title && (
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {detailsPageUrl && (
          <Button
            size="small"
            onClick={() => navigate(detailsPageUrl)}
          >
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
