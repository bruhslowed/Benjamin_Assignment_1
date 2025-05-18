const mymodule = require("./Benjamin_EGL304.js");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let questions = "Choose an option:\n"+
"1. View Patient Record\n"+
"2. Import Patient Record\n"+
"3. Save Patient Record\n"+
"4. Add a patient\n"+
"5. Delete a patient\n"+
"6. Update Patient Details\n"+
"7. View Patient Details\n"+
// "8. Update event's fields\n"+
// "9. Delete event by id\n"+
// "10. Delete event by name\n"+
"8. Exit\n"+
"==========================\n";

let handleOption = function(option){
    //the if else for the menu bar
    switch(+option) {
        case 1:
            ViewPatientRec();
            break;
        case 2:
            ImportPatientRec();
            break;
        case 3:
            SavePatientRec();
            break;
        case 4:
            AddPatient();
            break;
        case 5:
            DeletePatient();
            break;
        case 6:
            UpdatePatientDetails();
            break;
        case 7:
            ViewPatientDetails();
            break;
        // case 8:
        //     updateEventWithFields();
        //     break;
        // case 9:
        //     deleteEventById();
        //     break;
        // case 10:
        //     deleteEventByName();
        //     break;
        case 8: 
            rl.close();
            break;
    }
    setTimeout(()=>{rl.question(questions,handleOption);},1500);
}
rl.question(questions, handleOption);


rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
function FindPatientById(patientid){
const id = typeof patientid === 'string' ? parseInt(patientid,10) : patientid;
const patient = mymodule.viewPatientRecords().find(patient => patient.id === id);
return patient;
}
function ViewPatientRec(){
console.log("==== All patients ===");
if (mymodule.viewPatientRecords().length === 0) {
    // why not = null tho?
console.log("Array is empty. try adding patients or importing records.");
} else {
    const allP = mymodule.viewPatientRecords();
    // for (let index = 0; index < allP.length; index++) {
    //     const text = mymodule.viewPatientRecords[index + 1];
        
    // }
    allP.forEach(patient => {
        console.log(`ID: ${patient.id}, Name: ${patient.name},Age:${patient.age},Gender:${patient.gender},Contact Number: ${patient.contactnum},Medical History: ${patient.medicalhistory}`);
    });
}
    rl.question(questions, handleOption);
}


function AddPatient(){
console.log("add new patient");

rl.question("Enter Your name",(name)=>{
    rl.question("Enter Your Age:",(age)=>{
        rl.question("Enter Your Gender:",(gender)=>{
            rl.question("Enter Your Contact Number:",(contactnum)=>{
                rl.question("Enter Your Medical History:",(medicalhistory)=>{
                    const patientid = mymodule.AddPatient(
                        name,
                        parseInt(age),
                        gender,
                        contactnum,
                        medicalhistory,
                    );

                    console.log(`Patient was added with an id of ${patientid}.`);
                    rl.question(questions, handleOption);
                })
            })
        })
    })
})
}
function ImportPatientRec(){
const success = mymodule.importPatientRecords()
if (success) {
    console.log("Patient Log loaded successfully!!")
        console.log(`Status of  success is ${success}.`)

    
} else {
    console.log("error loading records or file not found.")
    console.log(`Status of  success is ${success}.`)
}
}
function SavePatientRec(){
const success = mymodule.savePatientRecords()
if (success) {
    console.log("Patient records saved successfully!!")
} else {
    console.log("failed.")
}
}
function DeletePatient(){
    if (mymodule.viewPatientRecords().length === 0) {
    // why not = null tho?
console.log("Array is empty. try adding patients or importing records.");
} else {
    const allP = mymodule.viewPatientRecords();
    // for (let index = 0; index < allP.length; index++) {
    //     const text = mymodule.viewPatientRecords[index + 1];
        
    // }
    allP.forEach(patient => {
        console.log(`ID: ${patient.id}, Name: ${patient.name},Age:${patient.age},Gender:${patient.gender},Contact Number: ${patient.contactnum},Medical History: ${patient.medicalhistory}`);
    });
    rl.question("Input ID for the patient that you want to delete.",(ID)=>{
      const selectedpatient = FindPatientById(ID);
        console.log(`Patient info: ID: ${selectedpatient.id}, Name: ${selectedpatient.name},Age:${selectedpatient.age},Gender:${selectedpatient.gender},Contact Number: ${selectedpatient.contactnum},Medical History: ${selectedpatient.medicalhistory}`);
        rl.question("Delete log? (y/n)",(answer)=>{
            if (answer === "y" || "Y") {
                console.log("Attempting to delete..");
                mymodule.DeletePatient(ID);
            } else if (answer === "n" || "N") {
                console.log("Deletion aborted.");
                 rl.question(questions, handleOption);
            }else
            {
                
            }
        })
    });
}
}
