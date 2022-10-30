import logo from './logo.svg';
import './App.css';
import React , {Component}from 'react';
// import "./App.css"
import Card from "./Cards";
// import React, {Component} from 'react';
// import logo from './logo.svg';
// import ReactDOM from 'react-dom';

// import './js/htmlOfJs.js';
// import {HeaderTable} from './js/htmlOfJs.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch,faSpinner} from "@fortawesome/free-solid-svg-icons";
// import { } from "@fortawesome/free-br";
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
// import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
// import {dataParam} from "./js/FormUsers";
// import 
// var linkApi = "http://localhost:4000/";
var linkApi = "https://ucamptechnicaltestserverapivercel.vercel.app/"; 
let userSize = 10;
export var whoIs = {};
var dataUsersGlobal = [];

let dataUsersArray = [];
var pruebaArray = [];
var testHola = "";
var boolSend = false;
const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
  // paginationRowsPerPageOptions: [30],
}

function  SetDataTableFirst(dataObj={}) {

  return dataObj;
 
}




const CustomLoader = () => (
  	<div className="loadContainer" >
  		<FontAwesomeIcon icon={faSpinner} spin className='iconCustom' />
  		<div>C a r g a n d o . . .</div>
  	</div>
  );

const customSort = (rows, selector, direction) => {
  console.log(selector);
  console.log(direction);
  if(direction==null){
    return rows;
  }
  return rows.sort((rowA, rowB) => {
   // use the selector function to resolve your field names by passing the sort comparitors
    const aField = selector(rowA)
    const bField = selector(rowB)
  
    let comparison = 0;
  
    if (aField > bField) {
      comparison = 1;
    } else if (aField < bField) {
      comparison = -1;
    }
  
    return direction === 'desc' ? comparison * -1 : comparison;
    });
  };
function Universal(){
  const [pending, setPending] = React.useState(true);
	  const [rows, setRows] = React.useState([]);
  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     // setRows(data);
  //     // setPending(false);
  //     console.log("HIKA");
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  // }, []);
}
class App extends Component {

  state={
    busqueda: '',
    data: [],
    columnas:[],
    subColumns :[],
    search: "",
    sortAttr: "",
    // count : 0,
    // another : tablaCampeones,
  }

  constructor(props) {
    super(props);
    console.log(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      busqueda: '',
      data: [],
      columnas:[],
      subColumns :[],
      propiedad : {},
      dataInit:[],
      search: props.search,
      sortAttr:"",
      count : 0,
      currentPage: 0,
      elementsPerPage: 10,
      totalElements: undefined,
      title:{ 
        order:"Seleccione un orden",
        condition:"Filtro de condición"
        },
      group:{
        condition: []
      },
      container:{
        load:true,
        data:false,
      }

    };
  }
  forceUpdateHandler(){
    this.forceUpdate();
  };

  // forceUpdateHandler(){
  //   this.forceUpdate();
  // };
 
