import Layout from '../components/Layout'
import React, {useEffect, useState} from 'react'
import {requirePageAuth} from "../lib/auth";
import cookies from "next-cookies";
import {redirectLogin} from "../utils";
import {Line} from 'react-chartjs-2';
import axios from "axios";

import '../styles/Statistic.scss'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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
  //     // scaleID: 'y-axis-0',
  //     // value: 5,
  //     borderColor: 'black',
  //     borderWidth: 4,
  //     label: {
  //       enabled: false,
  //       // content: 'Test label'
  //     }
  //   }]
  // },
  scales: {
    display: true,
    yAxes: [{
      ticks: {
        precision: 0,
        beginAtZero: true,
        // step: 3,
        maxTicksLimit: 6,
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
      borderColor: '#263238',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#263238',
      pointBackgroundColor: '#263238',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#FCC232',
      pointHoverBorderColor: '#FCC232',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: []
    }
  ]
};

export default function Statistic (props) {
  const [statisticData, setStatisticData] = useState({});
  const [selectedVal, setSelectedValue] = useState('');

  const {link, referrers, countries, cities} = props?.data;
  // const {referrers} = link;
  console.log('props?.data', props?.data)

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

  let date = link && new Date(link.createdAt);

  return (
    <Layout>
      <div className="statistic">
        {link &&
          <div className="statistic-row row-info">
            <div className="statistic-link">
              Burlessed for <span>{link.shortLink}</span>
            </div>
            <div className="link-info">
              <div>
                <span className="info-wrapper">
                  <span className="text">Total Click:</span><span className="info">{link.totalClickCount}</span>
                </span>
                <span className="info-wrapper">
                  <span className="text">Created:</span>
                  <span className="info">
                      {date.toLocaleDateString("en-US", dateOptions)}
                    </span>
                </span>
              </div>
              <div className="statistic-long-link">
                <span className="header-text">Long Link: </span><a target="_blank" href={link.longLink} className="link">{link.longLink}</a>
              </div>
            </div>
          </div>
        }

        {statisticData &&
        <div className="statistic-row">
          <div className="dropdown">
            <select name="select-choice" value={selectedVal} onChange={(e) => handleOnchangeSelect(e.target.value)}>
              <option value="days">15 Days</option>
              <option value="months">Months</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <Line
              data={statisticData}
              options={options}
              height={250}
              width={1000}
            />
          </div>
        </div>
        }

        <div className="click-info-wrapper statistic-row">
          {referrers && countries.length > 0 &&
          <div className="click-info referrer">
            <div className="click-info-header">
              Referrers
            </div>
            {referrers.map((data, i) => {
              return (
                <div className="click-info-content" key={i}>
                  <span className="count">
                    {data.count}
                  </span>
                      <span className="data">
                    {data.referrer}
                  </span>
                </div>
              )
            })}
          </div>
          }
          {countries && countries.length > 0 &&
            <div className="click-info country">
              <div className="click-info-header">
                Countries
              </div>
              {countries.map((data, i) => {
                return (
                  <div className="click-info-content" >
                  <span className="count">
                    {data.count}
                  </span>
                    <span className="data">
                    {data.country}
                  </span>
                  </div>
                )
              })}
            </div>
          }
          {cities && countries.length > 0 &&
          <div className="click-info city">
            <div className="click-info-header">
              Cities
            </div>
            {cities.map((data, i) => {
              return (
                <div className="click-info-content" key={i}>
                  <span className="count">
                    {data.count}
                  </span>
                  <span className="data">
                    {data.city}
                  </span>
                </div>
              )
            })}
          </div>
          }
        </div>
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
      const response = await fetch(`${BASE_URL}/api/links/statistic/${id}`, {
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
