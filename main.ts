// package for taking in terminal inputs
const readline = require("readline-sync");

// connection for PostgreSQL queries
const { pool } = require("./db/index");

/*
The function main is the main loop for the program
which maps user choices to their designated CRUD operations.
*/
async function main() {
  
  while(1){
    
    console.log("\n");
    console.log(`1) Get All Students.\n`);
    console.log(`2) Add Students.\n`);
    console.log(`3) Update Student Email.\n`)
    console.log(`4) Delete student by Student ID.\n`)
    console.log(`5) Exit program.\n`);
    const input = readline.question("Which option would you like to go with from (1 - 5)?\n");

    switch(input){
      case "1":
        await getAllStudents();
        break;
      case "2":
        let first_name = readline.question("Enter student first name.\n");
        let last_name = readline.question("Enter student last name.\n");
        let email = readline.question("Enter student email in format 'jane@example.com'.\n");
        let enrollment_date = readline.question("Enter date of enrollment in format '2023-09-02'.\n");
        await addStudent(first_name, last_name, email, enrollment_date);
        break;
      case "3":
        let student_id_update = readline.question("Input Student Id:\n");
        student_id_update = student_id_update.trim();

        if(checkForPositiveWholeNumbers(student_id_update) === false){
          console.log(`Student ID provided is not a valid number.\n`);
          break;
        }

        let new_email_update =  readline.question("Enter student email in format 'jane@example.com'.\n");
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(new_email_update)){
          console.log("Invalid email format.\n");
          break;
        }

        console.log(`Updating student email with ID ${student_id_update}`);
        await updateStudentEmail(Number(student_id_update), new_email_update);
        break;
      case "4":
        let student_id = readline.question("Input Student Id:\n");
        if(checkForPositiveWholeNumbers(student_id) === false){
          console.log(`Student ID provided is not a valid number.`);
        } else{
          console.log(`Deleting student data with ID ${student_id}`); 
          await deleteStudent(Number(student_id));
        }
        break;
      case "5":
        console.log("Ending program.");
        await pool.end();
        return;
      default:
        console.log("Invalid Option");
        break;
    }
  }    

}

/* 
Gets and shows all student data in a formatted display
*/
async function getAllStudents(){
  const result = await pool.query("SELECT * FROM students;");
  
  for (let i of result.rows) {
    console.log(
      `\nStudent ID: ${i.student_id} | First Name: ${i.first_name} | Last Name: ${i.last_name} | Email: ${i.email} | Enrollment Date: ${i.enrollment_date.toISOString().split('T')[0]}\n`
    );
    // console.log(i.enrollment_date.toISOString().split('T')[0]);
  }

}

/* 
Validates user inputs and adds new student in database.
*/
async function addStudent(first_name: string, last_name: string, email: string, enrollment_date: string) {
  let regex_for_validating_emails = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let regex_for_validating_date =  /^\d{4}-\d{2}-\d{2}$/;
  if(!regex_for_validating_emails.test(email)){
    console.log("Invalid email format.\n");
    return;
  }
  if(!regex_for_validating_date.test(enrollment_date)){
    console.log("Invalid date format.\n");
    return;
  }
  try{
    await pool.query(
      `INSERT INTO students (first_name, last_name, email, enrollment_date)
      VALUES ($1, $2, $3, $4)`,
      [first_name, last_name, email, enrollment_date]
    );

    console.log("student added.\n");
  } catch(e: any){
    console.log(e.message);
  }
}

/* 
Returns the boolean true only when the provided student ID by the user
is a positive whole number.
*/
function checkForPositiveWholeNumbers(id: string): boolean{
  if(id == ''){
    return false;
  }

  let turnIdStrToInt: number = Number(id);
  if(Number.isInteger(turnIdStrToInt) && turnIdStrToInt >= 0){
    return true
  }
  return false;
}

/* 
Retrieves all student IDs to aid in validation in update and delete.
*/
async function getAllStudentIDS(): Promise<number[]>{
 const result = await pool.query("SELECT * FROM students;");
  let returnArray: number[] = [];
  for (let i of result.rows) {
    returnArray.push(i.student_id);
  }
  return returnArray;
}

/* 
Updates student email provided that the Student ID exist in the database.
*/
async function updateStudentEmail(student_id: number, new_email: string) {
  let idArray: number[] = await getAllStudentIDS();
  if(!idArray.includes(student_id)){
    // console.log(idArray);
      console.log(`Student ID ${student_id} does not exist in the database.\n`);
      return
  };

  
  try {
    await pool.query("UPDATE students SET email = $1 WHERE student_id = $2",
      [new_email, student_id]
    );
    console.log(`Update to student email with ID ${student_id} is completed.`)
  } catch(e: any) {
    console.log(e.message);
  }
} 

/* 
Deletes student data depending on if the provided Student ID exists.
*/
async function deleteStudent(student_id: number){
  let idArray: number[] = await getAllStudentIDS();
  if(!idArray.includes(student_id)){
    // console.log(idArray);
      console.log(`Student ID ${student_id} does not exist in the database.\n`);
      return
  };

  try {
    await pool.query("DELETE FROM students WHERE student_id = $1",
      [student_id]
    )
    console.log(`Student data with ID ${student_id} has been remove from database.`)
  } catch(e: any){
    console.log(e.message);
  }
}
main();

