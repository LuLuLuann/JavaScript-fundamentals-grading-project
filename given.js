// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];


function calculateAssignmentScores(submissions, assignments){
    let scores ={};
    assignments.forEach(assignment=> {
let  submission = submissions.find(sub => sub.assignment_id === assignment.id)
if (submission){
    let score = submission.submission.score
    console.log(score);
    if (newDate(submission.submission.submitted_at) > new Date (assignment.due_at)){
        score -= assignment.points_possible * 0.1;
    }
    scores [assignment.id] = (score/assignment.points_possible) * 100;
}
console.log(submission)
    })
    return scores; 
}
// calculateAssignmentScores(LearnerSubmissions, AssignmentGroup); 

    let learner = {}
console.log(learner);

// 5 learner submissions
function getLearnerData(course, ag, submissions) {

    validateData(course, ag)
    let validAssignment = filterValidAssignments(ag.assignments)
    console.log(validAssignment)

    submissions.forEach(submission => {
        // we want to group each learner individually
        if (!learner[submission.learner_id]) {
            learner[submission.learner_id] = {
                id: submission.learner_id,
                score: {

                }
            }
        }
        learner[submission.learner_id].score = calculateAssignmentScores(submissions.filter(sub => sub.learner_id === submission.learner_id), validAssignment)
    })

    // here, we would process this data to achieve the desired result.
    const result = [
        {
            id: 125,
            avg: 0.985, // (47 + 150) / (50 + 150)
            1: 0.94, // 47 / 50
            2: 1.0 // 150 / 150
        },
        {
            id: 132,
            avg: 0.82, // (39 + 125) / (50 + 150)
            1: 0.78, // 39 / 50
            2: 0.833 // late: (140 - 15) / 150
        }
    ];

    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

//Step 1: Validate Input Data
//   Plan:
// Verify that AssignmentGroup.course_id matches CourseInfo.id.
// If not, throw an error.
// Ensure points_possible is not zero for any assignment.
// Check if all required fields are present and of the correct type.
function validateData(course, group) {
    if (group.course_id !== course.id) {
        throw new Error(`Invalid data: AssignmentGroup ${group.id} does not belong to Course ${course.id}`);
    }

    group.assignments.forEach(assignment => {
        if (assignment.points_possible === 0) {
            throw new Error(`Invalid data: Assignment ${assignment.id} has zero possible points.`);
        }
    });
}

//Step 2: Filter Valid Assignments
// Task: Exclude assignments that are not yet due.
// Plan:
// Compare due_at with the current date.
// Only include assignments where due_at is in the past.
function filterValidAssignments(assignments) {
    const now = new Date();
    console.log(now);
    console.log(assignments);
    return assignments.filter(assignment => new Date(assignment.due_at) < now);
}

//   Step 3: Process Learner Submissions
// Task: Calculate scores for each assignment, deduct penalties for late submissions, and store percentages.
// Plan:
// Compare submission.submitted_at with assignment.due_at.
// Deduct 10% of points_possible for late submissions.
// Calculate percentage score: (submission.score / points_possible) * 100.
function calculateAssignmentScores(submissions, assignments) {
    const scores = {}; // to store each score
    // the find method; finds the submission with the patching id
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

    assignments.forEach(assignment => {
        const submission = submissions.find(sub => sub.assignment_id === assignment.id);

        if (submission) {
            let score = submission.submission.score;
            if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
                score -= assignment.points_possible * 0.1; // Deduct 10% for late submissions
            }
            // adding the score id and the percentage score 
            // to the scores object
            scores[assignment.id] = (score / assignment.points_possible) * 100;
        }
    });

    return scores;
}

//   Step 4: Calculate Weighted Average
// Task: Use group_weight and points_possible to calculate a weighted average for all assignments.
// Plan:
// Sum up total points and weighted scores for valid assignments.
// Divide the weighted score total by the total points to get the average.

function calculateWeightedAverage(scores, assignments) {
    let totalPoints = 0;
    let weightedScore = 0;

    assignments.forEach(assignment => {
        if (scores[assignment.id] !== undefined) {
            totalPoints += assignment.points_possible;
            weightedScore += (scores[assignment.id] / 100) * assignment.points_possible;
        }
    });

    return (weightedScore / totalPoints) * 100;
}

//   Step 5: Main Function: getLearnerData()
// Task: Combine the above steps to process the data and return the final formatted output.
// Plan:
// Validate the input data.
// Filter valid assignments.
// Calculate scores and weighted averages.
// Format the output.
function getLearnerData(course, group, submissions) {
    try {
        // Step 1: Validate input data
        validateData(course, group);

        // Step 2: Filter assignments that are due
        const validAssignments = filterValidAssignments(group.assignments);

        // Step 3: Process each learner's submissions
        const learners = {};
        submissions.forEach(submission => {
            if (!learners[submission.learner_id]) {
                learners[submission.learner_id] = { id: submission.learner_id, scores: {} };
            }

            learners[submission.learner_id].scores = calculateAssignmentScores(
                submissions.filter(sub => sub.learner_id === submission.learner_id),
                validAssignments
            );
        });

        // Step 4: Calculate weighted averages and format results
        const results = Object.values(learners).map(learner => {
            const learnerScores = learner.scores;
            const average = calculateWeightedAverage(learnerScores, validAssignments);

            return {
                id: learner.id,
                avg: average,
                ...learnerScores
            };
        });

        return results;
    } catch (error) {
        console.error(`Error processing data: ${error.message}`);
        return [];
    }
}

// Step 6: Test the Function
const course = { id: 1, name: "Math 101" };
const group = {
    id: 1,
    name: "Homework",
    course_id: 1,
    group_weight: 20,
    assignments: [
        { id: 1, name: "Assignment 1", due_at: "2025-01-01", points_possible: 100 },
        { id: 2, name: "Assignment 2", due_at: "2025-02-01", points_possible: 50 }
    ]
};
const submissions = [
    { learner_id: 1, assignment_id: 1, submission: { submitted_at: "2025-01-02", score: 90 } },
    { learner_id: 1, assignment_id: 2, submission: { submitted_at: "2025-01-31", score: 40 } }
];

console.log(getLearnerData(course, group, submissions));


//   Expected Output:
// [
//   {
//     id: 1,
//     avg: 76,
//     1: 80,  // Late submission penalty applied
//     2: 80
//   }
// ]

// Additional Tips for Learners
// Understand the Data Flow: Break the problem into smaller functions that handle specific tasks. This reduces complexity.
// Error Handling: Always validate data and handle exceptions gracefully to prevent program crashes.
// Reusability: Write functions that can be reused for other similar tasks.
// Test Cases: Test with various scenarios, including edge cases (e.g., missing fields, zero points).
