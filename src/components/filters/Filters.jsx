import './Filters.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
export function Filters(props){
    
    return (
        <div className="Filter">
            <div className="Filters">
                <div className="input">
                    <FontAwesomeIcon icon={faSignInAlt}/>
                    <input className="availabilityFrom" onChange={props.stateFrom[1]} value={props.stateFrom[0]}type="date"/>
                </div>
                <div className="input">
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                    <input className="availabilityTo" onChange={props.stateTo[1]} value={props.stateTo[0]} type="date"/>
                </div>
                <div className="select">
                    <FontAwesomeIcon icon={faGlobe}/>
                    <select onChange={props.stateCountry[1]} value={props.stateCountry[0]} className="country" name="paises" id="">
                        <option value="Cualquier pais">Todos los paises</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Chile">Chile</option>
                        <option value="Uruguay">Uruguay</option>
                    </select>
                </div>
                <div className="select">
                    <FontAwesomeIcon icon={faDollarSign}/>
                    <select onChange={props.statePrice[1]} value={props.statePrice[0]} className="price" name="precio" id="">
                        <option value="Cualquier precio">Cualquier precio</option>
                        <option value={1}>$</option>
                        <option value={2}>$$</option>
                        <option value={3}>$$$</option>
                        <option value={4}>$$$$</option>
                    </select>
                </div>
                <div className="select">
                    <FontAwesomeIcon icon={faBed}/>
                    <select onChange={props.stateSize[1]} value={props.stateSize[0]} className="rooms" name="tamaño" id="">
                        <option value="Cualquier tamaño">Cualquier tamaño</option>
                        <option value="Hotel pequeño">Hotel pequeño</option>
                        <option value="Hotel mediano">Hotel mediano</option>
                        <option value="Hotel grande">Hotel grande</option>
                    </select>
                </div>
                <button
                    className={`button ${props.stateFrom[0]&&props.stateTo[0]?"":"disabled"}`}
                    onClick={props.handlerReset}>
                    Resetear filtros
                </button>
            </div>
        </div>
    )
}