import React from 'react';
import { Typography, Grid } from '@material-ui/core';

class NotFound extends React.Component {


    render() {
        return(
            <Grid
            container
            spacing={0}
            align="center"
            justify="center"
            direction="column"
          >
            <Grid item>
                <Typography component={'h1'}
                    variant={'h1'}
                >
                        404
                </Typography>
                    <Typography component={'h1'}
                    variant={'h1'}
                >
                        The page you're looking for doens't exist.
                </Typography>
            </Grid>
          </Grid>
        )
    }
}

export default NotFound