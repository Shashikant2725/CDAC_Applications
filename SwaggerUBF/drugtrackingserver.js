
////////////////---------------Create Drug Function starts here--------////////////

exports.CreateDrug= async(req,res)=>{
    try {

        var DrugDetails = {}; 
        DrugDetails[ 'Drug Id' ] = req.headers.drugid       
        DrugDetails[ 'Drug Name'] =req.headers.drugname;
        DrugDetails[ 'Drug Type'] =req.headers.drugtype;
        DrugDetails[ 'Amount'] =req.headers.amount;
        DrugDetails[ 'Chemical Name'] =req.headers.chemicalname;
        DrugDetails[ 'Nature'] =req.headers.nature;
        DrugDetails[ 'Supplier'] =req.headers.supplier;
        DrugDetails[ 'Unique Label'] =req.headers.uniquelabel;
        DrugDetails[ 'Side Effect'] =req.headers.sideeffect;
        DrugDetails[ 'Storage'] =req.headers.storage;



        console.log(DrugDetails);
        res.status(200).json({message : "Drug created Successfully",DrugDetails})
        
    } catch (error) {
        res.status(500).json(error);
    }
}

/////////////////---------------Create Drug Function ends here---------------////////////


/////////////////--------------Query Drug By Name Function Starts here--------------////////////////

exports.QueryDrugByName= async(req,res)=>{
   try{

    if(req.headers.drugname == 'Advil'){
        var DrugDetails = {}; 
    DrugDetails[ 'Drug Id' ] = 'L461'      
    DrugDetails[ 'Drug Name'] ='Advil';
    DrugDetails[ 'Drug Type'] ='NSAIDs';
    DrugDetails[ 'Amount'] ='50';
    DrugDetails[ 'Chemical Name'] ='(RS)-2-(4-(2-methylpropyl)phenyl)propanoic acid';
    DrugDetails[ 'Nature'] ='pain, fever, and inflammation';
    DrugDetails[ 'Supplier'] ='Dr.Reddy';
    DrugDetails[ 'Unique Label'] ='Advil®';
    DrugDetails[ 'Side Effect'] ='Upset stomach, nausea, vomiting, headache, diarrhea, constipation, dizziness, or drowsiness ';
    DrugDetails[ 'Storage'] ='avoid excessive heat (above 104°F), excessive humidity, and to store at controlled room temperature (between 68°F and 77°F)';

    console.log(DrugDetails);
    res.status(200).json({DrugDetails})
    }
    else {
        res.status(200).json({message : "Drug not found"})

    }
    
   }
    
 catch(error) {
    res.status(500).json(error);
        }  
}
/////////////////--------------Query Drug by Name Ends here--------------////////////////


/////////////////---------------ChangeDrugDetailsById Function ends here---------------////////////


////////////////---------------Create Drug Function starts here--------////////////

exports.CreateDrugTestingReportByDrugName= async(req,res)=>{
    try {

        if(req.headers.drugname == 'Advil'){
            var DrugDetails = {}; 
        DrugDetails[ 'Drug Id' ] = req.headers.drugid       
        DrugDetails[ 'Drug Name'] =req.headers.drugname;
        DrugDetails[ 'Drug Type'] =req.headers.drugtype;
        DrugDetails[ 'Amount'] =req.headers.amount;
        DrugDetails[ 'Chemical Name'] =req.headers.chemicalname;
        DrugDetails[ 'Nature'] =req.headers.nature;
        DrugDetails[ 'Supplier'] =req.headers.supplier;
        DrugDetails[ 'Unique Label'] =req.headers.uniquelabel;
        DrugDetails[ 'Side Effect'] =req.headers.sideeffect;
        DrugDetails[ 'Storage'] =req.headers.storage;
        DrugDetails[ 'Approval Status'] = req.headers.approvalstatus



        console.log(DrugDetails);
        res.status(200).json({message : `FDA Status for Drug ${req.headers.drugname} Created Successfully`,DrugDetails})
        }

        else {
            res.status(200).json({message : "Drug Doesn't Exist Hence FDA Approval Creation Failed"})

        }
        
        
    } catch (error) {
        res.status(500).json(error);
    }
}

/////////////////---------------Create Drug Function ends here---------------////////////



/////////////////--------------Query Drug By Name Function Starts here--------------////////////////

exports.QueryDrugTestingReportByName= async(req,res)=>{
   try{

    if(req.headers.drugname == 'Advil'){
        var DrugDetails = {}; 
    DrugDetails[ 'Drug Id' ] = 'L461'      
    DrugDetails[ 'Drug Name'] ='Advil';
    DrugDetails[ 'Drug Type'] ='NSAIDs';
    DrugDetails[ 'Amount'] ='50';
    DrugDetails[ 'Chemical Name'] ='(RS)-2-(4-(2-methylpropyl)phenyl)propanoic acid';
    DrugDetails[ 'Nature'] ='pain, fever, and inflammation';
    DrugDetails[ 'Supplier'] ='Dr.Reddy';
    DrugDetails[ 'Unique Label'] ='Advil®';
    DrugDetails[ 'Side Effect'] ='Upset stomach, nausea, vomiting, headache, diarrhea, constipation, dizziness, or drowsiness ';
    DrugDetails[ 'Storage'] ='avoid excessive heat (above 104°F), excessive humidity, and to store at controlled room temperature (between 68°F and 77°F)';
    DrugDetails[ 'Approval Status'] ='Approved';

    console.log(DrugDetails);
    res.status(200).json({DrugDetails})
    }
    else {
        res.status(200).json({message : "Drug not found"})

    }
    
   }
    
 catch(error) {
    res.status(500).json(error);
        }  
}
/////////////////--------------Query Drug by Name Ends here--------------////////////////


