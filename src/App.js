import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { TiThMenu } from "react-icons/ti";
import Button from 'react-bootstrap/Button';

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const card=[
  {
    title:"Card 1",
    content:"Content 1",
    backgroundColor:"orrange"
  },
  {
    title:"Card 2",
    content:"Content 2",
    backgroundColor:'grey',
  },
  {
    title:"Card 3",
    content:"Content 3",
    backgroundColor:'green'
  },
  {
    title:"Card 4",
    content:"Content 4",
    backgroundColor:'yellow'
  }
]

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       toggle:false,
       data:[],
       insight:"",
       topic:"",
       sector:"",
       country:""
    }
  }
  componentDidMount(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/app/data/", requestOptions)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result);
        // Handle the 'data' variable as needed
        this.setState({data: data.data});
        
      })
      .catch(error => console.log('error', error));
  }
  search = () => {
    const { insight,topic,sector,country } = this.state
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://127.0.0.1:8000/app/data/?country=${country}&sector=${sector}&topic=${topic}&insight=${insight}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result);
        // Handle the 'data' variable as needed
        this.setState({data: data.data});
        
      })
      .catch(error => console.log('error', error));
  
  }
  render() {
    const data2=[
    ]
    this.state.data && this.state.data.map((item)=>{
      return(
        data2.push({
          name: item.published,
          likelihood: item.likelihood,
          intensity: item.intensity,
        },)
      )
    })

    const data1 = [
      
    ]

    this.state.data && this.state.data.map((item)=>{
      return(
        data1.push({
          name:item.country,
          intensity:item.intensity,
          relevance:item.relevance,
          amt:item.intensity
        })
      )
    })
    return (
      <div>
        <div style={{ width:window.innerWidth, height: 50, backgroundColor: 'black' }}>
<div style={{display:'flex',justifyContent:"space-between",alignItems:'center'}}>
<TiThMenu size={20} color='white' style={{marginLeft:20}} onClick={()=>this.setState({toggle:!this.state.toggle})}/>
  <div style={{height:"50px",width:"50px",backgroundColor:"green",borderRadius:"50%"}}></div>
</div>

        </div>
        <div className='' style={{display:"flex",flexDirection:"row"}}>
          <div style={{height:window.innerHeight-50,width:this.state.toggle?"20%":"0%",backgroundColor:"black",borderTopColor:"white",borderTopWidth:5}}></div>
          <div style={{backgroundColor:"whitesmoke",width:this.state.toggle?"80%":"100%"}}>
        <div className='row container-fluid m-3' style={{width:"100%"}}>
          
            {card.map((item)=>{
              return(
                <div className='col-md-3'>
                <div className='card' style={{backgroundColor:item.backgroundColor}}>
                  <div className='card-body'>
                    <h5 className='card-title'>{item.title}</h5>
                    <p className='card-text'>{item.content}</p>
                  </div>
                </div>
                </div>
              )
            })}
          
        </div>
        <hr></hr>
        <div className='row'>
          <div className='col-md-6'>
          <BarChart
          width={800}
          height={400}
          data={data1}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="intensity" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="relevance" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
          </div>
          <div className='col-md-6'>
          <LineChart
          width={800}
          height={400}
          data={data2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="likelihood" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="intensity" stroke="#82ca9d" />
        </LineChart>
          </div>
          <br/>
          <br/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",flexDirection:"row"}}>
          <input type='text' placeholder='search By country' style={{height:'40px'}} onChange={(e)=>this.setState({country:e.target.value})}></input>
          <input type='text' placeholder='search By selctor' style={{height:'40px'}} onChange={(e)=>this.setState({sector:e.target.value})}></input>
          <input type='text' placeholder='search By topic' style={{height:'40px'}} onChange={(e)=>this.setState({topic:e.target.value})}></input>
          <input type='text' placeholder='search By insight' style={{height:'40px'}} onChange={(e)=>this.setState({insight:e.target.value})}></input>
          <Button variant="primary" onClick={this.search}>Search</Button>
          </div>
          <br/>
          <br/>
          <br/>

          <hr/>
          <div className='col-md-12'>
          <Table striped="columns">
      <thead>
        <tr>
          <th>intensity</th>
          <th>sector</th>
          <th>topic</th>
          <th>insight</th>
          <th>country </th>
          <th>published</th>
          <th>added</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data && this.state.data.map((item)=>{
          return(
            <tr>
            <td>{item.intensity}</td>
            <td>{item.sector}</td>
            <td>{item.topic}</td>
            <td>{item.insight}</td>
            <td>{item.country}</td>
            <td>{item.published}</td>
            <td>{item.added}</td>
          </tr>
          )
        })}
      </tbody>
    </Table>
        </div>
        </div>


          </div>

        </div>
      </div>
    )
  }
}
