"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json());
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
global.mongodata = [];
global.Domainname = "";
global.CCfilename = "";
global.Description = "";
global.chaincodebody1 = "";
global.chaincodebody2 = "";
global.chaincodebody3 = "";
global.chaincodebody4 = "";
global.chaincodebody5 = "";
const fs = require("fs");
const fs1 = require("fs-extra");
const axios = require("axios");

const {
  promises: { readdir },
} = require("fs");

const cors = require("cors");
const fsmove = require("fs-extra");
const fspromises = require("fs").promises;
const AdmZip = require("adm-zip");
app.use(cors());

app.post("/test", async function (req, res, next) {
  try {
    console.log("hello from test");
    var datas =[];
    datas= req.body._id;
    console.log("datas::", datas);
    let res = await axios.get(`http://10.244.3.187:9000/api/v1/getRestApi/${datas}`);
    restApiData = res.data;
    console.log("RestApi Data::", restApiData);
    Domainname = "Server";
    CCfilename = Domainname + ".js";
    
   

    PostCode = restApiData.PostCode;
    GetCode = restApiData.GetCode;
    DeleteCode = restApiData.DeleteCode;
    PutCode = restApiData.PutCode;
    PatchCode = restApiData.PatchCode;

    const fileOpsc = async () => {
      console.log("Filename", CCfilename);
      if (fs.existsSync(path.join(__dirname, "Server", Domainname))) {
        console.log("Directory exists!");
        await del(path.join(__dirname, "Server", Domainname));
        console.log("Previously Working Folder Deleted Successfully");
        await del(path.join(__dirname, "zipcontents", Domainname + ".zip"));
        console.log("Dpmain Folder Deleted from zip contents Successfully");
      } else {
        console.log("Directory not found.");
      }

      await fs.mkdir(
        path.join(__dirname, "Server", Domainname),
        { recursive: true },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Domainname, " Directory created successfully !!");
          }

          const chaincodeheader = `
          const express = require("express");
          const bodyParser = require("body-parser");
          const dbConnect = require("./config/dbConnect");
          const cors = require("cors");
          const app = express();
          const dotenv = require("dotenv").config();
          const PORT = process.env.PORT || 6000;
          const DB = require("./config/dbConnect");
          const UserRoutes = require("./routes/userRoutes");
          // const LoginRouts = require('./routes/userRoutes')
          const { notFound, errorHandler } = require("./middleware/errorHandler");
          // const { urlencoded } = require('body-parser');
          dbConnect();
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: false }));
          
          app.use(
            cors({
              origin: "*",
            })
          ); `;

          const chaincodefooter = `
          app.listen(PORT, "10.244.3.187");
          console.log('Server listening on ${PORT}'); `;
          fspromises.appendFile(
            path.join(__dirname, "Server", Domainname, CCfilename),
            chaincodeheader
          );
          console.log("Chaincode Header Inegrated Successfully");

          for (let i = 0; i < datas.length; i++) {
            foo(i);
          }

          async function foo(i) {
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:9000/api/v1/getRestApi/${datas[i]}`
            );
            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody1 = ccbodyrequest.data.PostCode;
            chaincodebody2 = ccbodyrequest.data.GetCode;
            chaincodebody3 = ccbodyrequest.data.DeleteCode;
            chaincodebody4 = ccbodyrequest.data.PutCode;
            chaincodebody5 = ccbodyrequest.data.PatchCode;

            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              chaincodebody1,
              chaincodebody2,
              chaincodebody3,
              chaincodebody4,
              chaincodebody5
            );

            console.log("Chaincode Body Inegrated Successfully");
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              "\n"
            );

            // const body = await fspromises.readFile(path.join(__dirname,'poe',filename+'.js'),'utf8');

            console.log("Body That is To Be Integrated1", chaincodebody1);
            console.log("Body That is To Be Integrated2", chaincodebody2);
            console.log("Body That is To Be Integrated3", chaincodebody3);
            console.log("Body That is To Be Integrated4", chaincodebody4);
            console.log("Body That is To Be Integrated5", chaincodebody5);

            // }
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              await fspromises.appendFile(
                path.join(__dirname, "Server", Domainname, CCfilename),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              fsmove.move(
                path.join(__dirname, "Server", Domainname, CCfilename),
                path.join(__dirname, "Server", Domainname, CCfilename),
                (err) => {
                  console.log(`File successfully moved!!`);
                  // PDCA File //

                  if (err) return console.log(err);
                  foo1();
                  //  newZip(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",Domainname));
                }
              );
              async function foo1() {
                const zip = new AdmZip();
                console.log("jjjjrjrj");

                // try{
                console.log("i am in false part");
                console.log("Entered to else part of aSSET LOGIC");
                await zip.addLocalFolder(path.join(__dirname, "Server"));
                const downloadName = `${Domainname}.zip`;
                await zip.writeZip(
                  path.join(__dirname, "/zipcontents", downloadName)
                );
              }
            }
          }

          // console.log('Chaincode Body Inegrated Successfully');
        }
      );
    };
    fileOpsc();
    res.status(200).json("Transaction Send Successful");
  } catch (err) {}
});
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;
app.use(function (req, res, next) {
  requests.push(Date.now());

  // now keep requests array from growing forever
  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize);
  }
  next();
});

////////////---------------Asset Owner Zip Download Ends Here--------------////////////////
app.get("/Downloads", async function (req, res) {
  let domainFile = Domainname + ".zip";
  console.log("domainFile::", domainFile);
  await res.download(path.join(__dirname, "zipcontents", domainFile));
});

app.listen(9001, "10.244.3.187");
console.log("Chaincode Generation Running on http://10.244.3.187:9001");
