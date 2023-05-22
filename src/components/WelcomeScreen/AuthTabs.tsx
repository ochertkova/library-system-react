import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'

function AuthTabs() {
  const [value, setValue] = useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: { md: '400px', xs: 1 }, typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Authentication tabs">
            <Tab label="LOG IN" value="1" />
            <Tab label="SIGN UP" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ p: 3 }}>
            <SignIn />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <SignUp />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
export default AuthTabs
