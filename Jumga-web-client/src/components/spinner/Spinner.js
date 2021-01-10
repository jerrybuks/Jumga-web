import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core';

export default function Spinner() {
    return (
        <div>
            <Grid container alignItems="center" justify="center" style={{ minHeight: '96%' }}>
                <CircularProgress />
            </Grid>
        </div>
    )
}
