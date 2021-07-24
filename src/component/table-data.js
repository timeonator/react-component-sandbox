import React, {Component} from 'react'

const getData = (uri) => {
    console.log("getData => ", uri);
    return (fetch(uri,{
        method: 'GET',
        accept: 'application/json',
        mode: 'cors',
        cache: 'default',
    }))
}

class TableData extends Component {
    constructor(props) {
      super(props);
      this.state= {
        loading: true,
        error: false,
        data: []
      }

    }

    componentDidMount() {
        const promise = getData('http://localhost:8000/datapackages');
        promise
            .then((d) => d.json())
            .then(d => 
                this.setState({
                    loading:false,
                    data:d 
                })
            )
            .catch((error) => {
                console.log("Error while fetching catalog list: ", error);
                this.setState({
                    error:true
                })                   
            })
    }

    render() {
        console.log("data=>", this.state.data)
        if (this.state.loading == true) return(<h4>"loading"</h4>);
        if (this.state.error == true) return (<h4>"Error fetching data"</h4>)
        let rows = [];
        for (const [index, value] of this.state.data.entries()) {
            console.log("index,value =>", index, value)
            rows.push(
            <tr key={index}>
                <td>{value._id}</td>
                <td>{value.name}</td>
                <td>{value.title}</td>
            </tr>)
          }
          console.log("rows=>", rows)
         return(
           <>
                <h1> Data </h1>
                <table>
                    <tbody>
                        {rows}                    
                    </tbody>
                </table>
            </> 
    );}
  }
  export default TableData;