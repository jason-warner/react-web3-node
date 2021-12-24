import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SummarizeIcon from '@mui/icons-material/Summarize';
import './Drawer.css';
import logo from '../../assets/logo.svg';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [hoverBool, sethoverBool] = React.useState([]);

    const conditionalColor = (index) => {
        return hoverBool.forEach((e, i) => {
            if (index === i) {
                return (hoverBool[i].hover) ? { color: '#FFF' } : { color: '#1e1f26' };
            }
        })
    }

    const listIcons = [
        <InfoIcon sx={conditionalColor(0)} />,
        <AnalyticsIcon sx={conditionalColor(1)} />,
        <AutoGraphIcon sx={conditionalColor(2)} />,
        <SummarizeIcon sx={conditionalColor(3)} />
    ]

    const defaultState = Array.from(listIcons, (e, i) => e = { index: i, hover: false })
    const [hover, setHover] = React.useState(defaultState);


    const hoverHandler = (index, bool) => {
        const newArr = Array.from(hover);
        newArr[index].hover = bool;
        setHover(newArr);
        sethoverBool(newArr);
    }

    // React.useEffect(() => console.log(hover[0]), [hover]);
    React.useEffect(() => console.log(hoverBool[0]), [hoverBool]);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ textAlign: 'center', backgroundColor: '#131417' }}>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ color: '#FFF', mr: 2, ...(open && { display: 'none' }), "&:hover": { backgroundColor: "#61dafb", color: '#1e1f26' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="text-center w-full flex justify-center">
                        <div className="inline-flex" style={{ marginRight: '45px' }}>
                            <h1 className="text-2xl justify-center"> TRAQ </h1>
                            <img src={logo} className="App-logo h-full self-center" alt="logo" />
                            <h1 className="text-2xl justify-center"> COIN </h1>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#1e1f26',
                        color: '#FFF',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{ color: "#FFF", "&:hover": { backgroundColor: "#61dafb", color: '#1e1f26' } }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['About', 'Analytics', 'Charts', 'Reports'].map((text, index) => (
                        <ListItem
                            onMouseEnter={() => hoverHandler(index, true)}
                            onMouseLeave={() => hoverHandler(index, false)}
                            button
                            key={text}
                            sx={{ "&:hover": { backgroundColor: "#61dafb", color: '#1e1f26' } }}
                        >
                            <ListItemIcon >
                                {listIcons[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
