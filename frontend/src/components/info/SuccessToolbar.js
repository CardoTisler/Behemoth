import {useDispatch, useSelector} from 'react-redux'
import {Alert} from '@material-ui/lab'
import { IconButton } from '@material-ui/core'
import { hideSuccess } from '../../redux/actions/successActions'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check'
const SuccessToolbar = () => {
    const dispatch = useDispatch()
    const {showSuccess, message} = useSelector(state => state.successReducer)

    return (
        <>
        {showSuccess && 
            <Alert
            icon={<CheckIcon fontSize='inherit'/>}
            severity='success'
            action={
                <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                    dispatch(hideSuccess())
                }}>
                    <HighlightOffIcon />
                </IconButton>
            }>
                {message}
            </Alert>
        }
        </>
    )
}

export default SuccessToolbar
