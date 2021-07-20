import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const Home = () => {
        return(
            <h3>HOME</h3>
        )
    }

    return (
        <React.StrictMode >
            <div className="App">
                <Home/>

            </div>
        </React.StrictMode>
    );
}



export default App;
