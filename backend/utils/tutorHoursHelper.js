const db = require("../config/db");
const calculateMonthlyTarget = require("./calculateMonthlyTarget");

exports.fetchTutorHours = (whereCondition, params, selectedMonth, selectedYear, callback) => {
    const sql = `
        SELECT
            u.id, u.name,
            c.start_date, c.end_date,
            c.total_hours, c.vacation_days,
            IFNULL(SUM(CASE WHEN MONTH(wh.date) = ? AND YEAR(wh.date) = ? THEN wh.hours_worked ELSE 0 END), 0) AS actual,
            IFNULL(SUM(CASE WHEN wh.date BETWEEN c.start_date AND CURDATE() THEN wh.hours_worked ELSE 0 END), 0) AS total_worked
        FROM users u
        LEFT JOIN contracts c ON u.id = c.tutor_id
        LEFT JOIN work_hours wh ON u.id = wh.tutor_id
        WHERE u.role = 'tutor' AND ${whereCondition}
          AND c.start_date <= CURDATE()
        GROUP BY u.id, c.start_date, c.end_date, c.total_hours, c.vacation_days;
    `;

    const queryParams = [selectedMonth + 1, selectedYear, ...params];

    db.query(sql, queryParams, (err, results) => {
        if (err) return callback(err);

        const currentDate = new Date(selectedYear, selectedMonth);

        const validContracts = results.filter(tutor => {
            const contractStart = new Date(tutor.start_date);
            const contractEnd = new Date(tutor.end_date);
            return currentDate >= contractStart && currentDate <= contractEnd;
        });

        const enhancedResults = validContracts.map(tutor => {
            const target = calculateMonthlyTarget({
                startDate: tutor.start_date,
                endDate: tutor.end_date,
                vacationDays: tutor.vacation_days || 0,
                totalHours: tutor.total_hours,
                selectedMonth,
                selectedYear
            });

            const totalTarget = tutor.total_hours;
            const totalWorked = tutor.total_worked || 0;
            const hoursLeft = Math.max(totalTarget - totalWorked, 0);

            return {
                name: tutor.name,
                actual: tutor.actual || 0,
                target,
                totalTarget,
                totalWorked,
                hoursLeft,
            };
        });

        callback(null, enhancedResults);
    });
};
