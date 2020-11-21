import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import http from 'http';
import dynamic from 'next/dynamic';

export default function Home() {
  const [result, setResult] = useState({ ip: '106.219.111.111', location: {region: 'Bareilly', city: 'India', postalCode: '243122', timezone: '+05:30', lat: 28.378390, lng: 79.402820  }, isp: 'Reliance Jio' });
  const [load, setLoad] = useState(1);
  const [dropdown, setdropdown] = useState(false);
  const MapWithNoSSR = dynamic(() => import("../component/map"), {
    ssr: false
  });

  useEffect(() => {
    http.get({ 'host': 'api.ipify.org','path': '/' }, function (resp) {
      resp.on('data', function (ip) {
        let api_key = process.env.IPIFY_API_key;
        let api_url = 'https://geo.ipify.org/api/v1?';

        let url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

        http.get(url, function (response) {
          let str = '';
          response.on('data', function (chunk) { str += chunk; });
          response.on('end', function () { setResult(JSON.parse(str)); setLoad(0); });
        }).end();
      });
    });
  }, [])

  function SearchIP(e) {
    e.preventDefault();
    setLoad(2);
    let ip = e.currentTarget.search.value;
    let api_key = process.env.IPIFY_API_key;
    let api_url = 'https://geo.ipify.org/api/v1?';

    let url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

    http.get(url, function (response) {
      let str = '';
      response.on('data', function (chunk) { str += chunk; });
      response.on('end', function () { setResult(JSON.parse(str)); setLoad(0); });
    }).end();

  }
  return (
    <>
      <main>
        <div className="upper-container"></div>
        <div className="middle-container">
          <div id="map">
            <MapWithNoSSR result={result} />
            <div className="attribute">
              <span>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
    Coded by <a href="https://github.com/tsaxena4k" target="_blank">Tushar Saxena</a>.</span>
            </div>
          </div>
        </div>
        <div className="lower-container w-100">
          <div className="container text-center">
            <div className="row">
              <div className="col-sm-12 mb-3">
                <h2 className="font-weight-bolder text-white">IP Address Tracker</h2>
              </div>
              <div className="col-sm-12 mb-4">
                <form onSubmit={SearchIP}>
                  <div className="form-group">
                    <label htmlFor="search"></label>
                    <input type="text" className="form-control" id="search" name="search" placeholder="Search for any IP address or domain" required />
                    <button type="submit" className="d-inline">
                      {load === 2 ? <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div> : <><IoIosArrowForward /></>}
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-sm-12" style={{ position: 'relative' }}>
                <div className="card shadow collapse show" id="collapseExample">
                  <div className="card-body row">
                    {load == 1 ?
                      <div style={{width:'100%',display:'flex',justifyContent:'center',zIndex:'9999'}}>
                        <div className="spinner-border text-dark text-center" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                      :
                      <><div className="card-element col-sm-3">
                        <h6>IP ADDRESS</h6>
                        <h3 className="content1">{result.ip}</h3>
                      </div>
                        <div className="card-element col-sm-3">
                          <h6>LOCATION</h6>
                          <h3 className="content1">{`${result.location.region}, ${result.location.city} ${result.location.postalCode}`}</h3>
                        </div>
                        <div className="card-element col-sm-3">
                          <h6>TIME ZONE</h6>
                          <h3 className="content1">{`UTC${result.location.timezone}`}</h3>
                        </div>
                        <div className="card-element col-sm-3">
                          <h6>ISP</h6>
                          <h3 className="content1">{result.isp}</h3>
                        </div></>}
                  </div>
                </div>
                <div className="card minimizer">
                  <div className="ml-2 card-body text-center">
                    <h6>{dropdown ? "Show Details" : null}</h6>
                    <a data-toggle="collapse" href="#collapseExample" aria-expanded="true" aria-controls="collapseExample" onClick={() => setdropdown(dropdown ? false : true)}>{!dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
