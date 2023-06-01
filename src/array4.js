const students = [
    {
        "name": "John",
        "age": 18,
        "sex": "Male",
        "test_score": 85,
        "class_rank": 3
    },
    {
        "name": "Emma",
        "age": 17,
        "sex": "Female",
        "test_score": 92,
        "class_rank": 1
    },
    {
        "name": "Michael",
        "age": 19,
        "sex": "Male",
        "test_score": 78,
        "class_rank": 5
    },
    {
        "name": "Sophia",
        "age": 18,
        "sex": "Female",
        "test_score": 89,
        "class_rank": 2
    },
    {
        "name": "David",
        "age": 17,
        "sex": "Male",
        "test_score": 90,
        "class_rank": 4
    }
]

//get list of student names

const names=students.map(student=>student.name)
console.log('names', names) 

//get list of student age

const ages=students.map(student=>student.age)
console.log('ages', ages)

//get list of student test score

const scores=students.map(student=>student.test_score)
console.log('scores', scores)

//get list of student class rank by name

const rankByName=students.map((student)=>({name:student.name, class_rank:student.class_rank}))
console.log('rankByName', rankByName)

//get the average test score 

const averageScore=students.reduce((sum,student) => {
return	sum=sum+student.test_score
}, 0)/5
console.log('averageScore', averageScore)

//get the average test score for males 

const scoreOfMales=("Male",students.filter(student => student.sex==="Male")
.reduce((sum,student)=>{
    return sum=sum+student.test_score
}, 0)/3
)
console.log('scoreOfMales', scoreOfMales)

//get the average test score for females

const scoreOfFemales=("Female",students.filter(student => student.sex==="Female")
.reduce((sum,student)=>{
    return sum=sum+student.test_score
}, 0)/2
)
console.log('scoreOfFemales', scoreOfFemales)

//get total score of all test scores

const totalTestScore=students.reduce((sum,student)=>{
    return sum=sum+student.test_score
}, 0)
console.log('totalTestScore', totalTestScore)

//get number of students by sex 

const studentsBySex=students.reduce((student,cur) => {
	if(student[cur.sex]){
        student[cur.sex]=student[cur.sex] + 1
    }else student[cur.sex] = 1
    return student
}, {})
console.log('studentsBySex', studentsBySex)