import React from 'react'
import DateFilter from './DateFilter'
import SummaryPanels from './SummaryPanels'
import {makeStyles, Box} from '@material-ui/core'
import Graph from './Graph'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
        textAlign: 'center',
        width: '100%',
        padding: '20px',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '1%'
    }
})

const Dashboard: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root} boxShadow={4}>
            <div className={classes.header}>
                <SummaryPanels />
                <DateFilter />
            </div>

            <Graph />
        </Box>
    )
}

export default Dashboard
