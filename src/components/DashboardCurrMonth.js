import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { green } from '@material-ui/core/colors';
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('1. Mai', 0),
  createData('7. Mai', 300),
  createData('14. Mai', 600),
  createData('21. Mai', 800),
  createData('30. Mai', 1200),
];
export default function Chart() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <h2>Letzter Monat</h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 16,
            bottom: 0,
            left: 24,
            
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', stroke: green}}
            >
              Anzahl Aufträge
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#006064" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}