
import axios from 'axios';
import React, {Component} from 'react' ;
import { Bar} from 'react-chartjs-2';
import chart from "../../images/chart.svg";
import "../../Styles/Main.css"
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import Encaissement from './Encaissement'
import Decaissement from './Decaissement';
import Objectif from './Objectif';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap'
import Operation_prevision from '../Navbar/Operation_prevision';
class Chart extends React.Component{
  constructor(props){
    super(props)
    this.enca=React.createRef();

    this.state={
         chartData:{} ,
         isLoading: false,  
         error: null, 
         encaissement:[],
         decaissement:[],
         tresory:[],
         sum_encaisse:0,
         sum_decaisse:0,
         year:'',
         modal:false,
      } 

    
    }
getEncaissement=(year)=>{
  let encaisse=`http://127.0.0.1:3333/encaisse/?year=${year}`

    console.log(year,this.state.tresory)
  axios.get(encaisse).then(res => {
    let encaissement_payes=[]
    let encaissement_engages=[]
    let decaissement_payes=[]
    let decaissement_engages=[]
    let tresory=[]
    let previsons_encs=[]
    let previsons_decs=[]
    let date=new Date()
    let mont=date.getMonth()
    let this_year=date.getFullYear()
    let sum_encaisse=0
    let sum_decaisse=0
    for(let i of res.data.tresorie){
      if(year==this_year)
      {if(i.m<=mont ){
    tresory.push(i.x)}}
  
  else{
    tresory.push(i.x)
  }
}
    this.setState({tresory})
    
    for(let i of res.data.previsions_encs){
    if(i.date>mont){
    previsons_encs.push(i.montant)}
  else{previsons_encs.push('0')}}
  for(let i of res.data.previsions_decs){
    if(i.date>mont){
    previsons_decs.push(i.montant)}
  else{previsons_decs.push('0')}}
    for (let dataObj of res.data.encs_payes){
      if(year==this_year)
      {if(dataObj.date<=mont ){
        encaissement_payes.push(dataObj.montant)
        sum_encaisse+=parseFloat(dataObj.montant)}}
  
  else{
    encaissement_payes.push(dataObj.montant)
      sum_encaisse+=parseFloat(dataObj.montant)
  }
    } 
    for (let dataObj of res.data.encs_engages){
      if(year==this_year)
      {if(dataObj.date<=mont ){
        encaissement_engages.push(dataObj.montant)
        //sum_encaisse+=parseFloat(dataObj.montant)
      }}
  
  else{
    encaissement_engages.push(dataObj.montant)
      //sum_encaisse+=parseFloat(dataObj.montant)
  }
    }
   
    this.setState({sum_encaisse:(sum_encaisse/1000)})
      for (let dataobj of res.data.decs_payes) 
     {
      if(year==this_year)
      {if(dataobj.date<=mont ){
        decaissement_payes.push(dataobj.montant)
        sum_decaisse+=parseFloat(dataobj.montant)}}
  
  else{
    decaissement_payes.push(dataobj.montant)
      sum_decaisse+=parseFloat(dataobj.montant)
  }
     }
     for (let dataobj of res.data.decs_engages) 
     {
      if(year==this_year)
      {if(dataobj.date<=mont ){
        decaissement_engages.push(dataobj.montant)
        //sum_decaisse+=parseFloat(dataobj.montant)
      }}
  
  else{
    decaissement_engages.push(dataobj.montant)
      //sum_decaisse+=parseFloat(dataobj.montant)
  }
     }
      this.setState({sum_decaisse:(sum_decaisse/1000)})

      this.setState({chartData:{     
        labels:["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin"
      ,"Juillet","Aout","septembre","octobre","novombre", "decembre"], 
     datasets:[
      {
        label: 'Trésorerie',
        type:'line',
        data:tresory,
          backgroundColor:'Transparent',
          borderColor: '#4DA5E8'

            },
            { label: 'Encaissement',
            data:encaissement_payes,
        
              backgroundColor:'#159605',
                stack:"stack 0"              
                },
                { label: 'Engagée',
                data:encaissement_engages,
            
                  backgroundColor:'rgba(0, 255, 29, 0.62)',
                    stack:"stack 0"              
                    },
              
            {
label: 'Décaissement',
type:'bar',
data:decaissement_payes,
  backgroundColor:'#FF0000',
  stack:"stack 1"              

    } , 
    { label: 'Engagée',
                data:decaissement_engages,
            
                  backgroundColor:'rgba(255, 0, 0, 0.61)',
                    stack:"stack 1"              
                    },
     { label: 'Prévisions',
    data:previsons_encs,

      backgroundColor:'rgba(3, 255, 0, 0.25)',
                      
        },
        { label: 'Prévisions',
        data:previsons_decs,
    
          backgroundColor:'rgba(255, 0, 0, 0.25)',
                          
            },
   
        
    
    
  ]}})
})
      
   
}



componentDidMount(){
 let date=new Date().getFullYear()
   this.getEncaissement(date)
   this.setState({year:date})
   
  

}
handleYear=(e)=> {
 
    const year= e.target.value
  this.getEncaissement(year)
  this.setState({year:e.target.value})
    
}

render(){
  const classes = this.props
   
return(
<>
<main>
  <nav className="loggednavbar" >  
  <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  <form class="form-inline" >
<label for="years"> veuillez choisir l'année:</label>
<select class="form-control ml-3" id="years" name="years"  onChange={this.handleYear}>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021" selected>2021</option>
      </select>
      </form>
      </div>
      <button className="btn btn-primary " onClick={()=>this.setState({modal:true})}>saisir prévisionnel</button>
</nav>
      <div className="container container-fluid">
      

        <div className="main__title mb-3 ">
          <img src={chart} alt="chart" />
          <div className="main__greeting">
            <h1>Hello Code Hut</h1>
            <p>bienvenue à votre tableau de board</p>
          </div>
        </div>

     
        <div className="main__cardds  row">
          <div className="cardd col ">
            <i
              className="fa fa-money aria-hidden=true fa-2x text-lightblue"
              aria-hidden="true"></i>
            <div className="cardd_inner container">
              <p className="text-primary-p">Trésorerie Du Mois Courant</p>
              <span className="font-bold text-title">{this.state.tresory[this.state.tresory.length-1]/1000}K</span>
            </div>
          </div>

       

          <div className="cardd col">
          <i class="fa fa-eye aria-hidden=true fa-2x text-green" aria-hidden="true"></i>            <div className="cardd_inner container">
              <p className="text-primary-p">Prévision Du Mois Courant</p>
              <span className="font-bold text-title">{this.state.sum_decaisse}K</span>
            </div>
          </div>

        
          <div className="cardd col">
            <i
              className="fas fa-lightbulb fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="cardd_inner container">
              <p className="text-primary-p">Estimation Du Mois Prochain</p>
              <span className="font-bold text-title">29.4K</span>
            </div>
          </div>
          
          
        </div>
      
      </div>
    
  
 
    <div className="container-fluid">
   <div className="container-fluid row">
 
      <div className="col-sm-4 " >
      </div>
     <Jumbotron  className="col-sm-6">
     <Bar  style={{position: 'relative', height:'40vh', width:'80vw'}}
      data={this.state.chartData}
      options={{
        responsive: true,
        title: { text: "THICCNESS SCALE", display: true },
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }}
        
/></Jumbotron>
</div>
<div className="container-fluid">
<Encaissement year={this.state.year}/>
<Decaissement/>
<Objectif/>
</div>
    </div>
    </main>
    <Operation_prevision
        show={this.state.modal}
        onHide={() => this.setState({modal:false})}
      />
    </>
    )
          }

}

export default Chart ;
