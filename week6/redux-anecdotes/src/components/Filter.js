import React from "react"
import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = props => {
  const handleChange = event => {
    // input-kentän arvo muuttujassa event.target.value
    const filter = event.target.value
    console.log("filter:", filter)
    props.setFilter(filter)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter
