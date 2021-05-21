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
    setAvailabilityFrom(e.target.value);
  };
  const handlerDateTo = (e) => {
    if (availabilityFrom) {
      if (new Date(e.target.value) < new Date(availabilityFrom)) {
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
    if (availabilityFrom && availabilityTo) {
      setCountry(e.target.value);
    } else {
      alert(
        "Tienes que colocar las 2 fechas primero antes de aplicar los filtros"
      );
    }
  };
  const handlerPrice = (e) => {
    if (availabilityFrom && availabilityTo) {
      setPrice(e.target.value);
    } else {
      alert("Tienes que colocar las 2 fechas primero para aplicar los filtros");
    }
  };
  const handlerSize = (e) => {
    if (availabilityFrom && availabilityTo) {
      setSize(e.target.value);
    } else {
      alert(
        "Tienes que colocar las 2 fechas primero antes de aplicar los filtros"
      );
    }
  };
  const handlerReset = (e) => {
    setAvailabilityFrom("");
    setAvailabilityTo("");
    setCountry("Cualquier pais");
    setPrice("Cualquier precio");
    setSize("Cualquier Tamaño");
  };

  if (availabilityFrom && availabilityTo) {
    const conditionDate = (from, to, hotelFrom, hotelTo) => {
      let dateFrom = new Date(from).getTime(); //convierto a tiempo UNIX la fecha de entrada
      let dateTo = new Date(to).getTime(); //convierto a tiempo UNIX la fecha de salida
      let dateHotelFrom = new Date(hotelFrom);
      let dateHotelTo = new Date(hotelTo);
      dateHotelFrom = new Date(
        dateHotelFrom.getFullYear() +
          "-" +
          (dateHotelFrom.getMonth() + 1) +
          "-" +
          (dateHotelFrom.getDate() - 1)
      ).getTime();
      dateHotelTo = new Date(
        dateHotelTo.getFullYear() +
          "-" +
          (dateHotelTo.getMonth() + 1) +
          "-" +
          dateHotelTo.getDate()
      ).getTime();
      return (
        dateFrom >= dateHotelFrom &&
        dateFrom < dateHotelTo &&
        dateTo > dateHotelFrom &&
        dateTo <= dateHotelTo
      );
    };
    const conditionCountry = (country, hotelCountry) => {
      return country === "Cualquier pais" ? true : hotelCountry === country;
    };
    const conditionPrice = (price, hotelPrice) => {
      return price === "Cualquier precio" ? true : hotelPrice == price;
    };
    let conditionSize = (size, hotelSize) => {
      if (size == "Cualquier tamaño") {
        return true;
      } else if (size === "Hotel pequeño") {
        return hotelSize <= 10;
      } else if (size === "Hotel mediano") {
        return hotelSize <= 20 && hotelSize > 10;
      } else if (size === "Hotel grande") {
        return hotelSize > 20;
      }
    };
    hotelFilter = hotelsData.filter((hotel) => {
      return (
        conditionDate(
          availabilityFrom,
          availabilityTo,
          hotel.availabilityFrom,
          hotel.availabilityTo
        ) &&
        conditionCountry(country, hotel.country) &&
        conditionPrice(price, hotel.price) &&
        conditionSize(size, hotel.rooms)
      );
    });
  } else {
    hotelFilter = hotelsData;
  }

  console.log(hotelFilter);
  console.log(availabilityFrom, availabilityTo);
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
