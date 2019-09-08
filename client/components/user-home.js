import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CanvasDraw from 'react-canvas-draw'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div>
      <div>Hi, this is the home page</div>

      {/* <div display={'flex'} justify-content={'sapce-between'} width={'50px'}>
        <button
          onClick={() => {
            this.saveableCanvas.clear()
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            this.saveableCanvas.undo()
          }}
        >
          Undo
        </button>
      </div>
      <CanvasDraw
        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
        brushColor={'black'}
        brushRadius={10}
        lazyRadius={5}
        canvasWidth={500}
        canvasHeight={500}
      /> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
