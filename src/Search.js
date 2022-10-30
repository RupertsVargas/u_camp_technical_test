import React, {useEffect, useState} from 'react'
import createRoot  from 'react-dom';
import SearchInput, {createFilter} from 'react-search-input'
import App from './App';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';
// import React,  from "react";


import { faSearch,faSpinner} from "@fortawesome/free-solid-svg-icons";
const HtmlBody = (param) => {

    // console.log(param);
    if(param.attr==false){
        return null;
    }

    

    return (
        <div className='htmlBodyInit'>
            <div className="titleHtmlBodyInit">U Camp Technical Test</div>
            <div className="subTitleHtml">🤟🏻Prueba técnica para los futuros instructores y facilitadores de U Camp 🤓💻</div>
            <div className="infoSubTitleHtml">
            📝El objetivo del test técnico es construir un Front-End y un Back-End que interactuen con una API externa.
            <br></br>
            👀Vamos a usar la API pública de Mercado Libre. De ella vamos a extraer publicaciones que luego vamos a guardar en tu propio back-end usando un caché. Para el Front-end vamos a desarrollar una serie de Componentes de React para poder mostrar e interactuar con las publicaciones antes mencionadas.
            </div>

            <div>Autor</div>
            <div className="nameMe">Roberto Vargas Arizmendi</div>
        </div>
        );
    
  };
const RadioBtn = () => {
    /**
     * Determina si el checkbox debería estar checkeado basado en
     * el contenido del localStorage
     */
    const [checked, setChecked] = useState(
      localStorage.getItem("theme") === "dark" ? true : false
    );
  
    /**
     * Cada vez que el estado checked cambie, actualiza la propiedad
     * data-theme en el HTML para que use el tema que estamos almacenando
     * en el localStorage
     */
    useEffect(() => {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
    }, [checked]);
  
    /**
     * Actualiza el estado checked y el contenido de nuestro objeto
     * theme en el localStorage basados en el checkbox
     */
    const toggleThemeChange = () => {
        console.log(checked)
        console.log(localStorage);
      if (checked === false) {
        localStorage.setItem("theme", "dark");
        setChecked(true);
      } else {
        localStorage.setItem("theme", "light");
        setChecked(false);
      }
    };
  
    return (
      
            <Form>
              <Form.Check 
                type="switch"
                id="custom-switch"
                className="customCheckLabel"
                label="Nocturno"
                defaultChecked={checked}
                onChange={() => toggleThemeChange()}
              />
            
            </Form>
          );

  };
  

var count = 0;
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showInit:true,
        };
        // console.log(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    


    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleChangeRadio(e){
        console.log(e);
        if (document.getElementById('custom-switch').checked)
            {
            // alert('checkbox1 esta seleccionado');
            }else{

            }
        // let pala = e.target[0].value;
        // console.log(pala)
    }

    handleSubmit(event) {
        let pala = event.target[0].value;
        if(pala===null ||pala ===""){
            event.preventDefault();
            return true;
        }
        // this.state.value = event.target[0].value ;
        console.log(event.target[0].value);
        // document.getElementById("htmlBodyInit").style.display = "none";
        // document.getElementById("htmlBodyInit").style.display="none"; 
        this.state.showInit = false;
        this.setState({showInit: false});
        // this.setState(this.)
        createRoot.render(
            <App
            count = {count}
            search={pala} />
            , document.getElementById("idApp_"));
    
        // alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        count++;
            console.log(count);
        
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          console.log('do validate');
        }
      }

      reload = () => {
        window.location.reload(true);
    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps);
    // }
    render() {

        // alert();
        return (
            <div>
                <div className="divContainerForm">
                 <div onClick={this.reload}  className="photoMe"></div>
                <form className='formContainer' onSubmit={this.handleSubmit}>
            {/* <label> */}
            {/* Name: */}
            <input placeholder="Buscar" className='formInputSearchCustome' type="search" value={this.state.value} onChange={this.handleChange}   onKeyDown={this._handleKeyDown}
            // container_load ={true}
            />
            {/* </label> */}
            <button className="customeSubmit" type="submit" value="" >
            <FontAwesomeIcon icon={faSearch} />
            {/* spin className='iconCustom'  */}
            </button>
        </form>


    
        <RadioBtn></RadioBtn>  
        </div>
        
        <HtmlBody attr={this.state.showInit} ></HtmlBody>



        </div>
        );
    }
}

  export default Search;
