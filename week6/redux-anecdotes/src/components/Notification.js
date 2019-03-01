import React from "react"
import { connect } from "react-redux"

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }
  const message = props.notification
  console.log("message:", message)
  if (!message) return null
  return <div style={style}>{message}</div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
