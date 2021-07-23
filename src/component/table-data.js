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
        data: [
            {
            _id: "1231091439912",
            name: "billy",
            title: "Billy The Kid"
            }
        ],
        loading: true,
        error: false
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
        if (this.state.loading == true) return(<h4>"loading"</h4>);
        if (this.state.error == true) return (<h4>"Error fetching data"</h4>)
    return(
        <>
            <h1> Data </h1>
            <p> {this.state.data[0].title} </p> 
        </>
 
    )
    }
  }
  export default TableData;