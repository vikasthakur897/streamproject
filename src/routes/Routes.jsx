import React from "react";
import { Route, Switch, Redirect  } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Player from "../components/player/player";
import TvShowDetail from "../pages/detail/TvShowDetail";
import WatchPage from "../components/player/WatchPage";

import * as Config from "../constants/Config";

const Routes = () => {
  return (
    <Switch>
       <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route
        path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
        component={Catalog}
      />
      <Route path={`/${Config.HOME_PAGE}/watch/:id`} component={Player} />
      <Route path="/watch/:id" component={WatchPage} />

      <Route path={`/${Config.HOME_PAGE}/:category/show/:id`} component={TvShowDetail} />
      <Route path={`/${Config.HOME_PAGE}/:category/:id`} component={Detail} />
      <Route path={`/${Config.HOME_PAGE}/:category`} component={Catalog} />
      <Route path={`/${Config.HOME_PAGE}`} exact component={Home} />
    </Switch>
  );
};

export default Routes;
