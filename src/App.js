import { useState, createContext} from 'react';
import Nav from './Nav';
import HomeRecipes from './HomeRecipes';
import Recipe from './Recipe';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {

  const IsNavActive = createContext(null)

  const [isNavActive, setNavActive] = useState(false)

  const handleNavDrop = () =>{
      setNavActive(!isNavActive)
      console.log(isNavActive)
  }

  return (
    <Router className={''}>
    <div className={"App w-full h-fit"}>

      <Nav isNavActive={isNavActive} setIsNavActive={setNavActive} handleNavDrop={handleNavDrop}/>
      <Switch className={''}>
        <Route exact path="/">
          <HomeRecipes isNavActive={isNavActive} />
        </Route>

        <Route exact path='/african'>
          <Recipe isNavActive={isNavActive} type={'African'}/>
        </Route>

        <Route exact path='/american'>
          <Recipe isNavActive={isNavActive} type={'American'}/>
        </Route>
        
        <Route exact path='/chinese'>
          <Recipe isNavActive={isNavActive} type={'Chinese'}/>
        </Route>
         
        <Route exact path='/european'>
          <Recipe isNavActive={isNavActive} type={'European'}/>
        </Route>
        
        <Route exact path='/spanish'>
          <Recipe isNavActive={isNavActive} type={'Spanish'}/>
        </Route>

        <Route path="/recipe/:id">
          <Recipe isNavActive={isNavActive} />
        </Route>

      </Switch>
    </div>
    </Router>
  )
}

export default App;
