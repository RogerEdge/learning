const year=(new Date().getFullYear())

const birthYears = [
    1982,
    1991,
    2013,
    2018
]
const personAges = birthYears.map(birthYear=>year-birthYear)
console.log('personAge', personAges)

const totalAge = personAges.reduce((sum,personAge) => {
	return personAge+sum
}, 0)
console.log('totalAge', totalAge)
