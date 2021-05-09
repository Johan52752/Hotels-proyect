import './css/hotels.css'
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Hotels(props){
    return(
        <div className="card">
            <img src={props.photo} alt="img-hotel"/>
            <div className="details">
                <h2>{props.name}</h2>
                <p className="description">{props.description}</p>
                <div className="options">
                    <div className="options-location">
                        <FontAwesomeIcon icon={faMapMarked}/>
                        <p>{props.city}, {props.country}</p>
                    </div>
                    <div className="options-secondary">
                        <div className="options-rooms">
                            <FontAwesomeIcon icon={faBed}/>
                            <p>{props.rooms +" Habitaciones"}</p>
                        </div>
                        <div className="options-price">
                            <Price price={props.price}/>
                        </div>
                    </div>
                </div>
            </div>
            <button>Reservar</button>
        </div>
    )

}
function Price(props){
    let arr=[]
    for(let i=0;i<4;i++){
        if(i<props.price){
            arr[i]=<i key={i}className="svg-price"><FontAwesomeIcon icon={faDollarSign}/></i>
        }else{
            arr[i]=<i key={i} className="svg-no-price"><FontAwesomeIcon icon={faDollarSign}/></i>
        }
    }
    return(
        <div>
            {arr}
        </div>
    )

}