import PropTypes from 'prop-types'


const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

Note.propTypes = {
  toggleImportance: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
}

export default Note