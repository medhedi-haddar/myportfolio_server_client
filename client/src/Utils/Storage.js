
const getFromStorage = (key) => {
    if(!key){
        return null;
    }
    else{
        try{
            const session = localStorage.getItem(key);
            if( session){
                return JSON.parse(session);
            }
        }
        catch(error){
            return {" Storage error ": error.message}
        }
    }
    return null;
}

const setInStorage = (key,obj)=>{
    if(!key){
        console.error("key is missing")
    }
    try {
        localStorage.setItem(key,JSON.stringify(obj));
    } catch (error) {
        console.error(error.message)
    }
}

export {
    getFromStorage,
    setInStorage
}
