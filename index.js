// Your code here
let createEmployeeRecord = arr => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

let createEmployees = arr => {
  return arr.map(arr => createEmployeeRecord(arr));
};

let createTimeInEvent = (employee, time) => {
  let [date, hour] = time.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
};

let createTimeOutEvent = (employee, time) => {
  let [date, hour] = time.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
};

let hoursWorkedOnDate = (employee, date) => {
  let timeInEvent = employee.timeInEvents.find(e => e.date == date);
  let timeOutEvent = employee.timeOutEvents.find(e => e.date == date);

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
};

let wagesEarnedOnDate = (employee, date) => {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
};

let allWagesFor = employee => {
  return employee.timeInEvents.reduce(
    (accrued, current) => accrued + wagesEarnedOnDate(employee, current.date),
    0
  );
};

let calculatePayroll = employees => {
  return employees.reduce(
    (accrued, current) => accrued + allWagesFor(current),
    0
  );
};

let createEmployeeRecords = records => {
  return records.map(record => createEmployeeRecord(record));
};

let findEmployeeByFirstName = (emps, firstName) => {
  return emps.find(emp => emp.firstName === firstName);
};
