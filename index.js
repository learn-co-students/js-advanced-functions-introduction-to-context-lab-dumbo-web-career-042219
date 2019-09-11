const createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

const createEmployees = (employees) => {
  return employees.map(employee => createEmployeeRecord(employee))
};

const createTimeInEvent = (emplRecord, date) => {
  let timeIn = {
    type: "TimeIn",
    hour: parseInt(date.split(" ")[1]),
    date: date.split(" ")[0]
    
  };
  emplRecord.timeInEvents.push(timeIn);

  return emplRecord;
};

const createTimeOutEvent = (emplRecord, date) => {
  let timeIn = {
    type: "TimeOut",
    hour: parseInt(date.split(" ")[1]),
    date: date.split(" ")[0]
    
  };
  emplRecord.timeOutEvents.push(timeIn);

  return emplRecord;
};

const hoursWorkedOnDate = (empl, date) => {
  console.log(empl)
  let timeIn = empl.timeInEvents.find(ele => ele.date == date).hour;
  let timeOut = empl.timeOutEvents.find(ele => ele.date == date).hour;

  return (timeOut - timeIn) / 100;
};

const wagesEarnedOnDate = (empl, date) => {
  // console.log(empl)
  return hoursWorkedOnDate(empl, date) * empl.payPerHour;
};

const allWagesFor = (empl) => {
  // console.log(empl)
  return empl.timeInEvents.reduce((accu, curr) => accu + wagesEarnedOnDate(empl, curr.date), 0);
};

const calculatePayroll = (employees) => {
  console.log(employees)
  return employees.reduce((accu, curr) => accu + allWagesFor(curr), 0);
};

const createEmployeeRecords = (records) => {
  return records.map(record => createEmployeeRecord(record))
}

const findEmployeebyFirstName = (emps, firstName) => {
  return emps.find(emp => emp.firstName === firstName)
}




// const csvDataEmployees = [
//   ["Thor", "Odinsson", "Electrical Engineer", 45],
//   ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//   ["Natalia", "Romanov", "CEO", 150],
//   ["Darcey", "Lewis", "Intern", 15],
//   ["Jarvis", "Stark", "CIO", 125],
//   ["Anthony", "Stark", "Angel Investor", 300]
// ]

// const csvTimesIn = [
//   ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
//   ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
//   ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
//   ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
//   ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
//   ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
// ]

// const csvTimesOut = [
//   ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
//   ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
//   ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
//   ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
//   ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
//   ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
// ]

// let employeeRecords = createEmployees(csvDataEmployees);
// // console.log(employeeRecords)
// employeeRecords.forEach(function (rec) {
//   let timesInRecordRow = csvTimesIn.find(function (row) {
//     return rec.firstName === row[0]
//   })

//   let timesOutRecordRow = csvTimesOut.find(function (row) {
//     return rec.firstName === row[0]
//   })

//   timesInRecordRow[1].forEach(function (timeInStamp) {
//     createTimeInEvent(rec, timeInStamp)
//   })

//   timesOutRecordRow[1].forEach(function (timeOutStamp) {
//     createTimeOutEvent(rec, timeOutStamp)
//   })
// }) 

// calculatePayroll(employeeRecords)