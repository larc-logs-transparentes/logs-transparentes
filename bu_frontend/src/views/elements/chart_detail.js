import React, { Component } from 'react';
import { render } from 'react-dom';
import { Line } from 'react-chartjs-2';

let lineData;

const lineDataSpend = {
  labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  datasets: [
    {
      label: 'Candidato X',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#4c9e09',
      borderColor: '#4c9e09',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#4c9e09',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [350000, 650000, 800000, 1200000, 2000000, 5000000, 6500000, 8100000, 9200000, 10000000, 13000000, 18000000]
    },
    {
      label: 'Candidato Y',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'blue',
      borderColor: 'blue',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'blue',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [210000, 410000, 700000, 1000000, 2300000, 4600000, 6800000, 8000000, 9400000, 12000000, 16000000, 22000000]
    }
  ]
};


lineData = lineDataSpend; //init the graph data to 'Spend'

class ChartDetail extends Component {

  constructor(props) {
    super(props);
    this.changeMetric = this.changeMetric.bind(this);

    this.state = {
      selectedMetric: 'Spend'
    };
  }

  changeMetric(event) {

    this.setState({
      selectedMetric: event.target.value
    });

    switch (event.target.value) {
      case 'Spend':
        lineData = lineDataSpend;
        break;
      default:
    }
  }

  render() {
    const lineOptions = {
      title: {
        display: true,
        text: 'Candidato X vs Candidato Y'
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (value, data) {
            console.log('data', data)
            const currentLabel = data.datasets[value.datasetIndex].label;
            return currentLabel + ': ' + '$' + value.yLabel;
          }
        }
      },
      legend: {
        display: true
      },
      maintainAspectRatio: true,
      scales: {
        yAxes: [{
          ticks: {
            callback: function (value) {
              return parseFloat(value.toFixed(2));
            }
          },

          //render(<ChartDetail />, document.body);
          stacked: false,
          gridLines: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }

    };

    return (
      <div>
        <div className="row">
          <div className="col-xl-10">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" />
              </div>
              <div className="card-block">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
        </div>

      </div>

    )

  }
}

export default ChartDetail;
