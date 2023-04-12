
export default function Die(props){
    return (
        <div className={props.isHeld ? "held-die" : "unheld-die"} 
        onClick={props.onClick} >
            <h1>{props.value}</h1>
        </div>
    );
}