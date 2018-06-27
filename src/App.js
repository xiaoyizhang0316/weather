import React, { Component } from 'react';
import './App.css';
import BasicInfo from './components/basicInfo.js';
import WeatherInfo from './components/weatherInfo.js';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
    interactivity: {
      events:{
        onhover:{
          enable: true,
          mode:'repulse'
        }
      }
    } 
}

class App extends Component {
 

  constructor(){
    super();
    this.state = {
     lat : '',
     lon : '',
     weather:'',
     city:'',
     country:'',
     temp:'',
     icon:''
   }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({
        lat:position.coords.latitude,
        lon:position.coords.longitude
      })
      this.getWeather();
    });
  }
  
  getWeather = () => {
    let url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + this.state.lat + '&lon=' + this.state.lon;
    fetch(url)
      .then(response=> response.json())
      .then(data => {
        this.setState({
          weather:data.weather[0].main,
          city:data.name,
          country:data.sys.country,
          temp:data.main.temp,
          icon:data.weather[0].icon
        });
        console.log(data);
        console.log(this.state.icon)
      });
  }


  componentDidMount() {
    this.getLocation();
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        {!this.state.icon ?
        <div> <p>Loading</p> </div> :
        (
          <div>      
            <BasicInfo city = {this.state.city} country={this.state.country}/>
            <WeatherInfo weather = {this.state.weather} temp = {this.state.temp} icon = {this.state.icon}/>
          </div>)}
      </div>
    )
  }
}

export default App;
