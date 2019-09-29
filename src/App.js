
    import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currency: 500,
      monthsSelected: 6,
      min: 500,
      max: 5000,
      monthsMin: 6,
      monthsMax: 24,
      result: false,
      loan: {},
     
    }
  }


  handleChangeCurrency = value => {
    this.setState({
      currency: value
    })
  };
  handleChangeMonth = value => {
    this.setState({
      monthsSelected: value
    })
  };


  handleCalculateInterest = () => {
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.currency}&numMonths=${this.state.monthsSelected}`)
      .then(res => {
        this.setState({ result: true, loan: res.data })
        console.log(res)
      })

  }

  handleCalculatereset = () => {
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.currency}&numMonths=${this.state.monthsSelected}`)
      .then(res => {
        this.setState({ result: false, loan: res.data })
        console.log(res)
      })

  }

  render() {
    const { currency, min, max, monthsMin, monthsMax, monthsSelected, result, loan } = this.state
    return (
      <div className="container cont">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h6 className="text-info">Choose your Loan Amount</h6>
            <div className='slider'>
              <Slider
                min={min}
                max={max}
                value={currency}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChangeCurrency}
                onChangeComplete={this.handleChangeComplete} />

              <div className="row total-val">
                <div className="col-md-4">{min}$</div>
                <div className="col-md-4 text-center text-primary val-sz">{currency ? `${currency}$` : ''}</div>
                <div className="col-md-4 text-right">{max}$</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row months-selector mt-5">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h6 className="text-info">Select your months</h6>
            <div className='slider'>
              <Slider min={monthsMin}
                      max={monthsMax}
                      value={monthsSelected}
                      onChangeStart={this.handleChangeStart}
                      onChange={this.handleChangeMonth}
                onChangeComplete={this.handleChangeComplete} />

              <div className="row total-val">
                <div className="col-md-4">{monthsMin} months</div>
                <div className="col-md-4 text-center text-primary val-sz">{monthsSelected ? `${monthsSelected} months` : ''}</div>
                <div className="col-md-4 text-right">{monthsMax} months</div>
              </div>

            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <button className="btn btn-outline-primary" onClick={this.handleCalculateInterest}>Calculate Interest</button>
          </div>
        </div>
        {result && <div className="row mt-4">

          <div className="col-md-3"></div>
          <div className="col-md-6 text-center">
            <div className="table">
              <div className="table-body">
                <div className="row">
                  <div className="col-md-6 text-left">
                    <p>Selected Amount: <strong className="text-primary">{loan.principal.amount}$</strong></p>
                    <p>Months Duration: <strong className="text-info">{loan.numPayments}</strong></p>
                  </div>
                  <div className="col-md-6 text-left">
                    <p>Interest Rate: <strong className="text-warning">{loan.interestRate}%</strong></p>
                    <p>Monthly Payment: <strong className="text-danger">{loan.monthlyPayment.amount}$</strong></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <span className="text-info">
                      Total Amount to pay <strong className="text-success">{loan.numPayments * loan.monthlyPayment.amount} $</strong>
                    </span>
                  </div>
                 <button className="btn btn-warning btn-sm" style={{marginLeft:"500px"}} onClick={this.handleCalculatereset}>Reset</button>   

                </div>
              </div>
            </div>

          </div>
        </div>}
      </div>

    );
  }
}
  


