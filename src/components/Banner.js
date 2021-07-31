import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box } from '@material-ui/core'



const useStyles = makeStyles({
    root: {
        backgroundColor: '#3f51b5',
        textAlign: 'left',
        padding: '20px',
        fontSize: 20,
        color: 'whitesmoke'
    }
})

const Banner = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.root} boxShadow={4}>
            {props.title}
        </Box>
    )
}

Banner.defaultProps = {
    title: 'banner default title'
}

Banner.propTypes = {
    title: PropTypes.string
}

export default Banner
