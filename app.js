//const mymodule = require("./Benjamin_EGL304.js");
//const inquirer = require("inquirer");
const mymodule = require("./Benjamin_EGL304.js");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let questions =
  "Choose an option:\n" +
  "1. View Patient Record\n" +
  "2. Import Patient Record\n" +
  "3. Save Patient Record\n" +
  "4. Add a patient\n" +
  "5. Delete a patient\n" +
  "6. Update Patient Details\n" +
  "7. Exit\n" +
  "==========================\n";

let handleOption = function (option) {
  //the if else for the menu bar
  switch (+option) {
    case 1:
      ViewPatientRec();
      return;
    case 2:
      ImportPatientRec();
      break;
    case 3:
      SavePatientRec();
      break;
    case 4:
      AddPatient();
      return;
    case 5:
      DeletePatient();
      return;
    case 6:
      UpdatePatientDetails();
      return;
    case 7:
      rl.close();
      return;
  }

    setTimeout(() => {
      rl.question(questions, handleOption);
    }, 1500);
  
};
rl.question(questions, handleOption);

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

function ViewPatientRec() {
  console.log("==== All patients ===");
  if (mymodule.viewPatientRecords().length === 0) {
    // why not = null tho?
    console.log("Array is empty. try adding patients or importing records.");
  } else {
    const allP = mymodule.viewPatientRecords();
    // for (let index = 0; index < allP.length; index++) {
    //     const text = mymodule.viewPatientRecords[index + 1];

    // }
    allP.forEach((patient) => {
      console.log(
        `ID: ${patient.id}, Name: ${patient.name},Age:${patient.age},Gender:${patient.gender},Contact Number: ${patient.contactnum},Medical History: ${patient.medicalhistory}`
      );
    });
  }
  rl.question(questions, handleOption);
}

function AddPatient() {
  console.log("add new patient");

  rl.question("Enter Your name", (name) => {
    rl.question("Enter Your Age:", (age) => {
      rl.question("Enter Your Gender:", (gender) => {
        rl.question("Enter Your Contact Number:", (contactnum) => {
          rl.question("Enter Your Medical History:", (medicalhistory) => {
            const patientid = mymodule.AddPatient(
              name,
              parseInt(age),
              gender,
              contactnum,
              medicalhistory
            );

            console.log(`Patient was added with an id of ${patientid}.`);
            rl.question(questions, handleOption);
          });
        });
      });
    });
  });
}
function ImportPatientRec() {
  const success = mymodule.importPatientRecords();
  if (success) {
    console.log("Patient Log loaded successfully!!");
    console.log(`Status of  success is ${success}.`);
  } else {
    console.log("error loading records or file not found.");
    console.log(`Status of  success is ${success}.`);
  }
}
function SavePatientRec() {
  const success = mymodule.savePatientRecords();
  if (success) {
    console.log("Patient records saved successfully!!");
  } else {
    console.log("failed.");
  }
}
function DeletePatient() {
  if (mymodule.viewPatientRecords().length === 0) {
    // why not = null tho?
    console.log("Array is empty. try adding patients or importing records.");
        rl.question(questions, handleOption);
        return;
  } else {
    const allP = mymodule.viewPatientRecords();
    // for (let index = 0; index < allP.length; index++) {
    //     const text = mymodule.viewPatientRecords[index + 1];

    // }
    allP.forEach((patient) => {
      console.log(
        `ID: ${patient.id}, Name: ${patient.name},Age:${patient.age},Gender:${patient.gender},Contact Number: ${patient.contactnum},Medical History: ${patient.medicalhistory}`
      );
      //show a list of patients before going to deletion phase
    });
    rl.question("Input ID for the patient that you want to delete.", (ID) => {
      const selectedpatient = mymodule.FindPatientById(ID);
      if (!selectedpatient) {
        console.log(`No patient found with id: ${ID}.`);
        rl.question(questions, handleOption);
        return;
      }
      console.log(
        `Patient info: ID: ${selectedpatient.id}, Name: ${selectedpatient.name},Age:${selectedpatient.age},Gender:${selectedpatient.gender},Contact Number: ${selectedpatient.contactnum},Medical History: ${selectedpatient.medicalhistory}`
      );
      rl.question("Delete log? (y/n)", (answer) => {
        if (answer === "y" || answer === "Y") {
          console.log("Attempting to delete..");
          mymodule.DeletePatient(ID);
        } else if (answer === "n" || answer === "N") {
          console.log("Deletion aborted.");
        } else {
          console.log("Input not recognized. Please try again.");
        }
        rl.question(questions, handleOption);
      });
    });
  }
}
function UpdatePatientDetails() {

  if (mymodule.viewPatientRecords().length === 0) {
    // why not = null tho?
    console.log("Array is empty. try adding patients or importing records.");
    rl.question(questions, handleOption);
    return;
  } else {
    const allP = mymodule.viewPatientRecords();
    // for (let index = 0; index < allP.length; index++) {
    //     const text = mymodule.viewPatientRecords[index + 1];

    // }
    allP.forEach((patient) => {
      console.log(
        `ID: ${patient.id}, Name: ${patient.name},Age:${patient.age},Gender:${patient.gender},Contact Number: ${patient.contactnum},Medical History: ${patient.medicalhistory}`
      );
      //show a list of patients before going to deletion phase
    });
    rl.question(
      "Input ID for the patient that you want to Update.",
      async (ID) => {
      
        const selectedpatient = mymodule.FindPatientById(ID);
        if (!selectedpatient) {
          console.log(`No patient found with id: ${ID}.`);
          rl.question(questions, handleOption);
          return;
        }
        console.log(
          `Patient info: ID: ${selectedpatient.id}, Name: ${selectedpatient.name},Age:${selectedpatient.age},Gender:${selectedpatient.gender},Contact Number: ${selectedpatient.contactnum},Medical History: ${selectedpatient.medicalhistory}`
        );

      console.log("\nWhat do you want to update?");
      console.log("1. Name");
      console.log("2. Age"); 
      console.log("3. Gender");
      console.log("4. Contact Number");
      console.log("5. Medical History");
      console.log("6. Multiple fields");
      console.log("0. Cancel");

         rl.question("Choose option (0-6): ", (choice) => {
        switch(choice) {
          case '1':
            updateSingleField(ID, 'name', 'Enter new name: ');
            break;
          case '2':
            updateSingleField(ID, 'age', 'Enter new age: ');
            break;
          case '3':
            updateSingleField(ID, 'gender', 'Enter new gender: ');
            break;
          case '4':
            updateSingleField(ID, 'contactnum', 'Enter new contact number: ');
            break;
          case '5':
            updateSingleField(ID, 'medicalhistory', 'Enter new medical history: ');
            break;
          case '6':
            updateMultipleFields(ID);
            break;
          case '0':
            console.log("Update cancelled.");
            rl.question(questions, handleOption);
            break;
          default:
            console.log("Invalid option.");
            rl.question(questions, handleOption);
        }
    })
    
  })
}
}



