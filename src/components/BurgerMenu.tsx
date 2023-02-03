import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import {
  Typography,
  IconButton,
  Toolbar,
  Divider,
  Box,
  List,
  Link,
  Drawer,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  CircularProgress
} from '@mui/material'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material'

import { AppBarProps, ResourceTypeList } from '../types'
import { getResourceTypeList } from '../helpers'
import { SearchBar } from './SearchBar'

const BurgerMenuForMemo = () => {
  const navigate = useNavigate()
  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  const [resources, setResources] = useState<ResourceTypeList | null | undefined>(null)
  const [resourcesAreLoading, setResourcesAreLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(isTabletOrLarger)

  const toggleDrawer = () => setOpen(v => !v)

  useEffect(() => {
    setResourcesAreLoading(true)
    getResourceTypeList().then(data => {
      setResources(data)
      setResourcesAreLoading(false)
    })
  }, [])

  const drawerWidth = isTabletOrLarger ? '180px' : '100vw'

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: `${drawerWidth}`,
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

  if (resourcesAreLoading) return <CircularProgress />
  if (!resources) return null
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{
          width: '100%',
          display: 'flex',
          flexDirection: isMobileOrLarger ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: isMobileOrLarger ? 'center' : 'start'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 0.5,
            ...(!isMobileOrLarger && { marginTop: 1 })
          }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                marginRight: 0.5,
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" noWrap>
              <Link href="/" color="inherit" underline="none">
                Star Wars Resources
              </Link>
            </Typography>
          </Box>
          <SearchBar />
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

export const BurgerMenu = memo(BurgerMenuForMemo)
