const { eachDayOfInterval, isWeekend, getMonth, getYear } = require('date-fns');

function calculateMonthlyTarget({ startDate, endDate, vacationDays = 0, totalHours, selectedMonth, selectedYear }) {
    const allDays = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });


    const workingDays = allDays.filter(d => !isWeekend(d));


    const totalWorkingDays = workingDays.length - vacationDays;


    const monthWorkingDays = workingDays.filter(d =>
        getMonth(d) === selectedMonth && getYear(d) === selectedYear
    ).length;


    const targetHours = Math.round((monthWorkingDays / totalWorkingDays) * totalHours);

    return targetHours;
}

module.exports = calculateMonthlyTarget;
