import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import axios from 'axios';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

export default class DashboardChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    //Statistik laden
    axios.get('https://hfmbwiwpid.execute-api.eu-central-1.amazonaws.com/sales/statistics')
    .then(
        (res) => {
            console.log(res.status);
            return res.data;
        }
    )
    .then(
        (res) => {
            this.setState({data: res.chart });
        }
    )
    .catch(
        (error) => {
          console.log(error);
        }
    );
  };

  render() {
    return (
      <Paper>
        <Chart
          data={this.state.data}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Eingänge"
            valueField="NumberOrderArrivals"
            argumentField="D_DATE"
            color="#808080"
          />
          <BarSeries
            name="Abschlüsse"
            valueField="NumberOrderFinish"
            argumentField="D_DATE"
            color="#006064"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Anzahl Auträge letzte 14 Tage" />
          <Stack />
        </Chart>
      </Paper>
    );
  }
}
