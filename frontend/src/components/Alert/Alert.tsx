const Alert = ({alert} : {alert:any}) => {
    return(
        <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-orange-400 to-orange-600'} 
        bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>

            { alert.message }
            
        </div>
    );
}

export default Alert;