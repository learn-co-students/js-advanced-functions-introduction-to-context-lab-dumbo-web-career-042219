const createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
		familyName: arr[1],
		title: arr[2],
		payPerHour: arr[3],
		timeInEvents: [],
		timeOutEvents: []
	}
}

const createEmployees = (nestedArr) => {
	return nestedArr.map(arr => createEmployeeRecord(arr))
}

const createTimeInEvent = (record, datestamp) => {
	let [date, hour] = datestamp.split(" ")
	record.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour),
		date: date
	}) 
	return record
}

const createTimeOutEvent = (record, datestamp) => {
	let [date, hour] = datestamp.split(" ")
	record.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(hour),
		date: date
	}) 
	return record
}

const hoursWorkedOnDate = (record, date) => {
	let tiRecord = record.timeInEvents.find(data => data.date === date)
	let toRecord = record.timeOutEvents.find(data => data.date === date)
	return toRecord.hour / 100 - tiRecord.hour / 100
}

const wagesEarnedOnDate = (record, date) => {
	return hoursWorkedOnDate(record, date) * record.payPerHour
}

const allWagesFor = (record) => {
	let datesWorked = record.timeInEvents.map(data => data.date)
	return datesWorked.reduce(function(accuVal, curDate){
		return accuVal + wagesEarnedOnDate(record, curDate)
	}, 0)
}

const calculatePayroll = (employees) => {
	let wages = employees.map(employee => allWagesFor(employee))
	return wages.reduce(((accu, curr) => accu + curr), 0)
}

const createEmployeeRecords = (nestArr) => {
	return nestArr.map(arr => createEmployeeRecord(arr))
}

const findEmployeebyFirstName = (employees, name) => {
	return employees.find(employee => employee.firstName === name)
}