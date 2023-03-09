import HeaderSelector from "../components/Header.js";
import { useLocation } from "react-router-dom";
import { URL } from '../config';
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";


const styles = {
    heading: {
        fontWeight: "bold",
        fontSize: '20px',
        padding: '10px',
        marginLeft: '15px'

    },

    content: {
        fontSize: '15px',
        marginLeft: '20px'
    }


}

let decodedData;



const SSOResponse = () => {

    const dispatch = useDispatch();

    let count = 1;
    const navigate = useNavigate();
    const search = useLocation().search;
    const authCode = new URLSearchParams(search).get('code');
    const stateId = new URLSearchParams(search).get('state');
    console.log("in AnyPage api at fe");
    console.log("authCode => " + authCode);
    console.log("stateId => " + stateId);
    const nonce = localStorage.getItem('nonceValue')
    const codeVerifier = localStorage.getItem('codeVerifier')
    const clientId = localStorage.getItem('clientId')


    const body = {
        authCode,
        stateId,
        nonce,
        codeVerifier,
        clientId
    }

    const jwtAPI = async () => {
        const url = `${URL}/dept/sso/JWT`;
        console.log("log");

        const response = await axios.post(url, body).catch(err=>{console.log("ettt",err);});
        console.log("err",response);
        decodedData = await response.data;
        const userData=decodedData.result
        
        console.log(userData);
        if (decodedData.exists) {
            if (decodedData.status) {
              
                localStorage.setItem("token", userData.token)
                localStorage.setItem("email", userData.email)
                dispatch({
                    type: "login-api-success",
                    payload: userData.token,
                  })
                  if (userData.role === "deptreg") {
                    navigate("/departmentDashboard")
                  }else if(userData.role === "appAdmin"){
                    // navigate("/eapp")
                    navigate("/eapp")

                }
                 
            } else {

                console.log("user not enabled",decodedData.result);
                navigate("/")

            }
        } else {
            localStorage.setItem('userData', JSON.stringify(decodedData.result));
            navigate('/registrationFrom', decodedData.result);
        }
        // console.log(decodedData.name);

        // localStorage.setItem('decodedData', JSON.stringify(decodedData));
        // localStorage.setItem('userData', JSON.stringify(decodedData.decode));
        // localStorage.setItem('firstName', decodedData.name);
        // let userdata=decodedData.decode

        // if (localStorage.getItem("path")=="/login"){
        //     // if(!userdata.email){     
        //     // }
        //     // const logurl = `http://10.244.0.140:5003/dept/sso/login`;
        //     // const response = await axios.post(logurl, {mobile_number:userdata.mobile_number});

        //     // localStorage.setItem("token", response.data)
        //     navigate('/departmentDashboard');
        // }else
        // navigate('/registrationFrom',userdata);




    };


    console.log('count value = ' + count)

    useEffect(() => {
        const Redirect = () => {
            localStorage.setItem('loginStatus', '1');
        };
        Redirect();
    }, []);

    useEffect(() => {
        jwtAPI();
    }, [])

    return (


        <div>
            <HeaderSelector />


            <div style={{ backgroundColor: '#E5E4E2' }} >
                <br />
                <h1
                    style={{ textAlign: "center", fontWeight: 'bolder' }}>
                    Login Successful
                </h1>
                <div>
                    Data : {decodedData}</div>

            </div>
        </div>


    );
}

export default SSOResponse