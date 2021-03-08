import './App.css';
import React, { Component } from 'react'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import Particles from 'react-particles-js'
import Facerecognition from './components/facerecognition/Facerecognition'
import Signin from './components/signin/signin';
import Register from './components/register/Register';
import Rank from './components/rank/Rank';


const initialState = {
  input: "",
  box: {
    leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0
  },
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  onUrlInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const obj = {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
    return obj;
  }

  displayFaceBox = (box) => {
    this.setState(() => {
      return { box: box }
    })
  }

  onImageSubmit = () => {
    fetch('https://salty-plateau-25318.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type' :'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
    })
    .then(response => response.json())
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(error => {return alert('unable to detect face')})
    .then(
      fetch('https://salty-plateau-25318.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type' :'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
        })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}));
    })
    )
    .catch(error => alert('unable to '))
    
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true})
    } else {
      this.setState(initialState)
    }
    this.setState({
      route: route
    });
  }

  render() {
    const options = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 600
          }
        },
      },
    };
    const { isSignedIn, route, box, input } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={options} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'signin' ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : (route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onUrlInputChange={this.onUrlInputChange} onImageSubmit={this.onImageSubmit} />
            <Facerecognition imageurl={input} box={box} />
          </div>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)}
      </div>
    );
  }
}

export default App;
