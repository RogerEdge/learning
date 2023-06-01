const temperatureData = [
  { month: "January", temperature: 5.6 },
  { month: "February", temperature: 6.2 },
  { month: "March", temperature: 9.3 },
  { month: "April", temperature: 12.8 },
  { month: "May", temperature: 17.3 },
  { month: "June", temperature: 21.1 },
  { month: "July", temperature: 24.4 },
  { month: "August", temperature: 24.2 },
  { month: "September", temperature: 20.6 },
  { month: "October", temperature: 15.5 },
  { month: "November", temperature: 10.1 },
  { month: "December", temperature: 6.2 },

  { month: "January", temperature: 5.6 },
  { month: "February", temperature: 6.2 },
  { month: "March", temperature: 9.3 },
  { month: "April", temperature: 12.8 },
  { month: "May", temperature: 17.3 },
  { month: "June", temperature: 21.1 },
  { month: "July", temperature: 24.4 },
  { month: "August", temperature: 24.2 },
  { month: "September", temperature: 20.6 },
  { month: "October", temperature: 15.5 },
  { month: "November", temperature: 500.1 },
  { month: "December", temperature: 6.2 },
];

const average=temperatureData.reduce((summary,month) => {
	return summary=summary+month.temperature
}, 0)/temperatureData.length
console.log('average',average)
console.log('temperatureData.length', temperatureData.length)