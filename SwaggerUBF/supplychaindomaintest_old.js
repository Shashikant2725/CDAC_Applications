////////////////---------------Make Equipment Function starts here--------////////////

exports.makeEquipment= async(req,res)=>{
    try {
    

       
        let Manufacturer=req.headers.manufacturer;
        let EquipmentNumber=req.headers.equipmentnumber;
        let EquipmentName=req.headers.equipmentname;
        let OwnerName=req.headers.ownername;
        var dateTime=new Date().toLocaleString().replace(',','');
        var Result = {};
        Result.Manufacturer= Manufacturer
        Result.EquipmentNumber = EquipmentNumber
        Result.EquipmentName = EquipmentName
        Result.OwnerName = OwnerName

        Result.previousOwnerType= 'MANUFACTURER',
        Result.currentOwnerType ='MANUFACTURER',
        Result.createDateTime= dateTime,
        Result.lastUpdated= dateTime
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}

/////////////////---------------Make Equipment Function Ends here---------------////////////


/////////////////--------------wholesaler Distribute Function Starts here--------------////////////////

exports.wholesalerDistribute= async(req,res)=>{
    try {
  
       
       
        let EquipmentNumber=req.headers.equipmentnumber;
        let OwnerName=req.headers.ownername;
        var dateTime=new Date().toLocaleString().replace(',','');
    
        var Result = {};
        Result.Equipment_Number = EquipmentNumber;
        Result.Owner_Name = OwnerName;
        Result.Manufacturer= 'Dr.Reddys';
        Result.EquipmentName = 'Ventilator';
        Result.previousOwnerType= 'MANUFACTURER';
        Result.currentOwnerType ='WHOLESALER';
        Result.lastUpdated= dateTime;
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}
/////////////////--------------wholesaler Distribute Function Ends here--------------////////////////


/////////////////--------------pharmacyReceived Function Starts here--------------////////////////

exports.pharmacyReceived= async(req,res)=>{
    try {
        let EquipmentNumber=req.headers.equipmentnumber;
        let OwnerName=req.headers.ownername;
        var dateTime=new Date().toLocaleString().replace(',','');
    
        var Result = {};
        Result.Equipment_Number = EquipmentNumber;
        Result.Owner_Name = OwnerName;
        Result.Manufacturer= 'Dr.Reddys';
        Result.EquipmentName = 'Ventilator';
        Result.previousOwnerType= 'WHOLESALER';
        Result.currentOwnerType ='PHARMACY';
        Result.lastUpdated= dateTime;
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}

/////////////////--------------pharmacyReceived Function Ends here--------------////////////////

exports.createUser= async(req,res)=>{
    try {
        let UserID=req.headers.userid;
        let Name=req.headers.name;
        let Email=req.headers.email;
        let UserType=req.headers.usertype;
         let Address=req.headers.address;
        let Password=req.headers.password;
        var dateTime=new Date().toLocaleString().replace(',','');
        var Result = {};
        Result.User_Id = UserID;
        Result.Name = Name;
      
        Result.Email = Email;
      
        Result.UserType = UserType;
      
        Result.Address = Address;
      
        Result.Password = Password;
        Result.dateTime= dateTime;
      
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}


///////////////////--------------Create Product Function Starts here-----------------//////////////////

exports.createProduct= async(req,res)=>{
    try {
        let ProductID=req.headers.productid;
        let Name=req.headers.name;
        let ManufacturerID=req.headers.manufacturerid;
        let Price =req.headers.price;
         let Status=req.headers.status;
        var dateTime=new Date().toLocaleString().replace(',','');
        var Result = {};
        Result.ProductID = ProductID;
        Result.Name = Name;
        Result.ManufacturerID = ManufacturerID;
        Result.Price = Price;
        Result.Status = Status;
        Result.ManufactureDate = dateTime;
        Result.OrderID = '';
        Result.ConsumerID = '';
        Result.DistributerID = '';
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}

/////////////////-------------------Create Product Function ends here---------------//////////////////

////////////////-------------------Order Product Function starts here---------------////////////////////////////

exports.orderProduct=async(req,res)=>{
    try {
        let ProductID=req.headers.orderid;
        let ConsumerID=req.headers.consumerid;
        var dateTime=new Date().toLocaleString().replace(',','');
        var Result = {};
        Result.ProductID = ProductID;
        Result.ConsumerID = ConsumerID;
        Result.Name = 'Circuit';
        Result.ManufacturerID = 'cdac';
        Result.Price = '1000';
        Result.Status = "Ordered";
        Result.OrderedDate = dateTime;
      
      
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}
 
/////////////////------------------Order Product Function ends here------------/////////////////


////////////////-------------------sendToDistributer Function starts here---------------////////////////////////////

exports.sendToDistributer=async(req,res)=>{
    try {
        let ProductID=req.headers.productid;
        let DistributerID=req.headers.distributorid;
        var dateTime=new Date().toLocaleString().replace(',','');
        var Result = {};
        Result.ProductID = ProductID;
        Result.DistributerID = DistributerID;
        Result.SendToDistributorDate = dateTime;
        Result.Name = 'Circuit';
        Result.ManufacturerID = 'cdac';
        Result.Price = '1000';
        Result.ConsumerID = 'NIC';
        Result.Status = "Shipped";
      
      
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}
/////////////////------------------sendToDistributer Function ends here------------/////////////////

////////////////-------------------sellToConsumer Function starts here---------------////////////////////////////

exports.sellToConsumer=async(req,res)=>{
    try {
        let Product_ID=req.headers.productid;
        var dateTime=new Date().toLocaleString().replace(',','');
        var Result = {};
        Result.ProductID = Product_ID;
        Result.SellToConsumerDate = dateTime;
        Result.Name = 'Circuit';
        Result.ManufacturerID = 'cdac';
        Result.Price = '1000';
        Result.ConsumerID = 'NIC';
        Result.DistributerID = 'Delivery';
        Result.Status = "Delivered";
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}
 
/////////////////------------------sellToConsumer Function ends here------------/////////////////

exports.createDrug=async(req,res)=>{
    try {
        let Name=req.headers.name;
        let Type=req.headers.type;
        let Amount=req.headers.amount;
        let Chemname=req.headers.chemname;
        let Nature=req.headers.nature;
        let Supplier=req.headers.supplier;
        let Ulabel=req.headers.ulabel;
        let Sides=req.headers.sides;
        let Storage=req.headers.storage;

        var Result = {};

        Result.NAme = Name;
        Result.TYpe = Type;
        Result.AMount = Amount;
        Result.CHemname = Chemname;
        Result.NAture = Nature;
        Result.SUpplier = Supplier;
        Result.ULabel = Ulabel;
        Result.SIdes = Sides;
        Result.STorage = Storage;
       
        Result.GovtValid = "Yes";
      
      
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.createCust=async(req,res)=>{
    try {
        let Fname=req.headers.fname;
        let Lname=req.headers.lname;
        let Age=req.headers.age;
        let Email=req.headers.email;
        let Address=req.headers.address;
        let Condition=req.headers.condition;
        let DoctorApproval=req.headers.doctorapproval;
        let DrugId=req.headers.drugid;
       

        var Result = {};

        Result.F_name = Fname;
        Result.L_name = Lname;
        Result.AGe = Age;
        Result.E_mail = Email;
        Result.ADDress = Address;
        Result.COndition = Condition;
        Result.DOCtorApproval = DoctorApproval;
        Result.Drud_id = DrugId;
        
      
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}


exports.verifyUpdateDrugByGovt=async(req,res)=>{
    try {
        let DrugId=req.headers.drugid;
        let Status=req.headers.status;
      

        var Result = {};

        Result.Drug_ID = DrugId;
        Result.STatus = Status;
        Result.Fname='Martin';
        Result.Lname='Luther';
        Result.Age='46';
        Result.Email='john@gmail.com';
        Result.Address='Hyderabad';
        Result.Condition='Yes';
        Result.DrugId='12345';
      
      
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.approveCust=async(req,res)=>{
    try {
        let CustomerID=req.headers.customerid;
        let DoctorApproval=req.headers.status;

        var Result = {};

        Result.CUstomerID = CustomerID;
        Result.DoctorApproval = DoctorApproval;
        Result.Fname='Martin';
        Result.Lname='Luther';
        Result.Age='46';
        Result.Email='john@gmail.com';
        Result.Address='Hyderabad';
        Result.Condition='Yes';
        Result.DrugId='12345';
      
      
      
        res.send(Result)
        }
    catch (error) {
        res.status(500).json(error);
    }
}