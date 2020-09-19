import React from 'react';
import logo from './logo.svg';
import './App.css';
const url = 'https://us-central1-test-api-f282b.cloudfunctions.net/app'

class App extends React.Component {
  state = {
    message: '',
    isLoaded: false,
    error: null,
    items: [],
    name: '',
    price: ''
  }

  async componentDidMount() {
    try {
      const res = await fetch(`${url}/items`)
      const result = await res.json()
      this.setState({
        isLoaded: true,
        items: result
      })
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      })
    }

    // fetch(url)
    // .then(res => res.json())
    // .then(result => {
    //   this.setState({
    //     items: result
    //   }) 
    // }, err=> {
    //   this.setState({
    //     err
    //   })
    // })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, price, items } = this.state
    fetch(`${url}/add`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, price })
    })
      .then(res => res.json())
      .then(result => {
        (name && price) &&
          this.setState({
            items: [{ name, price }, ...items],
            message: result.message
          })

          this.setState({
            message : result.message
          })
      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { name, price, error, items, isLoaded, message } = this.state
    if (error) {
      return (
        <div>
          {error.message}
        </div>
      )
    } else if (!isLoaded) {
      return <div>
        Loading....
      </div>
    } else {
      return (
        <div>
          { items.length > 0 &&
            <ul>
              {items.map(item => <li key={item.id} >{item.name} ${item.price}</li>)}
            </ul>
          }
          <form onSubmit={this.handleSubmit} >
            <label>
              Name : <span>&nbsp;</span>
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                value={name}
              />
            </label>
            <span>&nbsp;&nbsp;</span>
            <label>
              Price : <span>&nbsp;</span>
              <input
                onChange={this.handleChange}
                type="text"
                name="price"
                value={price}
              />
            </label>
            <span>&nbsp;&nbsp;</span>
            <input
              onChange={this.handleChange}
              type='submit'
              value="Add" />
          </form>
          {message &&
            <div>{message}</div>
          }
        </div>
      )
    };
  }
}
export default App;
