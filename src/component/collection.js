import React, {useState, useEffect } from 'react';
import makeCancellablePromise from 'make-cancellable-promise';
// import ReactDataGrid from 'react-data-grid';
import { useTable } from "react-table";

import './../App.css';

const Collection = (props) => {
    const columns = React.useMemo(
        () => [
          {
            Header: 'ID',
            accessor: '_id', 
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
        ],
        []
      );


    const getData = (uri) => {
        console.log("getData => ", uri);
        return (fetch(uri,{
            method: 'GET',
            accept: 'application/json',
            mode: 'cors',
            cache: 'default',
        }))
    }

    function useFetch(uri="http://localhost:8000/datapackages") {

        console.log("useFetch is starting", uri);
    
        let [data, setData] = useState(''); 
        let [loading, setLoading] = useState(true);
        let [error, setError] = useState(false);

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
                    cancel();
                });
        }, []); 
    
       const result = { loading, data, error };

        return result;
    }

 

 
    const uri = "http://localhost:8000/datapackages"
    const { loading, data, error } = useFetch(uri);
    if (loading===true) return <h1>loading ...</h1>;
    if (error===true) return <pre>Error: {data}</pre>;
    let Data = JSON.stringify(data);

    
    const mData=Data;
    // [
    //     {
    //     '_id': '60d125fdc221cb2458525a3a',
    //     'name': 'judydata.json',
    //     'title': "Judy's Data Set",
    //     },
    // ];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } =  useTable({
           columns, 
            Data
        }
    )
    return(
      <>
        <h4>Data</h4>
        <pre>{mData}</pre>

        {/* <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={1}
        minHeight={150} /> */}
      </>
    )
}
export default Collection