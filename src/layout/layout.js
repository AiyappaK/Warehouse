import React from 'react'
import ResponsiveDrawer from './sidebar';
import './layout.css'
import MenuDrawer from './menu';
import Box from '@mui/material/Box';
function Layout(props) {
    return (
        <>
            <Box sx={{ display: 'flex' }}>

                <ResponsiveDrawer />
                <MenuDrawer >
                    {props.children}
                </MenuDrawer>
            </Box>
        </>
    )
}

export default Layout