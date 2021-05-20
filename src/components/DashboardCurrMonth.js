import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { green } from '@material-ui/core/colors';
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}


const data = [
  createData('1. April', 0),
  createData('5. April', 300),
  createData('10. April', 600),
  createData('15. April', 800),
  createData('20. April', 1500),
  createData('25. April', 2000),
  createData('1. Mai', 2400),
  createData('05. Mai', undefined),
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
              Menge (Stück)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#006064" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}