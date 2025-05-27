import { BarChart } from '@mui/x-charts';
import { Box, Paper, Typography } from '@mui/material';

const OverviewGraphs = ({ attendance, tutorHours }) => {
    return (
        <Box mt={4}>

            <Typography variant="h6" gutterBottom>
                📅 Students per Day
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: attendance.map((a) => a.date),
                            label: 'Date',
                        },
                    ]}
                    series={[
                        {
                            data: attendance.map((a) => a.students),
                            label: 'Students',
                            color: '#878caf',
                        },
                    ]}
                    height={300}
                />
            </Paper>


            <Typography variant="h6" gutterBottom>
                ⏱ Tutor Hours (Actual vs. Target)
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: tutorHours.map((t) => t.name),
                            label: 'Tutor',
                        },
                    ]}
                    series={[
                        {
                            data: tutorHours.map((t) => t.actual),
                            label: 'Actual',
                            color: '#8884d8',
                        },
                        {
                            data: tutorHours.map((t) => t.target),
                            label: 'Target',
                            color: '#82ca9d',
                        },
                    ]}
                    height={300}
                />
            </Paper>
        </Box>
    );
};

export default OverviewGraphs;
