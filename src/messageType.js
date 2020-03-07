import PropTypes from 'prop-types'

const messageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
})

export default messageType