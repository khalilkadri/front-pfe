
import axios from 'axios';
import React,{useEffect} from 'react';
import { Bar,Pie} from 'react-chartjs-2';
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
function Chart() {
 
    const [chartData,setChartData]=React.useState({})
    const [pieenc,setPieEnc]=React.useState({})
    const [piedec,setPieDec]=React.useState({})
    const [isLoading,setLoading]=React.useState(false)
    const[error,setError]=React.useState(null)
    const [year,setYear]=React.useState('')
    const [modal,setModal]=React.useState(false)
    const[tresory,setTresory]=React.useState([])
    const [encaissements,setEncaissements]=React.useState([])
    const [decaissements,setDecaissements]=React.useState([])
    const [encats,setEncats]=React.useState([])
    const [decats,setDecats]=React.useState([])



const getEncaissement=(year)=>{
  let encaisse=`http://127.0.0.1:3333/chart_pie/?year=${year}`
  const config= {
    headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
    }
};
  axios.get(encaisse,config).then(res => {
    let encaissement_payes=[]
    let decaissement_payes=[]
    let encat=[]
    let decat=[]
    let tresory=[]
    let date=new Date()
    let mont=date.getMonth()
    let this_year=date.getFullYear()
    for(let i of res.data.tresorie){
      if(year==this_year)
      {if(i.m<=mont ){
    tresory.push(i.x)
}}
  
  else{
    tresory.push(i.x)
  }

}
setTresory(tresory)    
  

    for (let dataObj of res.data.enc_pie){
        encaissement_payes.push(dataObj.montant)
        encat.push(dataObj.categorie)
    } 
    setEncaissements(encaissement_payes)
   setEncats(encat)
  /* setPieEnc({     
    labels:encat, 
 datasets:encaissement_payes,
 backgroundColor: ["red", "blue","green","yellow","pink"],

})*/
      for (let dataobj of res.data.dec_pie) 
     {
        decaissement_payes.push(dataobj.montant)
        decat.push(dataobj.categorie)
     }
     setDecaissements(decaissement_payes)
     setDecats(decat)
    /* setPieDec({     
      labels:decat, 
   datasets:[{decaissement_payes,
   backgroundColor: ["black", "yellow"]},]
  
  })*/
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
         

  ]});


})
      
   console.log(pieenc,piedec,tresory)
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
    e.preventDefault()
  getEncaissement(e.target.value)
  setYear(e.target.value)
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
</nav>
   
    
  
 
   <div className="container-fluid row">
    <div className="col">   <Jumbotron  className="col-sm-6">
     <Pie
     data = { {
      labels:decats,
      datasets: [{
        label: 'Decaissement',
        data: decaissements,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'red',
          'black'
        ],
        hoverOffset: decaissements.length
      }]
    }}
      options= {{
        title: {
          display: true,
          text: 'Encaissements'
        }
      }}
        
/></Jumbotron></div>
    <div className="col">   <Jumbotron  className="col-sm-6">
     <Pie
        data = { {
          labels:encats,
          datasets: [{
            label: 'Encaissements',
            data: encaissements,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'red',
              'black'
            ],
            hoverOffset: encaissements.length
          }]
        }}
      options= {{
        title: {
          display: true,
          text: 'Decaissements'
        }
      }}
        
/></Jumbotron></div>
</div>
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



    </main>
    
    </>
    )
          

}

export default Chart ;
