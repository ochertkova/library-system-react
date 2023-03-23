import { AppBar,Typography,Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonLink from "../ButtonLink/ButtonLink";  

const Header = () =>{
    return (
      <AppBar>
        <Toolbar>
          <Typography>
            This is Header!
          </Typography>
        </Toolbar>
</AppBar>
)
}

export default Header