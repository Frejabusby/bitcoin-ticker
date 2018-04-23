import React from "react"
import { LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { moment } from "moment"
import openGdaxWebsocket from "../gdax-websocket"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tickerMessages: []
    }
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    newTickerMessage.price = parseFloat(newTickerMessage.price)
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

dateFormat = () => {
  moment(new Date()).format("hh:mm:ss")
	// moment(time).format("HH:mm")
}

  render() {
    return (
      <div>
        <LineChart width={700} height={500} data={this.state.tickerMessages}>
          <CartesianGrid strokeDasharray="1 3" />
          <XAxis dataKey="time" tickFormatter={this.dateFormat} />
          <YAxis type="number" domain={["auto", "auto"]} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Line type="natural" dataKey="price" stroke="#FF765F" animationEasing="ease-in" />
          <Line type="natural" dataKey="best_bid" stroke="#85B29F" animationEasing="ease-in" />
        </LineChart>
      </div>
    )
  }

}

export default App
