import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeSalesDrawer from './nagivation/HomeSalesDrawer';
import DashboardSalesDrawer from './nagivation/DashboardSalesDrawer';
import CustomersSalesDrawer from './nagivation/CustomersSalesDrawer';
import OrdersSalesDrawer from './nagivation/OrdersSalesDrawer';
import DispatchSalesDrawer from './nagivation/DispatchSalesDrawer';

function App() {
   return (
    <div className="App">
      <Router>
        <Route exact path="/" component={HomeSalesDrawer} />
        <Route path="/Dashboard" component={DashboardSalesDrawer} />
        <Route path="/Customers" component={CustomersSalesDrawer} />
        <Route path="/Orders" component={OrdersSalesDrawer} />
        <Route path="/Dispatch" component={DispatchSalesDrawer} />
      </Router>
    </div>
  );
}

export default App;
