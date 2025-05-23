# Patient Management System for KKH Hospital

## Overview

This Node.js module provides a comprehensive solution for managing patient records for KK Women's and Children's Hospital (KKH) website (https://www.kkh.com.sg/). The system offers CRUD (Create, Read, Update, Delete) functionality for patient records with file import/export capabilities.

## Features

- **View all patient records** - Retrieve complete list of patients
- **Import/Export functionality** - Load from and save to JSON files
- **Patient management**:
  - Add new patients with complete details
  - Delete patients by unique ID
  - Update single or multiple patient fields
- **Data persistence** - Save records to file for future sessions
- **User-friendly CLI interface** - Simple menu-driven interaction

## Installation

1. Ensure you have [Node.js](https://nodejs.org/en/) installed (version 14 or higher recommended)
2. Clone or download this repository
3. Navigate to the project directory in your terminal

## Usage

Run the application with:

node app.js


You'll be presented with a menu of options:

```
📋 Main Menu
1. View Patient Records
2. Import Patient Records
3. Save Patient Records
4. Add New Patient
5. Delete Patient
6. Update Patient Details
7. Exit
```

## Module Functions (`Benjamin_EGL304.js`)

### Core Functions
- `viewPatientRecords()` - Returns array of all patient records
- `importPatientRecords()` - Loads patient records from JSON file
- `savePatientRecords()` - Saves current records to JSON file
- `addPatient(name, age, gender, contactNum, medicalHistory)` - Creates new patient record
- `deletePatient(id)` - Removes patient by ID
- `findPatientById(id)` - Retrieves specific patient record
- `updatePatient(id, updateObject)` - Modifies patient details

### Utility Functions
- `saveToFile()` - Persists current records to file
- `importFile()` - Reads records from JSON file into memory

## File Structure

```
project-folder/
│
├── app.js                # Main application entry point
├── Benjamin_EGL304.js    # Core patient management module
├── data/                 # Directory for patient data storage (auto-created)
│   └── patients.json     # Default patient data file
├── README.md             # This documentation
└── package.json          # Node.js project configuration
```

## Data Model

Patient records contain the following fields:
- `id`: Unique identifier (auto-generated)
- `name`: Full name
- `age`: Numeric age
- `gender`: Male/Female/Other
- `contactNum`: Phone number
- `medicalHistory`: String describing medical background

## Best Practices

1. **Regular backups**: Use the export function frequently
2. **Data validation**: All inputs are sanitized automatically
3. **Error handling**: Comprehensive error messages guide proper usage

## Support

For issues or feature requests, please contact the maintainer.

---

This improved version provides clearer structure, better formatting, and more detailed information while maintaining all the original content. The markdown is organized for better readability and includes proper code formatting.