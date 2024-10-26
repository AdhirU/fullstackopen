import Person from "./Person"

const Persons = ({ filteredPersons, deletePersonById }) => {

  return (
    <>
      {filteredPersons.map(person => (
        <Person 
          key={person.name} 
          person={person}
          deletePerson={() => deletePersonById(person.id)}
        />
      ))}
    </>
  )
}

export default Persons