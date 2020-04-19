import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from './Row'
import axios from 'axios'
import Wrapper from './Wrapper'
import TextField from '@material-ui/core/TextField'
import Loader from 'react-loader-spinner'
import LineChart from './LineChart'



class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      data:[],
      dataToProps: [],
      loading: true
    }
  }

  componentDidMount (){
    console.log('component updated')

    axios.get('https://api.covid19api.com/summary')
    .then((response)=> {

      const tempData = response.data.Countries
      const data = []

      tempData.forEach(eachData=>{
        if(eachData.TotalConfirmed!==0)
        data.push(eachData)
      })

      data.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : -1)

      this.setState({data:data,
      dataToProps: data,
    loading:false
  })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleChange=(event)=>{

    let dataToProps = [];
    
    this.state.data.forEach((eachData,index)=>{
      if(eachData.Country.includes(event.target.value))
      dataToProps.push(eachData)
    })

    

    this.setState({
      dataToProps:dataToProps
    });
  }

 render(){

  const rows = this.state.dataToProps.map((eachData,index)=>{
    return <Row index={index} 
          country={eachData.Country}
         new_cases={eachData.NewConfirmed} 
          total_cases={eachData.TotalConfirmed}
          new_deaths={eachData.NewDeaths}
          total_deaths={eachData.TotalDeaths}
          new_recoveries={eachData.NewRecovered}
          total_recoveries={eachData.TotalRecovered}
          key={index}   
    />
  });

 
  

    return (
      <Wrapper>

<TextField id="filled-basic" label="Search Country" variant="filled"
onChange={this.handleChange}
/>

    <Table striped bordered hover striped size="sm">
    <thead>
      <tr>
        <th>#</th>
        <th>Country</th>
        <th>New Confirmed</th>
        <th>Total Confirmed</th>
        <th>New Deaths</th>
        <th>Total Deaths</th>
        <th>New Recoveries</th>
        <th>Total Recoveries</th>
        
      </tr>
    </thead>
    <tbody>
      {this.state.loading?
      <div style={{
      position:"absolute",
      top:"50%",
      left:"50%"}}>
         <Loader 
      type="Circles" 
      color="#00BFFF" 
      height={80} 
      width={80}/>
      </div>
       : rows}
    
    </tbody>
  </Table>
        <LineChart/>
      </Wrapper>
   
    );

  }
  
}

export default App;
