import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import {
  Typography,
  IconButton,
  Toolbar,
  Divider,
  List,
  Link,
  Drawer,
  ListItemButton,
  ListItemText,
  useMediaQuery
} from '@mui/material'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material'

import { AppBarProps } from '../types'
import { getResourceTypeList } from '../helpers'

export const BurgerMenu = () => {
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')
  const [resources, setResources] = useState(null)
  const [open, setOpen] = useState(isTabletOrLarger)
  const toggleDrawer = () => setOpen(v => !v)
  const navigate = useNavigate()

  useEffect(() => {
    getResourceTypeList().then(data => setResources(data)) // TODO Pass as props (use from loader function)
  }, [])

  const drawerWidth = 180

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))

  if (!resources) return null
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" noWrap>
            <Link href="/" color="inherit" underline="none">
              Star Wars Resources
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography component="h2" variant="h6" sx={{ flexGrow: 1, marginLeft: 1 }}>
            Resources
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Object.keys(resources).map(category => (
            <ListItemButton key={category} onClick={() => navigate(`/resources/${category}`)}>
              <ListItemText primary={`${category.charAt(0).toUpperCase()}${category.slice(1)}`} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  )
}
