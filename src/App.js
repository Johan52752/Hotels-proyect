import { Header } from "./components/header/Header.jsx";
import { Filters } from "./components/filters/Filters.jsx";
import { Hotel } from "./components/hotel/Hotel.jsx";
import { hotelsData } from "./scripts/data.js";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [availabilityFrom, setAvailabilityFrom] = useState(0);
  const [availabilityTo, setAvailabilityTo] = useState(0);
  const [country, setCountry] = useState("Cualquier pais");
  const [price, setPrice] = useState("Cualquier precio");
  const [size, setSize] = useState("Cualquier tamaño");
  let hotelFilter = [];
  const handlerDateFrom = (e) => {
    if (availabilityTo && new Date(`${e.target.value} 00:00:00`) > new Date(`${availabilityTo} 00:00:00`)) {
      alert(
        "Tienes que poner una fecha de salida mayor a la fecha de entrada"
      );
    } else {
      setAvailabilityFrom(e.target.value);
    }
  };
  const handlerDateTo = (e) => {
    if (availabilityFrom) {
      if (new Date(`${e.target.value} 00:00:00`) <= new Date(`${availabilityFrom} 00:00:00`)) {
        alert(
          "Tienes que poner una fecha de salida mayor a la fecha de entrada"
        );
      } else {
        setAvailabilityTo(e.target.value);
      }
    } else {
      alert("Tienes que colocar primero la fecha de entrada");
    }
  };
  const handlerCountry = (e) => {
    setCountry(e.target.value);
    
  };
  const handlerPrice = (e) => {
    setPrice(e.target.value);
    
  };
  const handlerSize = (e) => {
    setSize(e.target.value);
    
  };
  const handlerReset = () => {
    setAvailabilityFrom("");
    setAvailabilityTo("");
    setCountry("Cualquier pais");
    setPrice("Cualquier precio");
    setSize("Cualquier tamaño");
  };
  const dateToFormatString=(date)=>{
    return (`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 00:00:00`)
  }

  
    const filterByDate = (hotelDateFrom, hotelDateTo) => {
      const dateUserFrom = new Date(`${availabilityFrom} 00:00:00`).getTime(); //convierto a tiempo UNIX la fecha de entrada
      const dateUserTo = new Date(`${availabilityTo} 00:00:00`).getTime(); //convierto a tiempo UNIX la fecha de salida
      const dateHotelFrom = new Date(hotelDateFrom);
      const dateHotelTo = new Date(hotelDateTo);
      const dateHotelFromInUnix = new Date(dateToFormatString(dateHotelFrom)).getTime();//Elimino tiempos y segundos de la fecha de entrada de los hoteles, pasandole un formato unicamente con año, mes y dia, y luego lo convierto a tiempo UNIX
      const dateHotelToInUnix = new Date(dateToFormatString(dateHotelTo)).getTime();//Elimino tiempos y segundos de la fecha de salida de los hoteles, pasandole un formato unicamente con año, mes y dia, y luego lo convierto a tiempo UNIX
      return (
        dateUserFrom >= dateHotelFromInUnix &&
        dateUserFrom < dateHotelToInUnix &&
        dateUserTo > dateHotelFromInUnix &&
        dateUserTo <= dateHotelToInUnix
      );
    };
    const filterByCountry = (hotelCountry) => {
      return country === "Cualquier pais" ? true : hotelCountry === country;
    };
    const filterByPrice = (hotelPrice) => {
      return price === "Cualquier precio" ? true : hotelPrice == price;
    };
    let filterBySize = (hotelSize) => {
      switch(size){
        case "Cualquier tamaño":
          return true;
          
        case "Hotel pequeño":
          return hotelSize <= 10;
          
        case "Hotel mediano" :
          return hotelSize <= 20 && hotelSize > 10;
          
        case "Hotel grande":
          return hotelSize > 20;
          
      }
    };
    hotelFilter = hotelsData.filter((hotel) => {
      return (
        availabilityFrom && availabilityTo ? filterByDate(hotel.availabilityFrom,hotel.availabilityTo):true &&
        filterByCountry(hotel.country) &&
        filterByPrice(hotel.price) &&
        filterBySize(hotel.rooms)
      );
    });

  return (
    <div className="App">
      <Header
        dateFrom={availabilityFrom}
        dateTo={availabilityTo}
        country={country}
        price={price}
        size={size}
      />
      <Filters
        stateFrom={[availabilityFrom, handlerDateFrom]}
        stateTo={[availabilityTo, handlerDateTo]}
        stateCountry={[country, handlerCountry]}
        statePrice={[price, handlerPrice]}
        stateSize={[size, handlerSize]}
        handlerReset={handlerReset}
      />
      <div className="Hotels">
        {hotelFilter.length > 0 ? (
          hotelFilter.map((hotel, index) => {
            return (
              <Hotel
                key={index}
                photo={hotel.photo}
                name={hotel.name}
                description={hotel.description}
                city={hotel.city}
                country={hotel.country}
                rooms={hotel.rooms}
                price={hotel.price}
              />
            );
          })
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
}

export default App;