  onChange = async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
    // universal();
  }

  recorrerAttr(array){

    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      if(element.id=="ITEM_CONDITION"){

        return element.value_name;
      }
      
    }

    return "---";
    // value.attributes[0].id === "ITEM_CONDITION" ?  value.attributes[0].value_name : value.attributes[1].value_name
  }
  
  // createFilterCondition(){
    // let arrayHere = [];


    // return arrayHere;

  // }
  asignarColumnas =  (value)=>{
    // console.log(value)
    // customSort = (rows, selector, direction) => {
      // return orderBy(rows, selector, direction);
    // };  
    let valueMaster = value;
   
    const  columnas = [
      { 
        // count : 0,
        // table: true,
        // id:"idSort_",
        // selector: 'price',
        selector:  row => row.price ,
        sortable: true,
        // name:"price",
        style : { 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "nowrap",
              flexDirection: "column",
              // padding:"0",
        },
          // backgroundColor: 'green'},
        myRowStyle: {
          backgroundColor: 'green',
          color : 'white',
        //  ...
          },
    //       ignoreRowClick: true,
    // allowOverflow: true,
    // button: true,
        cell: (value) => {

          // if(valueMaster==true){
          //   return true;
          // }
          return <Card
          title= {value.title}
          images= {value.thumbnail}
          stock = {value.available_quantity}
          old_price={value.available_quantity <= 0 ? "No Disponible" : "Disponible"}
          newPrice={value.price + " " +value.prices.presentation.display_currency }
          dollar="$"
          // alt="batman"
          // exp_date={ value.attributes[0].value_name ? value.attributes[1].value_name : value.attributes[0].value_name}
          // exp_date={ value.attributes[0].value_name}
          // value.attributes[0].id === "ITEM_CONDITION" ?  value.attributes[0].value_name : value.attributes[1].value_name
          exp_date={ this.recorrerAttr(value.attributes) } 
          // onClick={() => handleButtonClick(value.price)}
        />
        
        
        
          }
      },
      { 
        // count : 0,
        // table: true,
        selector:  row =>  this.recorrerAttr(row.attributes)  ,
        // attributes[1].value_name,
        // sortable: true,
        name: "condicion",
        omit: true,
        
        myRowStyle: {
          backgroundColor: 'green',
          display: "none",
          color : 'white',
        },
        //  ...
        //   },
        // cell: (value) => ( 

        //   // HeaderTable(value)
        //   console.log(value)
        
        // )
      },
          
    
    ];

    this.setState({columnas: columnas});
  
  }

  crearIndex = () => {
    

 
  }


  ordenarElementos =(order=null)=>{
    // ord
    console.log(order);
    let dataSetHere = dataUsersArray;
    let a = [];
    // a = this.processSort(order,dataUsersArray);
    if(order==null){
      dataSetHere = dataUsersArray;
      // this.setState({dataInit: dataUsersArray}); 
      console.warn(pruebaArray);
      a = dataSetHere;
      // console.log(dataSetHere);
    }else{
      a = customSort(dataSetHere,this.state.columnas[0].selector,order);
    }
    this.state.sortAttr = order;
    this.setState({data: a});
 
    document.getElementById("pagination-next-page").click();
    boolSend = true;
    // // return false;
    
    console.log(a);
    this.asignarColumnas();
    
    // this.state.data

    // VOLVER AQUI
    
    
    
    
              
       
    return true;
    
  }
  filtrarElementos=(order=false)=>{
  
    let stateHere = (this.state.busqueda).toLowerCase();
    // this.state.busqueda 

   
    var search=dataUsersArray.filter(item=>{

      // console.log(item);
      // row.attributes[1].value_name
      
      // let exist_ = item.attributes[1].value_name;
      let exist_ =  this.recorrerAttr(item.attributes) 
      // item.attributes[1].value_name;
      console.log(exist_);
      // console.log(item.campeon.toLowerCase());
      if(
      // item.condition.toString().includes(stateHere) ||
      exist_.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(stateHere) ||
      // item.campeon.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
      exist_.toLowerCase().includes(stateHere)
      ){
        return item;
      }

      return "";
    });
    this.setState({data: search});
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextState);
  //   console.log(nextProps);
  // }
  // componentDidMount(){
    // componentWillMount() {
    //   console.log('Se ejecuta componentWillMount')
    // }
  
    // componentDidMount() {
    //   console.log('Se ejecuta componentDidMount')
    // }
  
    // componentWillReceiveProps(nextProps) {
    //   console.log('Se ejecuta componentWillReceiveProps con las propiedades futuras', nextProps)
    // }
  
    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('Ejecutando shouldComponentUpdate. Próximas propiedades y estado: ', nextProps, nextState)
    //   // debo devolver un boleano
    //   return true
    // }
  
    // componentWillUpdate(nextProps, nextState) {
    //   console.log('Ejecutando componentWillUpdate. Próximas propiedades y estado: ', nextProps, nextState)
    // }
  
    componentDidUpdate(prevProps, prevState) {
      // console.log("UPDATe");
      console.log(prevState);
      // console.log(prevProps);
      // this.state.container.load = true;
      // document.getElementById("contentData_").style.display = "none";
      // console.warn("QUITANDO");
      // this.LoadFunction();
      console.log(this.props.count);
      console.log(prevProps.count);
              // return false;
      console.log(this.props);

              
              if (this.props.count !== prevProps.count) {
                this.state.container.load = true;
                this.asignarColumnas(true);
                console.error("HER");
                this.state.title.order = "Seleccione un orden";
                this.state.title.condition = "Filtro de condición";
                
                // alert("DOS");
                // boolChangesd = true;
                // createLoad();
                // return false;
                let search_ = this.props.search;
                console.warn(search_);
                let test = null;
                test = fetch(linkApi+"api/search?query="+search_ , {
        method: 'GET',
        // mode: 'cors',
        // body: JSON.stringify({ 'parametro': 23 }),
        // body:dataParam,
        // headers: { 'Content-Type': 'application/json' },
        // method: "POST",
        // // mode: 'cors',
      })
                
                  .then((response) => response.json() )
                  .then((json) => {
                    console.log(json);
                    let resultsArray  = json.results; 
                    console.log(json);
                    this.state.container.load = false;
                    this.resetFilter(resultsArray)
                  //   dataUsersGlobal = json;
                  //   console.log(dataUsersGlobal);
                  //   if(dataUsersGlobal.error){
                  //     return false;
                  //   }
          
                  
                  dataUsersArray = resultsArray;
                  pruebaArray = resultsArray;
                  this.setState({dataInit: dataUsersArray}); 
                  //PEPE
                  // console.log(tablaCampeones);
                  this.asignarColumnas();
  
                  
                  this.setState({data: resultsArray}); 
                  
                  
          
                  // this.LoadFunction();
                    // return json;
                    return false;
          
          
                  }).catch(error => {
                  
                    let objReturn = {
                      title:"E r r o r",
                      error:true,
                      msg : error.message,
                
                    }
                    // personalityFetchMsg(objReturn);
                    // return  objReturn;
                  } 
                  );
              // hideLoad();  
              // alert();
              }else{

                // console.warn(this.state.group.condition);
                // this.asignarColumnas();
                if(boolSend){
                  this.asignarColumnas();
                  let a = [];
                  // if(this.state.sortAttr !==null){
                    a = customSort(this.state.data,this.state.columnas[0].selector,this.state.sortAttr);
                  // }else{
                    // a = this.state.data;
                  // }
                  
                  
                  console.log(a);
                  this.setState({data: a});
                  boolSend = false;
                  // document.getElementById("pagination-previous-page").click();
                  // document.getElementById("pagination-next-page").click();
                 
                  document.getElementById("pagination-previous-page").click();
    
                }
             
         
              }
              // createLoad();
             
              // console.info("ter");
      return false; 
  }
  
    // componentWillUnmount() {
    //   console.log('Se desmonta el componente...')
    // }
    resetFilter(resultsArray){
      this.state.group.condition = [];
      for (let i = 0; i < (resultsArray).length; i++) {
      const element = (resultsArray)[i];
      // console.log(element);

      let saber = this.recorrerAttr(element.attributes);
      // console.log(saber);
      // console.log(this.state.group.condition);
      let boolAdd = false;
      for (let j = 0; j < (this.state.group.condition).length; j++) {
        const element = (this.state.group.condition)[j];
        if(element==saber){
          // console.warn(element);
          // console.warn("SIU");
          boolAdd = true;
          break;
        }else{
          // boolAdd = true;
        }
        // console.warn(element);
      }

      if(boolAdd===false){
        (this.state.group.condition).push(saber);
      }

    }
    }
    componentDidMount(){
      // alert("UNO");
      console.log(this.state.search);
      let search_ = this.state.search;
      // let test = null;
      // http://localhost:4000/api/search?query
      let test = fetch(linkApi+"api/search?query="+search_ , {
        method: 'GET',
        // mode: 'cors',
        // body: JSON.stringify({ 'parametro': 23 }),
        // body:dataParam,
        // headers: { 'Content-Type': 'application/json' },
        // method: "POST",
        // // mode: 'cors',
      })
      
        .then((response) => response.json() )
        .then((json) => {


          // console.log(json);
          let resultsArray  = json.results; 
          console.log(json);
          console.log("CUANTAS VECEs");
          this.state.container.load = false;

          this.resetFilter(resultsArray);
        //   dataUsersGlobal = json;
        //   console.log(dataUsersGlobal);
        //   if(dataUsersGlobal.error){
        //     return false;
        //   }

        // dataUsersArray = dataUsersGlobal.data;
        dataUsersArray = resultsArray;
        pruebaArray = resultsArray;
        console.warn("PE");
        console.log(pruebaArray);
        this.setState({dataInit: dataUsersArray}); 
        this.asignarColumnas();
        console.log(resultsArray);
        this.setState({data: resultsArray}); 


        
       
          
        


          return json;


        }).catch(error => {
        
          let objReturn = {
            title:"E r r o r",
            error:true,
            msg : error.message,
      
          }
          // personalityFetchMsg(objReturn);
          return  objReturn;
        } 
        );

      //   return false;
      
  }
  


  handleSelect=(e)=>{
    // console.log(e);
    console.log("CAMBIANDO ORDEN");
    e = JSON.parse(e);
    let ord = e.ord=="null" ? null : e.ord;
    this.state.title.order = e.text;
    
    this.ordenarElementos(ord);
    return true;
  }
  handleSelectFilter=(e)=>{
    console.log(e);
    // console.log("CAMBIANDO ORDEN");
    e = JSON.parse(e);
    this.state.title.condition = e.text;
    this.state.busqueda = e.value;
    this.filtrarElementos();
  
      // let stateHere = (this.state.busqueda).toLowerCase();
    
    // this.ordenarElementos(ord);
    return true;
  }
  
  render(){
    // Universal();
  console.log("RENDER");
  const customStyles = {
    rows: {
        style: {
            // minHeight: '72px', // override the row height
            backgroundColor: "#00000000",
            borderBottomWidth:"0px"
        },
      }
  };


  function depreuab(va){
    console.log(va);
  }
  SetDataTableFirst(this.state.columnas);


  console.warn(this.state.container.load)
  return (
    
    // {this.}
  
    // {console.log("")}
    
    <div className="table-responsive">
      {/* <div  id="contentLoad_">
      {this.state.container.load == true ? "HOLA": "ADIOS"}
      </div> */}
      <div 
      
      // style={ {display: this.state.container.load==true ? "none":"" }} 
      
      id="contentData_">
      
      
        <div className="barraBusqueda">
              <input
                type="text"
                placeholder="Buscar"
                className="textField"
                name="busqueda"
                value={this.state.busqueda}
                onChange={this.onChange}
                id="idSearchChild"
              />
              <button type="button" className="btnBuscar" /*onClick={onClear}*/>
                {" "}
                {/* <FontAwesomeIcon icon={faReact} /> */}
                {/* <FontAwesomeIcon icon={faSearch} /> */}
                <FontAwesomeIcon icon={faSearch} />
                {/* <FontAwesomeIcon icon="fa-brands fa-react" /> */}
              </button>
            </div>
          <div className='divFiltersContainer'>
          <DropdownButton
            align="end"
            title={this.state.title.order}
            id="dropdown-menu-align-end"
            onSelect={this.handleSelect}
            disabled ={this.state.container.load==true ? true : false}
            className="customeDropDown"
            // onClick = {this.changeTitle01}
            // onChange={console.log("CHANGE")}
          >
            {/* href={"#/"+ (this.state.sortAttr="desc")} */}
            {/* onClick={this.changeTitle01} */}
            <Dropdown.Item  size="lg"  eventKey={ JSON.stringify({ord:"asc",text:"Menor a mayor"})}>Menor a mayor</Dropdown.Item>
            <Dropdown.Item  size="lg"  eventKey={ JSON.stringify({ord:"desc",text:"Mayor a menor"})} >Mayor a menor</Dropdown.Item>
            {/* <Dropdown.Item eventKey="3">Something else here</Dropdown.Item> */}
            {/* <Dropdown.Divider /> */}
            {/* <Dropdown.Item   eventKey="null">Sin ordenar</Dropdown.Item> */}
          </DropdownButton>

          <DropdownButton
          className="customeDropDown"
            align="end"
            title={this.state.title.condition}
            id="idDropDownCondition"
            onSelect={this.handleSelectFilter}
            disabled ={this.state.container.load==true ? true : false}
            // onClick = {this.changeTitle01}
            // onChange={console.log("CHANGE")}
          >

            {   
            
            // console.warn()
            (this.state.group.condition).map((row,i) => (
              // console.log(row)
                <Dropdown.Item key={i}   
                eventKey={ JSON.stringify({value:row,text:row})}
                //  eventKey={row}
                >{row}</Dropdown.Item>
                // <Row  key={dataObj.info.idUser + row.length} row={row} />
              ))
              }
            
            {/* <Dropdown.Item   eventKey={ JSON.stringify({ord:"asc",text:"Menor a mayor"})}>Menor a mayor</Dropdown.Item>
            <Dropdown.Item   eventKey={ JSON.stringify({ord:"desc",text:"Mayor a menor"})} >Mayor a menor</Dropdown.Item> */}
            {/* <Dropdown.Item eventKey="3">Something else here</Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item    eventKey={ JSON.stringify({value:"",text:"Filtro de condición"})}>Ninguno</Dropdown.Item>
          </DropdownButton>

          </div>
          <div class="containerDataTableBack" >
            {/* <div id="idLoad">Cargando</div> */}
            {/* {SetDataTableFirst(setDataVar)} */}
            <DataTable 
            columns={this.state.columnas}
            data={this.state.data}
            
            progressPending={this.state.container.load}
            // progressPending={true}
            // progressPending={this.LoadFunction()}
            // progressPending={pending}
            
            progressComponent={<CustomLoader />}
            // sortFunction={customSort}
            // CustomTableHeaderRow={this.buildCustomTableHeaderRow}
            // defaultSortAsc={false}
            // disableSortBy={true}
            // title="Campeones UCL 2000-2019"
            // progressPending={pending}
            pagination
            paginationRowsPerPageOptions={[30]}
            // paginationTotalRows={30}
            paginationPerPage = {30}
            // initialState = { pageIndex: 0}
            // autoResetPage =  {false}
            // paginationResetDefaultPage={resetPaginationToggle}
            // page = 
            // onPageChange={page => handlePagination(0)}
            paginationComponentOptions={paginacionOpciones}
            // paginationRowsPerPageOptions={[10, 25, 50, 100]}
          
            // paginationDefaultPage={0}
            fixedHeader
            // backGroundColor = {"black"}
            customStyles={customStyles}
            // noHeader={true}
            // fixedHeaderScrollHeight="600px"
            noDataComponent={<span>No se encontró ningún elemento</span>}
            rowStyleField={"myRowStyle"}
            // progressPending={<div id="idBar" className="classProgressBar">
            // <div id="idLoad2"></div>
          // </div>}
            // progressComponent={<CustomLoader />}
            // noHeader={true}
            />
          </div>
      </div>
    </div>
  );
}
}

export default App;
App.defaultProps = {
  count: 0
}
// FormAllUsers.defaultProps = {
//   propiedad: 'Valor por defecto definido para la propiedad'
// }


