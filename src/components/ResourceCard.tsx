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
  detailsPageUrl?: string
}

export const ResourceCard: FunctionComponent<ResourceCardProps> = ({
  title,
  detailsPageUrl
}) => {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.02)'
      }}
    >
      <CardContent>
        {title && (
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        )}
      </CardContent>
      {detailsPageUrl && (
        <CardActions>
          <Button
            size="small"
            onClick={() => navigate(detailsPageUrl)}
          >
            Read More
          </Button>
        </CardActions>
      )}
    </Card>
  )
}
