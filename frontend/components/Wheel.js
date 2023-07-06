import React from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'
import { connect } from 'react-redux'

function Wheel({ position, moveClockwise, moveCounterClockwise }) {
  return (
    <div id="wrapper">
      <div id="wheel">
        {
          [0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className={`cog${idx === position ? ' active' : ''}`}
              style={{ '--i': idx}}
            >
              {idx === position ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    position: state.wheel,
  }
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise})(Wheel);
