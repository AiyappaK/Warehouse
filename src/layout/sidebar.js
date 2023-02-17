import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Navigate, useNavigate } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MdOutlineInventory2} from 'react-icons/md';
import { TbTransferIn,TbTransferOut,TbReport } from "react-icons/tb";



const drawerWidth = 240;

const Item = [
    {
        id: '123',
        text: 'Products',
        path: '/products',
        icon: <MdOutlineInventory2 size="20px" style={{
            position: 'relative',
            //   top: '20px',
            left: '10px',
        }} />,
    },
    {
        id:'85',
        text: 'Transfer in',
        path: '/transferin',
        icon: <TbTransferIn size="20px" style={{
            position: 'relative',
            //   top: '20px',
            left: '10px',
        }}/>
       
    },
    {
        text: 'Transfer In Report',
        id:'855',
        path: '/transfer-in_report',
        icon: <TbReport size="20px" style={{
            position: 'relative',
            //   top: '20px',
            left: '10px',
        }}/>
    },
    {
        text: 'Transfer Out',
        id:'8585',

        path: '/transferout',

        icon: <TbTransferOut size="20px" style={{
            position: 'relative',
            //   top: '20px',
            left: '10px',
        }}/>
        
    },
    {
        text: 'Transfer Out Report',
        id:'852',

        path: '/transfer-out_report',
        icon: <TbReport size="20px" style={{
            position: 'relative',
            //   top: '20px',
            left: '10px',
        }}/>
    },
    {
        text: 'Vendor',
        id:'852',

        path: '/vendors',
        icon: <TbReport size="20px" style={{
            position: 'relative',
            //   top: '20px',
            left: '10px',
        }}/>
    },
]

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let navigate = useNavigate(); 

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {Item.map((text, index) => (

                    <ListItem key={text.id} disablePadding>
                        <ListItemButton onClick={()=>navigate(text.path)}>
                        {/* <ListItemButton to={text.path}> */}
                            <ListItemIcon>
                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
   
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
                    
        </>
    );
}

export default ResponsiveDrawer;