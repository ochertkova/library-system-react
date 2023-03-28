import { Typography, Box, TextField, Button, Stack } from '@mui/material'

const AddAuthor = () => {
  return (
    <Typography>
      <Stack spacing={2}>
        <Box> Add Author</Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off">
          <TextField id="outlined-basic" label="Add Author" variant="outlined" />
        </Box>
        <Box>
          <Button variant="contained">Add Author</Button>
        </Box>
      </Stack>
    </Typography>
  )
}

export default AddAuthor
