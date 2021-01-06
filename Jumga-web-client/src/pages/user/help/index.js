import React from 'react'
import Navigation from '../../../components/navigation'
import { Typography, Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

export default function Help() {
    const theme = useTheme();
    return (
        <div>
            <Navigation path="help">
                <Box p={1}>
                <Typography component="p">Kindly reach out to use at <Box component="span" color={theme.palette.primary.light}>owmbaesupport@gmail.com</Box> or dm us on  <a href="http://twitter.com"><Box component="span" color={theme.palette.primary.light}>twitter</Box></a> for support and assistance on any issue.</Typography>
                </Box>
              
            </Navigation>
        </div>
    )
}
