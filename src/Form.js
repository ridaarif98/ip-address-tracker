import icon from './images/icon-arrow.svg';

function IPForm() {
  return(
    <div className="ip-form">
      <h1>IP Address Tracker</h1>
      <input type="text" placeholder="Search for an IP address or domain" name="ip-address" />
      <button type="submit"><img src={icon} alt="icon-arrow" /></button>
      <div className="ip-data">
      <div className="data">
          <span>IP Address</span>
          <h4>192.212.0.9</h4>
      </div>
      <div className="data">
          <span>Location</span>
          <h4>Brooklyn,NY 10001</h4>
      </div>
      <div className="data">
        <span>Time Zone</span>
        <h4>UTC-05:00</h4>
      </div>
      <div className="data">
        <span>ISP</span>
        <h4>SpaceX Starlink</h4>
      </div>
      </div>
    </div>
  )
}

export default IPForm;