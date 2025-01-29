// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    // the ID of the course the assignment group belongs to
    course_id: 451,
    // the percentage weight of the entire assignment group
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            // the due date for the assignment
            due_at: "2023-01-25",
            // the maximum points possible for the assignment
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            // the due date for the assignment
            due_at: "2023-02-27",
            // the maximum points possible for the assignment
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            // if an assignment is not yet due, it should not be included in either
            // the average or the keyed dictionary of scores
            // the due date for the assignment
            due_at: "3156-11-15",
            // the maximum points possible for the assignment
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        // the ID of the learner for which this data has been collected
        learner_id: 125,
        // each assignment should have a key with its ID,
        // and the value associated with it should be the percentage that
        // the learner scored on the assignment (submission.score / points_possible)
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        // each assignment should have a key with its ID,
        // and the value associated with it should be the percentage that
        // the learner scored on the assignment (submission.score / points_possible)
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        // each assignment should have a key with its ID,
        // and the value associated with it should be the percentage that
        // the learner scored on the assignment (submission.score / points_possible)
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        // each assignment should have a key with its ID,
        // and the value associated with it should be the percentage that
        // the learner scored on the assignment (submission.score / points_possible)
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        // each assignment should have a key with its ID,
        // and the value associated with it should be the percentage that
        // the learner scored on the assignment (submission.score / points_possible)
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

// try-catch
try {
    validateCourseId();
    validatePointsPossible();

} catch (error) {
    console.error(error.message);
}


// FUNCTION #1 THAT WORKS 
function validateCourseId() {
    //checks that assignment group course id and course info id are the same
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        // if not, throw an error
        throw new Error("Assignment Group and Course ID do not match;");
    } else if (AssignmentGroup.course_id === CourseInfo.id) {
        console.log(`Assignment Group Course ID ${AssignmentGroup.course_id} and course Info ID ${CourseInfo.id} are the same. Valid Course Id`);
    }
}
// validateCourseId();

// FUNCTION #2 THAT WORKS
// validatePointsPossible() to be called under validateAssignments()
function validatePointsPossible() {
    // Makes sure points possible are more than 0
    // no negative numbers
    // no undefined numbers or blank numbers
    // points_possible
    // for...of or forEach()?
    // WRONG: for (const points of points_possible){
    for (const assignment of AssignmentGroup.assignments) {
        const pointsPossible = assignment.points_possible;
        // if it's 0 or a negative number
        if (pointsPossible <= 0 || pointsPossible === undefined) {
            throw new Error("Points Possible - Invalid Number")
        }
        // if it's symbols or a word
        // isInteger checks to see if it's a number -- if not, throw an error
        if (!Number.isInteger(pointsPossible)) {
            throw new Error("Points Possible - Invalid Entry");
        }
    }
}

// FUNCTION #3 
// filter - array method that goes through each element in the array (like map() does) and checks some criteria of the element and if the element passes the check, it returns things that are true conditions
// filters false condition
// this will filter it out from the results AND from the average
function filterValidAssignments(AssignmentsArray) {
    // arrow function will take in each element(assignment) in the array and apply the test to it, if true, return it 
    // first try to filter out future dates
    //  => is the same thing as the word function
    // {} inside there is the function
    //new Date() -> always today's date
    // new Date('2234-10-19')<= new Date() -> defining new date and comparing it to today's date 
    let AssignmentsDueNow = AssignmentsArray.filter(element => new Date(element.due_at) <= new Date());
    return AssignmentsDueNow;
}

console.log(filterValidAssignments(AssignmentGroup.assignments));





// TO DO: have to loop through learner submissions

// 1st loop = for of loop ()
// compare the date it was submitted to the date it was due
// if else statement -- if late,  score = score - 10%
// else score = score (can be a default score = score)



// 2nd loop = find out what the possible points are they could have gotten and compare it to what they did get
// nested for in loop


// //////////////////////////////////////
// for (const element of object) {

// }
// ////////////////////
// for (const key in object) {
//     if (Object.prototype.hasOwnProperty.call(object, key)) {
//         const element = object[key];

//     }
// }
// ///////////////////
// array.forEach(element => {

// });
// /////////////////
// while (condition) {

// }
// //////////////////







// THIS IS NOT GOOD -- IT GETS THE RESULTS BUT IS CRAZY LONG
// function getLearnerData(course, ag, submissions) {
//     // remove future assignments because they shouldn't be included in the average
//     let validAssignments = filterValidAssignments(ag.assignments);
// // store resultsper learner in a variable
// let learnerResults={}; 

// for (let submission of submissions){
//     let LearnerId = submission.learner_id;
//     // .find() is a method used to search for an element in an array that meets a specific condition
//     let assignment = validAssignments.find(a=> a.id === submission.assignment_id);

//     // Skips assignments that were removed
//     if (!assignment) continue; 

//     let pointsPossible = assignment.points_possible; 
//     let score = submission.submission.score;
// let submittedAt = new Date(submission.submission.submitted_at);
// let dueAt = new Date(assignment.due_at);

// // Calculate percentage
// let percentage = score / pointsPossible; 

// // Apply late penalty if late
// if (submittedAt > dueAt) {
//     percentage *= 0.90; // 10% penalty
// }
// // Store learner data.
// if (!learnerResults[LearnerId]) {
//     learnerResults[LearnerId] = { id: LearnerId, totalScore: 0, totalPossible: 0}
// }
// //Store individual assignment score.
// learnerResults[LearnerId][assignment.id] = percentage; 
// // Add up scores.
// learnerResults[LearnerId].totalScore += score;
// // Adds up possible points. 
// learnerResults[LearnerId].totalPossible += pointsPossible; 
// }
// // Figure out weighted average for each learner
// return Object.values(learnerResults).map(learner => ({
//     id: learner.id, 
//     // Weighted average
//     avg: learner.totalScore / learner.totalPossible, 
//     // spread to include assignment scores
//     ...learner
// }));
// }

// //Run the function
// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions); 
// console.log(result);














/////////////////////////////////////////////////


// here, we would process this data to achieve the desired result.
// const result = [
// {
//     // the ID of the learner for which this data has been collected
//     id: 125,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
// },
// {
//     // the ID of the learner for which this data has been collected
//     id: 132,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
// }
//     ];

//     return result;
// }

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);

//   DELETE THIS
//
// const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

//   return result;







// WRONG
// function filterOutFutureDate(){
//     define current date
//     evaluate if dates are more than the current date (in the future)
//     if in the future, don't include them // can't do that in this function
//     if current date or before push to new array? // can't do that in this function
//     return all the valid dates // callback in a filter will only define true or false // can't do that in this function
// }

// function validateAssignments() {
//     validatePointsPossible();
//     ensureAllFieldsHaveValidValues();
// }
// validateAssignments();

// // to be called under validateAssignments()
// function ensureAllFieldsHaveValidValues() {
//      // is id valid?
//     // (null || undefined || NaN) = invalid

//      // is due date valid?
// // is it a valid date string -- date object
// // year-month-day
// function isValidDate(dateString) {
//     const date= new Date(dateString);
//     return !isNaN(date.getTime());
// }

//     // name (learner_id)
//     // check that it's not empty
//     // check that it's a number

// }


//NOT NEEDED
// function validateLearnerSubmissions() {
//     function validateSubmittedAtDate() {
//         // validate for proper data types and logical values
//         // not future dates --- did this with the filter function arrow

//     }

//     function validateScore() {
//         // validate for proper data types and logical values
//     }
// }