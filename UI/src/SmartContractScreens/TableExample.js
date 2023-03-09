
// import axios from "axios";
// import React, { useState,useEffect,useRef} from "react";


// const publicMandatoryfields = [];
// const privateMandatoryfields = [];
// const publicCommonDatafields = [];
// const privateCommonDatafields = [];


// export default function TableExample() {

//   const [publicMandatoryCount,setpublicMandatoryCount] = useState([]);
//   const [privateMandatoryCount,setprivateMandatoryCount] = useState([]);
//   const [publicCommonDataCount,setpublicCommonDataCount] = useState([]);
//   const [privateCommonDataCount,setprivateCommonDataCount] = useState([]);


  

//     const getData = async() =>
//     {
//       const id="63ee0c6ae7f3e07f46d63274"
//         const result=await axios.get('http://10.244.3.187:4000/api/v1/allAssetFields/'+id)
//         console.log("Result::",result.data.Result);
//         setpublicMandatoryCount(result.data.publicMandatoryCount);
//         setprivateMandatoryCount(result.data.privateMandatoryCount);
//         setpublicCommonDataCount(result.data.publicCommonDataCount);
//         setprivateCommonDataCount(result.data.privateCommonDataCount);

//         console.log("Countssss:",typeof(publicMandatoryCount));
//         console.log("Countssss1:",typeof(privateMandatoryCount));
//     }      

    
//     useEffect(() => {
//        getData();
       
//     },[open])

//  for (let i = 1; i <= publicMandatoryCount; i++) {
//   publicMandatoryfields.push("Enter public Mandatory Data: ");
//  }
//  for (let i = 1; i <= privateMandatoryCount; i++) {
//   privateMandatoryfields.push("Enter private Mandatory Data: ");
// }
// for (let i = 1; i <= publicCommonDataCount; i++) {
//   publicCommonDatafields.push("Enter public Mutable Data: ");
//  }
//  for (let i = 1; i <= privateCommonDataCount; i++) {
//   privateCommonDatafields.push("Enter private Mutable Data: ");
// }
//   return (
//     <div className="App">
//       <br/>
//       {publicMandatoryfields.map((str) => {
//         return(
//           <>
//            {/* <br/>
//             <span>{str}</span>
//             <input/>
//             <br/> */}

//           </>
//         )
//       })}

//         {privateMandatoryfields.map((str) => {
//                 return(
//                   <>
//                    <br/>
//                     <span>{str}</span>
//                     <input/>
//                     <br/>
//                   </>
//                 )
//               })}
//                {publicCommonDatafields.map((str) => {
//                 return(
//                   <>
//                    <br/>
//                     <span>{str}</span>
//                     <input/>
//                     <br/>
//                   </>
//                 )
//               })}
//                {privateCommonDatafields.map((str) => {
//                 return(
//                   <>
//                    <br/>
//                     <span>{str}</span>
//                     <input/>
//                     <br/>
//                   </>
//                 )
//               })}
//     </div>
//   );
// }