function updateSingleField(patientID, fieldName, msg) {
  rl.question(msg, (newValue) => {
    if (newValue && newValue.trim() !== "") {
      const updates = {};
      updates[fieldName] = fieldName === 'age' ? parseInt(newValue) : newValue.trim();
      
      try {
        mymodule.updatePatient(patientID, updates);
        console.log("Patient updated successfully!");
        const updatedPatient = mymodule.FindPatientById(patientID);
        console.log(`Updated: ${fieldName} = ${updates[fieldName]}`);
      } catch (error) {
        console.log(`Error updating patient: ${error.message}`);
      }
    } else {
      console.log("No changes made - empty input.");
    }
    rl.question(questions, handleOption);
  });
}

function updateMultipleFields(patientID) {
  const updates = {};
  const selectedPatient = mymodule.FindPatientById(patientID);
  
  console.log("Press Enter to keep current value, or type new value:");
  
  rl.question(`Name (${selectedPatient.name}): `, (name) => {
    if (name.trim()) updates.name = name.trim();
    
    rl.question(`Age (${selectedPatient.age}): `, (age) => {
      if (age.trim()) updates.age = parseInt(age);
      
      rl.question(`Gender (${selectedPatient.gender}): `, (gender) => {
        if (gender.trim()) updates.gender = gender.trim();
        
        rl.question(`Contact (${selectedPatient.contactnum}): `, (contact) => {
          if (contact.trim()) updates.contactnum = contact.trim();
          
          rl.question(`Medical History (${selectedPatient.medicalhistory}): `, (history) => {
            if (history.trim()) updates.medicalhistory = history.trim();
            
            if (Object.keys(updates).length > 0) {
              try {
                mymodule.updatePatient(patientID, updates);
                console.log("Patient updated successfully!");
                console.log("Updated fields:", Object.keys(updates).join(', '));
              } catch (error) {
                console.log(`Error updating patient: ${error.message}`);
              }
            } else {
              console.log("No changes made.");
            }
            rl.question(questions, handleOption);
          });
        });
      });
    });
  });
}