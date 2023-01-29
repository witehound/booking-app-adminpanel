import "./NewRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const API_BASE_URL = process.env.REACT_APP_VITE_API_BASE_URL;

const NewRoom = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const { data, error, loading } = useFetch(`${API_BASE_URL}/hotel`);
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(",").map((el) => ({ number: el }));
    try {
      await axios.post(
        `${API_BASE_URL}/room/${hotelId}`,
        {
          ...info,
          roomNumbers,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Give coma between room  Numbers"
                />
              </div>
              <div className="selectRooms">
                <label>Choose an Hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading ? (
                    <>Loadin...</>
                  ) : (
                    <>
                      {data &&
                        data.map((hotel) => (
                          <option value={hotel._id} key={hotel._id}>
                            {hotel.name}
                          </option>
                        ))}
                    </>
                  )}
                </select>
              </div>
              <button onClick={(e) => handleClick(e)}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