////////////////---------------Create Drug Function starts here--------////////////

exports.CreateGovernmentApprovalByDrugName= async(req,res)=>{
    try {

        if(req.headers.drugname == 'Advil'){
            var DrugDetails = {}; 
        DrugDetails[ 'Drug Id' ] = req.headers.drugid       
        DrugDetails[ 'Drug Name'] =req.headers.drugname;
        DrugDetails[ 'Drug Type'] =req.headers.drugtype;
        DrugDetails[ 'Amount'] =req.headers.amount;
        DrugDetails[ 'Chemical Name'] =req.headers.chemicalname;
        DrugDetails[ 'Nature'] =req.headers.nature;
        DrugDetails[ 'Supplier'] =req.headers.supplier;
        DrugDetails[ 'Unique Label'] =req.headers.uniquelabel;
        DrugDetails[ 'Side Effect'] =req.headers.sideeffect;
        DrugDetails[ 'Storage'] =req.headers.storage;
        DrugDetails[ 'Approval Status'] = req.headers.approvalstatus



        console.log(DrugDetails);
        res.status(200).json({message : `Government Status for Drug ${req.headers.drugname} Created Successfully`,DrugDetails})
        }

        else {
            res.status(200).json({message : "Drug Doesn't Exist Hence Government Approval Creation Failed"})

        }
        
        
    } catch (error) {
        res.status(500).json(error);
    }
}

/////////////////---------------Create Drug Function ends here---------------////////////



/////////////////--------------Query Drug By Name Function Starts here--------------////////////////

exports.QueryGovernmentApprovedByName= async(req,res)=>{
   try{

    if(req.headers.drugname == 'Advil'){
        var DrugDetails = {}; 
    DrugDetails[ 'Drug Id' ] = 'L461'      
    DrugDetails[ 'Drug Name'] ='Advil';
    DrugDetails[ 'Drug Type'] ='NSAIDs';
    DrugDetails[ 'Amount'] ='50';
    DrugDetails[ 'Chemical Name'] ='(RS)-2-(4-(2-methylpropyl)phenyl)propanoic acid';
    DrugDetails[ 'Nature'] ='pain, fever, and inflammation';
    DrugDetails[ 'Supplier'] ='Dr.Reddy';
    DrugDetails[ 'Unique Label'] ='Advil®';
    DrugDetails[ 'Side Effect'] ='Upset stomach, nausea, vomiting, headache, diarrhea, constipation, dizziness, or drowsiness ';
    DrugDetails[ 'Storage'] ='avoid excessive heat (above 104°F), excessive humidity, and to store at controlled room temperature (between 68°F and 77°F)';
    DrugDetails[ 'Approval Status'] ='Approved';

    console.log(DrugDetails);
    res.status(200).json({DrugDetails})
    }
    else {
        res.status(200).json({message : "Drug not found"})

    }
    
   }
    
 catch(error) {
    res.status(500).json(error);
        }  
}
/////////////////--------------Query Drug by Name Ends here--------------////////////////


/////////////////--------------Query Drug By Name Function Starts here--------------////////////////

