import React from 'react'
import TableData from './component/table-data'
import ErrorBoundry from './error-boundry';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <React.StrictMode >
            <div className="App"> 
                <TableData/>                    
            </div>
        </React.StrictMode>
    );
}
export default App;
