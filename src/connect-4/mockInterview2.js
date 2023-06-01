const states=
[
  { state: 'California', population: 39937489 },
  { state: 'Texas', population: 29360759 },
  { state: 'Florida', population: 21589279 },
  { state: 'New York', population: 19827854 },
  { state: 'Pennsylvania', population: 15175811 },
  { state: 'Illinois', population: 14185629 },
  { state: 'Ohio', population: 12601821 },
  { state: 'Georgia', population: 10767609 },
  { state: 'North Carolina', population: 10099152 },
  { state: 'Michigan', population: 9671711 },
  { state: 'New Jersey', population: 9264542 },
  { state: 'Virginia', population: 9073306 },
  { state: 'Washington', population: 8560554 },
  { state: 'Arizona', population: 8147564 },
  { state: 'Massachusetts', population: 7550498 },
  { state: 'Tennessee', population: 7033469 },
  { state: 'Indiana', population: 6724543 },
  { state: 'Missouri', population: 6464713 },
  { state: 'Maryland', population: 6116468 },
  { state: 'Wisconsin', population: 5893218 },
  { state: 'Colorado', population: 5789767 },
  { state: 'Minnesota', population: 5294321 },
  { state: 'South Carolina', population: 5049388 },
  { state: 'Alabama', population: 4879949 },
  { state: 'Louisiana', population: 4667422 },
  { state: 'Kentucky', population: 4442376 },
  { state: 'Oregon', population: 4241506 },
  { state: 'Oklahoma', population: 4025341 },
  { state: 'Connecticut', population: 3928349 },
  { state: 'Utah', population: 3751353 },
  { state: 'Iowa', population: 3608298 },
  { state: 'Nevada', population: 3481816 },
  { state: 'Arkansas', population: 3297868 },
  { state: 'Mississippi', population: 3218792 },
  { state: 'Kansas', population: 3118102 },
  { state: 'New Mexico', population: 3017804 },
  { state: 'Nebraska', population: 2957341 },
  { state: 'Idaho', population: 2869927 },
  { state: 'Hawaii', population: 2778235 },
  { state: 'New Hampshire', population: 2698059 },
  { state: 'West Virginia', population: 2593879 },
  { state: 'Maine', population: 2498112 },
  { state: 'Montana', population: 2439938 },
  { state: 'Rhode Island', population: 2366799 },
  { state: 'Delaware', population: 2296224 },
  { state: 'Alaska', population: 2204060 },
  { state: 'North Dakota', population: 2133369 },
  { state: 'South Dakota', population: 2062539 },
  { state: 'Wyoming', population: 2017272 },
  { state: 'Vermont', population: 1953034 },
  { state: 'state of mind', population: 1 },
]

states.sort(function(a, b) {
  var nameA = a.state.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
  var nameB = b.state.toUpperCase();

  if (nameA < nameB) {
    return -1; // a should come before b in the sorted order
  }
  if (nameA > nameB) {
    return 1; // a should come after b in the sorted order
  }
  return 0; // names are equal, no change in order
});


console.log('states', states.filter(state => state.population <= 10767609).map(state =>{
  state.populationString=state.population.toLocaleString()
  return state
} ).reduce((all,state) => {
  if(!all || state.population <= all.population ){
    return state
  }
  return all
} 
, undefined))

 


