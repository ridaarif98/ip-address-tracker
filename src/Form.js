import React, { useState, useEffect }  from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import iconArrow from './images/icon-arrow.svg';
import MarkerPosition from './MarkerPosition';

function IPForm() {
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAdress] = useState("")
  const checkIpPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
  const checkDomainPattern = /^(?!-)(?!.*--)[A-Za-z0-9-]{1,63}(?<!-)\.([A-Za-z0-9-]{1,63}\.)*[A-Za-z]{2,6}$/;

  useEffect(() => {
    try{
      const getIpData = async () => {
        const result =await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_NpqdxEKOgaFvCrNVat6uV8AGpNa4f&ipAddress=8.8.8.8`)
        const data =await result.json()
        setAddress(data)
      }
      getIpData()
    }catch(error){
      console.trace(error)
    }
  },[])

  const fetchIpData = async () => {
    const result =await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_NpqdxEKOgaFvCrNVat6uV8AGpNa4f&${
      checkIpPattern.test(ipAddress) ? `ipAddress=${ipAddress}`: checkDomainPattern.test(ipAddress) ?
      `domain=${ipAddress}` : ""
    }`)
        const data =await result.json()
        console.log(data)
        setAddress(data)
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      fetchIpData();
  }

  return(
    <>
    <div className="ip-form">
      <h1>IP Address Tracker</h1>
      <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search for an IP address or domain" 
        name="ip-address" 
        value={ipAddress}
        onChange={(e) => setIpAdress(e.target.value)}
      />
      <button type="submit"><img src={iconArrow} alt="icon-arrow" /></button>
      </form>
      <div className="ip-data">
      <div className="data">
          <span>IP Address</span>
          {address && <h4>{address.ip}</h4> }
      </div>
      <div className="data">
          <span>Location</span>
          {address && <h4>{address.location.city}, {address.location.region}</h4>}
      </div>
      <div className="data">
        <span>Time Zone</span>
        {address &&<h4>UTC {address.location.timezone}</h4>}
      </div>
      <div className="data">
        <span>ISP</span>
        {address &&<h4>{address.isp}</h4>}
      </div>
      </div>
    </div>
    {address &&
        <MapContainer center={[address.location.lat, address.location.lng]} zoom={13} scrollWheelZoom={false} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerPosition address={address}/>
      </MapContainer>
    }
      </>
  )
}

export default IPForm;