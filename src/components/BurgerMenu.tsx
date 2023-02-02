import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled, alpha } from '@mui/material/styles'
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
  InputBase
} from '@mui/material'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Search as SearchIcon
} from '@mui/icons-material'

import { AppBarProps, ResourceTypeList } from '../types'
import { getResourceTypeList, searchResource } from '../helpers'

export const BurgerMenu = () => {
  const navigate = useNavigate()
  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  const [resources, setResources] = useState<ResourceTypeList | null | undefined>(null) // TODO Remove undefined
  const [open, setOpen] = useState<boolean>(isTabletOrLarger)

  const toggleDrawer = () => setOpen(v => !v)

  useEffect(() => {
    getResourceTypeList().then(data => setResources(data)) // TODO Pass as props (use from loader function)
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

  const Search = styled('form')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        // width: '12ch',
        width: '20ch',
        '&:focus': {
          // width: '20ch',
          width: '28ch',
        },
      },
    },
  }))

  const searchInputRef = useRef(null)

  const handleSearchbarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const results = await searchResource('people', (searchInputRef.current as any)?.children[0].value) // TODO
    // console.log(results)

    navigate(`/search/${encodeURI((searchInputRef.current as any)?.children[0].value)}`)
  }

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
          <Search
            sx={{
              ...(!isMobileOrLarger && { marginTop: 1, marginBottom: 2 }),
              ...(isMobileOrLarger && !isTabletOrLarger && { marginLeft: 2 })
            }}
            onSubmit={handleSearchbarSubmit}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              ref={searchInputRef}
              placeholder={isMobileOrLarger && !isTabletOrLarger ? 'Search...' : 'Search resources...'}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
