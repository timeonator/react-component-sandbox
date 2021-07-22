import React from 'react'
import Collection from './component/collection'
import ErrorBoundry from './error-boundry';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <React.StrictMode >
            <div className="App"> 
                <Collection/>                    
            </div>
        </React.StrictMode>
    );
}
export default App;
