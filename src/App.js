import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import CreateMatch from './containers/CreateMatch/CreateMatch';
import MatchControlView from './containers/MatchControlView/MatchControlView';
import LocalMatch from './containers/LocalMatch/LocalMatch';
import Layout from './components/Layout/Layout';


function App() {
  return (
    <Router>
        <Layout>
            <div>
                <Route exact path='/' component={Home} />
                <Route exact path='/matches/new' component={CreateMatch} />
                <Route exact path='/local/match' component={LocalMatch} />
                <Route exact path='/matches/:id(......)' component={MatchControlView} />
            </div>
        </Layout>
    </Router>
  );
}

export default App;
