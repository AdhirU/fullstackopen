const Search = ({ searchToken, onChange }) => {
  return (
    <div>
      find countries
      <input value={searchToken} onChange={onChange}/>
    </div>
  )
}

export default Search