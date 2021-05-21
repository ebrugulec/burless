import Layout from '../components/Layout'
import React, {useEffect, useState} from 'react'
import {requirePageAuth} from "../lib/auth";
import cookies from "next-cookies";
import {redirectLogin} from "../utils";
import {Line} from 'react-chartjs-2';
import axios from "axios";

import '../styles/Statistic.scss'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const options = {
  responsive: true,
  maintainAspectRatio: false,
  // tooltips: {
  //   mode: 'index',
  //   intersect: true
  // },
  // annotation: {
  //   annotations: [{
  //     type: 'line',
  //     mode: 'horizontal',
  //     scaleID: 'y-axis-0',
  //     value: 5,
  //     borderColor: 'rgb(75, 192, 192)',
  //     borderWidth: 4,
  //     label: {
  //       enabled: false,
  //       content: 'Test label'
  //     }
  //   }]
  // },
  scales: {
    yAxes: [{
      ticks: {
        precision: 0,
        beginAtZero: true,
      },
      // gridLines: {
      //   display: false
      // },
    }],
    xAxes: [{
      gridLines: {
        display: false
      },
    }]
  },
  // options: {
  //   responsive: true,
  //   title: {
  //     display: true,
  //     text: 'Chart.js Drsw Line on Chart'
  //   },
  //   tooltips: {
  //     mode: 'index',
  //     intersect: true
  //   },
  //   annotation: {
  //     annotations: [{
  //       type: 'line',
  //       mode: 'horizontal',
  //       scaleID: 'y-axis-0',
  //       value: 5,
  //       borderColor: 'rgb(75, 192, 192)',
  //       borderWidth: 4,
  //       label: {
  //         enabled: false,
  //         content: 'Test label'
  //       }
  //     }]
  //   }
  // }
}
const graphData = {
  labels: [],
  datasets: [
    {
      label: 'Click Count',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'pink',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

export default function Statistic (props) {
  const [statisticData, setStatisticData] = useState({});
  const [selectedVal, setSelectedValue] = useState('');

  const {link} = props?.data;
  console.log('props', props)

  useEffect(() => {
    const {clickInfo} = props.data;
    if (props.data && clickInfo) {
      clickInfo.map((click) => {
        graphData.labels.push(click.date);

        graphData.datasets[0] && graphData.datasets[0].data.push(click.count)
      })
    }

    setStatisticData(graphData);
  }, []);

  const handleOnchangeSelect = (val) => {
    setSelectedValue(val);
    if (props.id && val !== setSelectedValue) {
      axios.get(`${BASE_URL}/api/links/statistic/${props.id}/${val}`)
        .then((res) => {
          if (res.data && res.data.data && res.data.data.clickInfo) {
            setStatisticData({});
            graphData.labels = [];
            graphData.datasets[0].data = [];
            res.data.data.clickInfo.map((click) => {
              graphData.labels.push(click.date);
              graphData.datasets[0].data.push(click.count)
            });
            setStatisticData(graphData);
          }
        })
        .catch((err) => {
          console.log('err', err)
        });
    }
  };

  return (
    <Layout>
      <div className="statistic">
        {link &&
          <div>
            <div className="link-info">
              burlessed for {link.shortLink}
            </div>
            <div>
              <span>
                Total Click: {link.totalClickCount}
              </span>
              Created: {link.createdAt}
              Long Link: {link.longLink}
            </div>
          </div>
        }

        {statisticData &&
        <div>
          <div className="dropdown">
            <select name="select-choice" value={selectedVal} onChange={(e) => handleOnchangeSelect(e.target.value)}>
              <option value="days">15 Days</option>
              <option value="months">Months</option>
            </select>
          </div>
          <div style={{width: '400px'}}>
            <Line
              data={statisticData}
              options={options}
              height={200}
              width={400}
            />
          </div>
        </div>
        }
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const token = cookies(context).burless;
  //Todo: user agent browser vs
  // const userAgent = context.req ? context.req.headers['user-agent'] : ''
  const { id } = context.req.params || null;

  if (id) {
    try {
      const response = await fetch(`http://localhost:8080/api/links/statistic/${id}`, {
        credentials: 'include',
        ...(context.req
          ? {
            headers: {
              Cookie: context.req.headers.cookie
            },
          }
          : {}),
      });
      let result = await response.json();
      return {
        props: {
          data: result.data ? result.data : null,
          id,
        }
      };
    } catch(err) {
      return { props: { data: null } };
    }
  } else {
    //Todo: id yoksa islem yap ona gore.
    return { props: { data: null } };
  }

  // if (!token) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   };
  // }
};
