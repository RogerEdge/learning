const people = [
  { name: "John", age: 32, occupation: "Engineer" },
  { name: "Emily", age: 27, occupation: "Doctor" },
  { name: "Michael", age: 45, occupation: "Lawyer" },
  { name: "Sarah", age: 23, occupation: "Student" },
  { name: "David", age: 38, occupation: "Architect" }
];

//const ages=people.map(person => person.age)
const total=people.reduce((summary,person) => {
  return summary=summary+person.age
}, 0)
console.log('total',total)
//console.log('age', ages)



