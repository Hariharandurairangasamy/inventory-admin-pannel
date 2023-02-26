import React, { useState, useCallback,useEffect } from "react";
import SERVER from "../Config";
import axios from "axios"

 const usePostQuery = (url:string,data:any)=>{
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    console.log("url",url)

    // const handlePostData = useCallback(()=>{
    //     axios
    //         .post(`${SERVER?.BACKEND_HOST_URL}/${url}`,data)
    //         .then((res) => {
    //             setResponseData(res.data);
    //         })
    //         .catch((err) => {
    //             setError(err);
    //         })
    //         .finally(() => {
    //             setloading(false);
    //         });
    // },[])
    // useEffect(() => {
    //     handlePostData();
    // }, []);

    // // custom hook returns value
    // return { responseData, error, loading };

}
export default usePostQuery