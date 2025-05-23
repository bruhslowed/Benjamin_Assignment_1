const patientstore = [];
const { triggerAsyncId } = require("async_hooks");
const fs = require("fs");
const path = require("path");
//const { json } = require("stream/consumers");

// how does that work again?
let patientcounter = 1;

const DataFilePath = path.join(__dirname, "patientdata.json");

function saveToFile() {
  try {
    const jsonData = JSON.stringify(patientstore, null, 2);
    fs.writeFileSync(DataFilePath, jsonData);
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error saving data:", errorMessage);
    //why does it not show like a function from vscode when i type .message for the error?
    return false;
  }
}

function importFile() {
  try {
    if (!fs.existsSync(DataFilePath)) {
      return false;
    }
    const jsonData = fs.readFileSync(DataFilePath, "utf8");

    const loadedData = JSON.parse(jsonData);
    //validation
    if (!Array.isArray(loadedData)) {
      console.error(
        "Error loading data: File does not contain valid patient logs."
      );
      return false;
    }

    const validPatients = loadedData.filter((patient) => {
      const hasRequiredFields =
        patient &&
        typeof patient === "object" &&
        "id" in patient &&
        "name" in patient &&
        "age" in patient &&
        "gender" in patient &&
        "contactnum" in patient;
      if (!hasRequiredFields) {
        console.warn("Skipping invalid patient record", patient);
        return false;
      }
      return true;
    });

    if (validPatients.length === 0) {
      console.error("error loading data: no valid patient records..");
    }
    if (validPatients.length < loadedData.length) {
      console.warn(
        `Warning: ${
          loadedData.length - validPatients.length
        } invalid patient records were skipped.`
      );
    }

    patientstore.length = 0;

    validPatients.forEach((patient) => {
      patient.dateadded = patient.dateadded
        ? new Date(patient.dateadded)
        : new Date();
      patientstore.push(patient);
    });

    const maxId = Math.max(...patientstore.map((p) => p.id), 0);
    patientcounter = maxId + 1;
    //what does this do exactly -_-
    return true;
  } catch (error) {
    console.error("error loading data:", error.message);
    return false;
  }
}

module.exports = {


  viewPatientRecords() {
    return [...patientstore];
    //why return a copy though?
    //If the array is empty, log array is empty.else, display data.
  },
 importPatientRecords() {
    return importFile();
  },
  savePatientRecords() {
    return saveToFile();
  },
   AddPatient(name, age, gender, contactnum, medicalhistory = "") {
    //why does medicalhistory have the ="" though. it doesnt make sense like you are trying to assign an empty string to an assigned variable.
    const newpatient = {
      id: patientcounter++,
      name,
      age,
      gender,
      contactnum,
      medicalhistory,
      dateadded: new Date(),
    };

    patientstore.push(newpatient);
    return newpatient.id;
  },
  DeletePatient(id) {
    // const success = patientstore.splice(id - 1, 1);
    const patientindex = patientstore.findIndex((patient) => patient.id == id);
    //findindex will find the index of the id given by comparing the input with each of the element's id
    try {
      if (patientindex !== -1) {
        //if patientindex does not equate to -1, meaning that it found an index
        const success = patientstore.splice(patientindex, 1);
        // modifies patientstore and returns an array of which elements were deleted into success.
        success.length > 0
          ? console.log("Deletion success!")
          : console.log("error");
        // if the length of success more than 0, log success else failure idk what to write xD
      } else {
        console.log("Deletion error..");
      }
    } catch (error) {
      console.log("Error in deleting... Error log is:", error.message);
    }
  },

  FindPatientById(patientid) {
       if (!patientid) {
      throw new Error("Patient ID is required.");
      
    }
  const id =
    typeof patientid === "string" ? parseInt(patientid, 10) : patientid;
  const patient = this.viewPatientRecords()
    .find((patient) => patient.id === id);
  //viewpatientrecords returns a copy of an array.
  return patient;
},
  updatePatient(id, updates = {}) {
    
    if (!id) {
      throw new Error("Patient ID is required.");
    }
    const patient = this.FindPatientById(id);
    const validfields = [ 'name', 'age', 'gender', 'contactnum', 'medicalhistory' ];
    Object.keys(updates).forEach(element => {
      if (validfields.includes(element) &&updates[element]!== "" && updates[element] != null) {
        // this is checking if validfields contains the object that updates has. so if updates has 'name' validfields will check if it has 'name' in its array.
        //checks that each object in updates is not null or has an empty string.
        patient[element] = updates[element];
      }
    });
    return patient;
  },
};
