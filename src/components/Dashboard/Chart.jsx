
import axios from 'axios';
import React,{useEffect} from 'react';
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
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import bank from '../../images/bank.svg'
const { forwardRef, useRef, useImperativeHandle } = React;

function Chart() {
 
    const [chartData,setChartData]=React.useState({})
    const [isLoading,setLoading]=React.useState(false)
    const[error,setError]=React.useState(null)
    const [year,setYear]=React.useState('')
    const [modal,setModal]=React.useState(false)
    const[tresory,setTresory]=React.useState([])
    const[sum_encaisse,setSumEncaisse]=React.useState(0)
    const[sum_decaisse,setSumdecaisse]=React.useState(0)
    const [prevision_actuel,setPrevact]=React.useState('')
    const [tresorie_actuel,setTresActuel]=React.useState('')
    const obj_change = useRef();
    const enc_change = useRef();
    const dec_change = useRef();



const getEncaissement=(year)=>{
  let encaisse=`http://127.0.0.1:3333/encaisse/?year=${year}`
  const config= {
    headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
    }
};
  axios.get(encaisse,config).then(res => {
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
  setTresActuel(tresory[mont]/1000)

}
setTresory(tresory)    
    for(let i of res.data.previsions_encs){
    if(i.date>mont){
    previsons_encs.push(i.montant)}
  else{previsons_encs.push('0')}}
  for(let i of res.data.previsions_decs){
    if(i.date>mont){
    previsons_decs.push(i.montant)
  }
  else{previsons_decs.push('0')}
  setPrevact((parseFloat(res.data.previsions_encs[mont].montant)-parseFloat(res.data.previsions_decs[mont].montant))/1000)
}
    for (let dataObj of res.data.encs_payes){
      if(year==this_year)
      {if(dataObj.date<=mont ){
        encaissement_payes.push(dataObj.montant)
        sum_encaisse+=parseFloat(dataObj.montant)}
      }

  
  else{
    encaissement_payes.push(dataObj.montant)
      sum_encaisse+=parseFloat(dataObj.montant)
  }
    } 
    for (let dataObj of res.data.encs_engages){
      if(year==this_year)
      {if(dataObj.date<=mont ){
        encaissement_engages.push(dataObj.montant)
      }}
  
  else{
    encaissement_engages.push(dataObj.montant)
  }
    }
   
    setSumEncaisse(sum_encaisse/1000)
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
    setSumdecaisse(sum_decaisse/1000)
      setChartData({     
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
   
        
    
    
  ]})
})
      
   
}


useEffect(() => {
  async function fetchData   ()  {
 let date=new Date().getFullYear()
   getEncaissement(date)
   setYear(date)
  };
  fetchData();
  }, []);



const handleYear=(e)=> {
  getEncaissement(e.target.value)
  setYear(e.target.value)
  obj_change.current.setData(e.target.value)
  enc_change.current.setData(e.target.value)
  dec_change.current.setData(e.target.value)
 
}


   
return(
<>
<main>
  <nav className="loggednavbar" >  
  <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  <form class="form-inline" >
<label for="years"> veuillez choisir l'année:</label>
<select class="form-control ml-3" id="years" name="years"  onChange={e=>handleYear(e)} >
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021" selected>2021</option>
      </select>
      </form>
      </div>
      <button className="btn btn-primary " onClick={()=>setModal(true)}>saisir prévisionnel</button>
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
              <span className="font-bold text-title">{tresorie_actuel}K</span>
            </div>
          </div>

       

          <div className="cardd col">
          <i class="fa fa-eye aria-hidden=true fa-2x text-green" aria-hidden="true"></i>            <div className="cardd_inner container">
              <p className="text-primary-p">Prévision Du Mois Courant</p>
              <span className="font-bold text-title">{prevision_actuel}K</span>
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
   <div className="container-fluid">
      <Jumbotron  className="col-sm-10">
     <Bar  width={800} height={200}
      data={chartData}
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
<Encaissement ref={enc_change}/>
<Decaissement ref={dec_change}/>
<Objectif ref={obj_change}/>
</div>
    </div>
    </main>
    <Operation_prevision
        show={modal}
        onHide={() => setModal(false)}
      />
    </>
    )
          

}

export default Chart ;
