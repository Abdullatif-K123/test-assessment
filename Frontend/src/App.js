import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  setAddress,
  setEmail,
  fetchGeolocationStart,
  fetchGeolocationSuccess,
  fetchGeolocationError,
} from "./redux/geolocationSlice";

function App() {
  const dispatch = useDispatch();

  // Use Redux state
  const { address, email, geolocation, loading, error } = useSelector(
    (state) => state.geolocation
  );

  const handleAddressChange = (e) => {
    dispatch(setAddress(e.target.value));
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      dispatch(fetchGeolocationError("Address is required"));
      return;
    }

    dispatch(fetchGeolocationStart());

    try {
      const response = await fetch("http://localhost:4000/api/geolocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(fetchGeolocationSuccess(data));
      } else {
        dispatch(
          fetchGeolocationError(
            "Address not found please make sure you have add the correct address"
          )
          
        );
        
        toasting("Address not found please make sure you have add the correct address");
      }
    } catch (err) {
      dispatch(fetchGeolocationError("Error fetching geolocation"));
      toasting("Error fetching geolocation");
    }
  };
  //toasting the error
  const toasting =(msg)=>{
   
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });  
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Geolocation Finder</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter address"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Get Geolocation"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {geolocation && (
          <div >
            <h2>Geolocation Results:</h2>
            <p>Latitude: {geolocation.latitude}</p>
            <p>Longitude: {geolocation.longitude}</p>
          </div>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
