import {useSelector, useDispatch} from 'react-redux'
import {Alert, AlertTitle} from '@material-ui/lab'
import { IconButton } from '@material-ui/core'
import { hideError } from '../../redux/actions/errorActions'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const ErrorToolbar = () => {
    const dispatch = useDispatch()
    const {showError, message, title} = useSelector(state => state.errorReducer)
    console.log(showError)
    return (
        <>
        {showError && 
            <Alert 
            severity='error'
            action={
                <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                    dispatch(hideError())
                }}>
                    <HighlightOffIcon />
                </IconButton>
            }>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        }
        </>
    )
}

export default ErrorToolbar
