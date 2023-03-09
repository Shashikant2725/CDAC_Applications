"use strict";
var fs = require("fs");
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
global.CCfilename = "";
app.use(bodyParser.json());
const path = require("path");
const axios = require("axios");
const cors = require("cors");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const fspromises = require("fs").promises;
const AdmZip = require("adm-zip");
app.use(cors());
global.Domainname = "";
global.CCfilename = "";
global.Description = "";
global.chaincodebody1 = "";
global.chaincodebody2 = "";
global.chaincodebody3 = "";
global.chaincodebody4 = "";
global.chaincodebody5 = "";
const del = require("del");

app.post("/test", async (req, res) => {
  try {
    var datas = [];
    datas.push(req.body.id);
    console.log("Datas::", datas);
    let response = await axios.get(
      `http://10.244.3.187:9000/api/v1/getRestApi/${datas[0]}`
    );
    let restApiData = response.data;
    console.log("RestApi Data::", restApiData);
    let PostCode = response.data.PostCode.toString();
    console.log("PostCode::", PostCode);
    Domainname = "Server";
    CCfilename = Domainname + ".js";

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
        console.log('Server listening on 10.244.3.187'); `;
          fspromises.appendFile(
            path.join(__dirname, "Server", Domainname, CCfilename),
            chaincodeheader
          );
          console.log("Chaincode Header Inegrated Successfully");
          for (let i = 0; i < datas.length; i++) {
            foo(i);
          }
          console.log("datas[i]::", datas);

          async function foo(i) {
            console.log("i am inside foo");
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:9000/api/v1/getRestApi/${datas[i]}`
            );
            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody1 = JSON.stringify(
              ccbodyrequest.data.PostCode[i].LogicBody.toString()
            );
            chaincodebody2 = JSON.stringify(
              ccbodyrequest.data.GetCode[i].LogicBody.toString()
            );
            chaincodebody3 = JSON.stringify(
              ccbodyrequest.data.DeleteCode[i].LogicBody.toString()
            );
            chaincodebody4 = JSON.stringify(
              ccbodyrequest.data.PutCode[i].LogicBody.toString()
            );
            chaincodebody5 = JSON.stringify(
              ccbodyrequest.data.PatchCode[i].LogicBody.toString()
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              chaincodebody1
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              "\n"
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              chaincodebody2
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              "\n"
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              chaincodebody3
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              "\n"
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              chaincodebody4
            );
            await fspromises.appendFile(
              path.join(__dirname, "Server", Domainname, CCfilename),
              "\n"
            );
            console.log("Body That is To Be Integrated1", chaincodebody1);
            console.log("Body That is To Be Integrated2", chaincodebody2);
            console.log("Body That is To Be Integrated3", chaincodebody3);
            console.log("Body That is To Be Integrated4", chaincodebody4);
            console.log("Body That is To Be Integrated5", chaincodebody5);
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              await fspromises.appendFile(
                path.join(__dirname, "Server", Domainname, CCfilename),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              const zip = new AdmZip();
              await zip.addLocalFolder(path.join(__dirname, "Server"));
              const downloadName = `${Domainname}.zip`;
              await zip.writeZip(
                path.join(__dirname, "/zipcontents", downloadName)
              );
              console.log("Folder Written Successfully in Zip");
            }
          }
        }
      );
    };
    fileOpsc();
    res.status(200).json("File Created Successfully");
  } catch (err) {
    console.log(err);
  }
});
app.get("/Downloads", async function (req, res) {
  let domainFile = Domainname + ".zip";
  console.log("domainFile::", domainFile);
  await res.download(path.join(__dirname, "zipcontents", domainFile));
});
app.listen(9001, "10.244.3.187");
console.log("Chaincode Generation Running on http://10.244.3.187:9001");
// appendFile function with filename, content and callback function
