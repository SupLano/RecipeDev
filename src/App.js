import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Nav from "./Nav";
import HomeRecipes from "./HomeRecipes";
import Recipe from "./Recipe";

export const AppNavContext = createContext(null);

function App() {
  const [isNavActive, setNavActive] = useState(false);

  const handleNavDrop = () => {
    setNavActive(!isNavActive);
    console.log(isNavActive);
  };
  

  return (
    <AppNavContext.Provider value={{ isNavActive, handleNavDrop }}>
      <Router>
        <div className={"App h-fit w-full"}>
          <Nav />
          <Switch className={""}>
            <Route exact path="/">
              <HomeRecipes isNavActive={isNavActive} />
            </Route>

            <Route exact path="/african">
              <Recipe isNavActive={isNavActive} type={"African"} />
            </Route>

            <Route exact path="/american">
              <Recipe isNavActive={isNavActive} type={"American"} />
            </Route>

            <Route exact path="/chinese">
              <Recipe isNavActive={isNavActive} type={"Chinese"} />
            </Route>

            <Route exact path="/european">
              <Recipe isNavActive={isNavActive} type={"European"} />
            </Route>

            <Route exact path="/spanish">
              <Recipe isNavActive={isNavActive} type={"Spanish"} />
            </Route>

            <Route path="/recipe/:id">
              <Recipe isNavActive={isNavActive} />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppNavContext.Provider>
  );
}

export default App;