exports.QueryHospitalDrugByName= async(req,res)=>{
    try{
 
     if(req.headers.drugname == 'Advil' && req.headers.hospitalname == 'Apollo Hospital'){
         var DrugDetails = {}; 
     DrugDetails[ 'Drug Id' ] = 'L461'      
     DrugDetails[ 'Drug Name'] ='Advil';
     DrugDetails[ 'Drug Type'] ='NSAIDs';
     DrugDetails[ 'Amount'] ='50';
     DrugDetails[ 'Chemical Name'] ='(RS)-2-(4-(2-methylpropyl)phenyl)propanoic acid';
     DrugDetails[ 'Nature'] ='pain, fever, and inflammation';
     DrugDetails[ 'Supplier'] ='Dr.Reddy';
     DrugDetails[ 'Unique Label'] ='Advil®';
     DrugDetails[ 'Side Effect'] ='Upset stomach, nausea, vomiting, headache, diarrhea, constipation, dizziness, or drowsiness ';
     DrugDetails[ 'Storage'] ='avoid excessive heat (above 104°F), excessive humidity, and to store at controlled room temperature (between 68°F and 77°F)';
     DrugDetails[ 'Approval Status'] ='Approved';
 
     console.log(DrugDetails);
     res.status(200).json({DrugDetails})
     }
     else {
         res.status(200).json({message : "Drug not found"})
 
     }
     
    }
     
  catch(error) {
     res.status(500).json(error);
         }  
 }
 /////////////////--------------Query Drug by Name Ends here--------------////////////////
 
 /////////////////--------------Query Drug By Id Function Starts here--------------////////////////
 
 exports.QueryHospitalDrugById= async(req,res)=>{
     try{
  
      if(req.headers.drugid == 'L461' && req.headers.hospitalname == 'Apollo Hospital'){
          var DrugDetails = {}; 
      DrugDetails[ 'Drug Id' ] = 'L461'      
      DrugDetails[ 'Drug Name'] ='Advil';
      DrugDetails[ 'Drug Type'] ='NSAIDs';
      DrugDetails[ 'Amount'] ='50';
      DrugDetails[ 'Chemical Name'] ='(RS)-2-(4-(2-methylpropyl)phenyl)propanoic acid';
      DrugDetails[ 'Nature'] ='pain, fever, and inflammation';
      DrugDetails[ 'Supplier'] ='Dr.Reddy';
      DrugDetails[ 'Unique Label'] ='Advil®';
      DrugDetails[ 'Side Effect'] ='Upset stomach, nausea, vomiting, headache, diarrhea, constipation, dizziness, or drowsiness ';
      DrugDetails[ 'Storage'] ='avoid excessive heat (above 104°F), excessive humidity, and to store at controlled room temperature (between 68°F and 77°F)';
      DrugDetails[ 'Approval Status'] ='Approved';
 
      console.log(DrugDetails);
      res.status(200).json({DrugDetails})
      }
      else {
          res.status(200).json({message : "Drug not found"})
  
      }
      
     }
      
   catch(error) {
      res.status(500).json(error);
          }  
  }
  /////////////////--------------Query Drug by Id Ends here--------------////////////////
 
  
////////////////---------------Create Drug Function starts here--------////////////

exports.CreatePrescriptionByDrugName= async(req,res)=>{
    try {

        if(req.headers.drugname == 'Advil' && req.headers.hospitalname == 'Apollo Hospital'){
            var PrescriptionDetails = {}; 
            PrescriptionDetails[ 'Prescription Id'] =req.headers.prescriptionid;
            PrescriptionDetails[ 'Hospital Name'] =req.headers.hospitalname;
            PrescriptionDetails[ 'Drug Name' ] = 'Advil'   
            PrescriptionDetails[ 'Drug Id' ] = 'L461'   
            PrescriptionDetails[ 'Patient Name'] =req.headers.patientname;   
            PrescriptionDetails[ 'Complaint'] =req.headers.complaint;
            PrescriptionDetails[ 'Prescription'] =req.headers.prescription;
            
            console.log(PrescriptionDetails);
            res.status(200).json({message : `Prescription Created Successfully`,PrescriptionDetails})
            }
    
            else {
                res.status(200).json({message : "Prescription Creation Unsuccessful"})
    
            }
        
        
    } catch (error) {
        res.status(500).json(error);
    }
}

/////////////////---------------Create Drug Function ends here---------------////////////



/////////////////--------------Query Drug By Name Function Starts here--------------////////////////

exports.QueryPrescription= async(req,res)=>{
   try{

    if(req.headers.prescriptionid == '1001'){
        var PrescriptionDetails = {}; 
    PrescriptionDetails[ 'Prescription Id' ] = '1001'   
    PrescriptionDetails[ 'Hospital Name' ] = 'Apollo Hospital'         
    PrescriptionDetails[ 'Drug Id' ] = 'L461'      
    PrescriptionDetails[ 'Patient Name'] ='Benny Michael ';
    PrescriptionDetails[ 'Complaint'] ='fever';
    PrescriptionDetails[ 'Prescription'] ='Advil BD';
   
    console.log(PrescriptionDetails);
    res.status(200).json({PrescriptionDetails})
    }
    else {
        res.status(200).json({message : "Prescription not found"})

    }
    
   }
    
 catch(error) {
    res.status(500).json(error);
        }  
}
/////////////////--------------Query Drug by Name Ends here--------------////////////////


/////////////////--------------Query Drug By Name Function Starts here--------------////////////////

exports.QueryPatientPrescription= async(req,res)=>{
    try{
 
     if(req.headers.patientname == 'Benny Michael'){
         var PrescriptionDetails = {}; 
     PrescriptionDetails[ 'Prescription Id' ] = '1001'   
     PrescriptionDetails[ 'Hospital Name' ] = 'Apollo Hospital'         
     PrescriptionDetails[ 'Drug Id' ] = 'L461'      
     PrescriptionDetails[ 'Patient Name'] ='Benny Michael ';
     PrescriptionDetails[ 'Complaint'] ='fever';
     PrescriptionDetails[ 'Prescription'] ='Advil BD';
    
     console.log(PrescriptionDetails);
     res.status(200).json({PrescriptionDetails})
     }
     else {
         res.status(200).json({message : "Prescription not found"})
 
     }
     
    }
     
  catch(error) {
     res.status(500).json(error);
         }  
 }
 /////////////////--------------Query Drug by Name Ends here--------------////////////////
 
 