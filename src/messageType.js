import PropTypes from 'prop-types'

/**
 * A re-usable prop-type definition for a message object
 */
const messageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
})

export default messageType