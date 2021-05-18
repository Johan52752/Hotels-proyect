import { Header } from "./components/Header.jsx";
import { Filters } from "./components/Filters.jsx";
import { Hotels } from "./components/hotels.jsx";
import { hotelsData } from "./scripts/data.js";
import { useState } from "react";
import "./App.css";

function App() {
  const [availabilityFrom, setAvailabilityFrom]=useState(0);
  const [availabilityTo, setAvailabilityTo]=useState(0);
  const [country, setCountry]=useState("Cualquier pais");
  const [price, setPrice]=useState("Cualquier precio");
  const [size, setSize]=useState("Cualquier tamaño");
  // const [reset, setReset]=useState(false);
  const handlerDateFrom=(e)=>{
    setAvailabilityFrom(e.target.value)
  }
  const handlerDateTo=(e)=>{
    if(availabilityFrom ){
      if(new Date(e.target.value)< new Date(availabilityFrom)){
        alert("Tienes que poner una fecha de salida mayor a la fecha de entrada")
      }else{
        setAvailabilityTo(e.target.value)
      }
    }else{
      alert("Tienes que colocar primero la fecha de entrada");
    }
  }
  const handlerCountry=(e)=>{
    if(availabilityFrom && availabilityTo){
      setCountry(e.target.value) ;
    }else{
      alert("Tienes que colocar las 2 fechas primero antes de aplicar los filtros");
    }
  }
  const handlerPrice=(e)=>{
    if(availabilityFrom && availabilityTo){
      setPrice(e.target.value) 
    }else{
      alert("Tienes que colocar las 2 fechas primero para aplicar los filtros")
    }
    
  }
  const handlerSize=(e)=>{
    if(availabilityFrom && availabilityTo){
      setSize(e.target.value) 
    }else{
      alert("Tienes que colocar las 2 fechas primero antes de aplicar los filtros")
      
    }
  }
  // const handlerReset=(e)=>{
  //   setAvailabilityFrom(0)
  //   setAvailabilityTo(0)
  //   setCountry("Cualquier pais")
  //   setPrice("Cualquier precio")
  //   setSize("Cualquier Tamaño")
  //   e.target.className="disabled";
  // }
  let hotelFilter;
  if(availabilityFrom && availabilityTo) {
      hotelFilter=hotelsData.filter(hotel=>{
        let conditionDate;
        let conditionCountry;
        let conditionPrice;
        let conditionSize;
        let dateFrom=new Date(availabilityFrom).getTime();//convierto a tiempo UNIX la fecha de entrada
        let dateTo=new Date(availabilityTo).getTime();//convierto a tiempo UNIX la fecha de salida
        let dateHotelFrom=new Date(hotel.availabilityFrom);
        let dateHotelTo=new Date(hotel.availabilityTo);
        dateHotelFrom=new Date(dateHotelFrom.getFullYear()+"-"+(dateHotelFrom.getMonth()+1)+"-"+(dateHotelFrom.getDate()-1)).getTime();
        dateHotelTo=new Date(dateHotelTo.getFullYear()+"-"+(dateHotelTo.getMonth()+1)+"-"+(dateHotelTo.getDate())).getTime();
        (dateFrom>=dateHotelFrom && dateFrom<dateHotelTo)&&(dateTo>dateHotelFrom && dateTo<=dateHotelTo) ? conditionDate=true: conditionDate=false;
        country==="Cualquier pais" ? conditionCountry=true : conditionCountry=(hotel.country===country);
        price==="Cualquier precio" ? conditionPrice=true : conditionPrice=(hotel.price==price);
        if (size=="Cualquier tamaño") {
          conditionSize=true;
        }else if(size==="Hotel pequeño"){
          console.log("pequeño")
          conditionSize=(hotel.rooms<=10 );
        }else if(size==="Hotel mediano"){
          console.log("mediano")
          conditionSize=(hotel.rooms<=20 && hotel.rooms>10)
        }else if(size==="Hotel grande"){
          console.log("grande")
          conditionSize=(hotel.rooms>20)
        }
        
        return(conditionDate && conditionCountry&& conditionPrice && conditionSize);
      }
    )
  }else{
    hotelFilter=hotelsData;
  } 
  return (
    <div className="App">
      <Header dateFrom={availabilityFrom} dateTo={availabilityTo} country={country} price={price} size={size}/>
      <Filters 
        stateFrom={[availabilityFrom,handlerDateFrom ]} 
        stateTo={[availabilityTo,handlerDateTo ]}
        stateCountry={[country,handlerCountry ]}
        statePrice={[price,handlerPrice ]}
        stateSize={[size,handlerSize ]}
        
      />
      <div className="Hotels">
        {
          hotelFilter.length>0 ? hotelFilter.map((hotel, index) => {
            return (
              <Hotels
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
          }) : (
              <p>No se encontraron resultados</p>
          )
        }
      </div>
    </div>
  );
}

export default App;
