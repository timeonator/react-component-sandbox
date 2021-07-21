import React, {useState, useEffect } from 'react';
import makeCancellablePromise from 'make-cancellable-promise';
//import ReactDataGrid from 'react-data-grid';
//import { useTable } from "react-table";
const cloneDeep = require('lodash/clonedeep');
import './../App.css';

const Collection = (props) => {
    // const columns = React.useMemo(
    //     () => [
    //       {
    //         Header: 'ID',
    //         accessor: '_id', 
    //       },
    //       {
    //         Header: 'Name',
    //         accessor: 'name',
    //       },
    //       {
    //         Header: 'Title',
    //         accessor: 'title',
    //       },
    //     ],
    //     []
    //   )


    const getData = (uri) => {
        return (fetch(uri,{
            method: 'GET',
            accept: 'application/json',
            mode: 'cors',
            cache: 'default',
        }))
    }

    function useFetch(uri) {
        console.log("useFetch is starting", uri);

        const [data, setData] = useState(''); 
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);

        useEffect(() => {
            console.log("useEffect is starting", uri);
            const {promise, cancel} = makeCancellablePromise(getData(uri));
            promise
                .then((d) => d.json())
                .then(d => {
                    setData(d);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log("Error while fetching catalog list: ", error);
                    setError(true);                        
                })
                
                return (() => {
                    console.log("cleanup");
                    setLoading(true);
                    cancel();
                });
        }, [uri]); 
    
       const result = { loading, data, error };

        return result;
    }

    const uri = "http://localhost:8000/datapackages"
    const { loading, data, error } = useFetch(uri);

    if (loading===true) return <h1>loading ...</h1>;
    if (error===true) return <pre>Error: {data}</pre>;
    let deepData = cloneDeep(JSON.stringify(data));
    // var deepData = cloneDeep(data);

    console.log(deepData);



    return(
      <div>
          <pre>{deepData}</pre>
      </div>
  );
}
export default Collection