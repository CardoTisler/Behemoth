import { Button, Grid, makeStyles } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { showError } from "src/redux/actions/errorActions"
import { hideSuccess, showSuccess } from "src/redux/actions/successActions"
import { loadTransactions } from "src/redux/actions/transactionActions"
import { RootState } from "src/redux/reducers"

const useStyles = makeStyles({
    button: {
        width: '100%',
        height: '100%'
    }
})

const handleCsvExport = async () => {
    await fetch('transactions/export', { //create CSV file based on current items stored in db
        method: 'POST',
        mode: 'cors'
    }).then(async (res: any) => {
        const blob = await res.blob()
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'exported_'+new Date().toISOString().split('T')[0]+'.csv'
        link.click()
        setTimeout(() => URL.revokeObjectURL(link.href), 0)
    })
}

const CsvButtons = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const transactions = useSelector((state: RootState) => state.transactionReducer)
    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        e.preventDefault()
        let data = new FormData()
        if(e.target.files![0] !== null){
            data.append('csvUpload', e.target.files![0]);
        } else {
            dispatch(showError(`Can't upload file.`, `e.target.files[0] is null.`))
        }
        
        await fetch('/transactions/addcsv', {
            method: 'POST',
            mode:'cors',
            body: data
        })
        .then(res => res.json())
        .then(res => {

            if(res.status === 200){
                dispatch(showSuccess(res.statusText))
                setTimeout(() => {dispatch(hideSuccess())}, 4000);
                dispatch(loadTransactions(res.newItems))
            } else if (res.status === 500){
                dispatch(showError(`Uploading CSV file failed.`, res.statusText))
            } else {
                dispatch(showError(`Unknown error.`, res.statusText))
            }
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={1}>
                <input
                name="csvUpload"
                accept=".csv"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileSelected}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        Upload CSV
                    </Button>
                </label> 
            </Grid>
            <Grid item xs={1}>
                <Button
                variant='contained' 
                disabled={transactions.length === 0}
                component='span' 
                className={classes.button} 
                onClick={handleCsvExport}>
                    Export CSV
                </Button>
            </Grid>
        </Grid>
    )
}

export default CsvButtons
