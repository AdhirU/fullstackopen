const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`message ${message.error ? 'error' : 'notification'}`}>
      { message.msg }
    </div>
  )
}

export default Notification