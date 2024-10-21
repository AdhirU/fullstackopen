const Filter = ({ handleFilterChange, filterToken }) => {
  return (
    <div>
        filter shown with 
        <input 
          onChange={handleFilterChange}
          value={filterToken}
        />
      </div>
  )
}

export default Filter