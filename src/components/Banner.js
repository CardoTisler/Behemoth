import React from 'react'
import PropTypes from 'prop-types'

const Banner = (props) => {
    return (
        <div className='banner'>
            {props.title}
        </div>
    )
}

Banner.defaultProps = {
    title: 'banner default title'
}

Banner.propTypes = {
    title: PropTypes.string
}

export default Banner
