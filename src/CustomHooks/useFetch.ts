import react,{useState,useEffect,useCallback} from "react"
import SERVER from "../Config";
import axios from "axios"

const useFetchHooks=(getApiEndPoint:any)=>{
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const handleGetFetchData = useCallback(()=>{
        axios
            .get(`${SERVER?.BACKEND_HOST_URL}/${getApiEndPoint}`)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    },[])
    useEffect(() => {
        handleGetFetchData();
    }, []);

    // custom hook returns value
    return { response, error, loading };

}

export default useFetchHooks