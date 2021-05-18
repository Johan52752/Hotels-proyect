import './css/Header.css'

export function Header(props){
    let month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let fechaInitial=new Date(props.dateFrom);
    fechaInitial=(fechaInitial.getDate()+1)+" de "+(month[fechaInitial.getMonth()])+" del " + fechaInitial.getFullYear();
    let fechaSecondary=new Date(props.dateTo);
    fechaSecondary=(fechaSecondary.getDate()+1)+" de "+(month[fechaSecondary.getMonth()])+" del " + fechaSecondary.getFullYear();
    let country;
    if (props.country!=="Cualquier pais") {
        country=", en "+props.country;
    }else{
        country="";
    }
    let size;
    if (props.size!=="Cualquier tamaño") {
        if (props.size==="Hotel pequeño") {
            size="pequeños"
        }else if(props.size==="Hotel mediano"){
            size="medianos"
        }else {
            size="grandes"
        }
    }else{
        size="";
    }
    let price;
    if (props.price!=="Cualquier precio") {
        if (props.price==="1") {
            price="con precio economico"
        }else if(props.price==="2" || props.price==="3"){
            price="con precio intermedio"
        }else {
            price="con precio alto"
        }
    }else{
        price=""
    }
    
    return(
        <div className="Header">
            <h1>Hoteles</h1>
            <p>{
            props.dateFrom && props.dateTo ?  `Busqueda de hoteles ${size} ${price} desde el ${fechaInitial} hasta el ${fechaSecondary}${country}`: ("Busqueda de todos los hoteles")
            
            }</p>
            
        </div>
    )
}