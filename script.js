/**
 * Define all global variables here
 */
    //Here, I'm setting up all the possible global variables that could exist, and that could be useful moving forward
/*uncessary variables
var student_name_table;
var student_course_table;
var student_grade_table;
var operations_table;
*/
var delete_button;
var add_button;
var cancel_button;
var student_name_input;
var student_course_input;
var student_grade_input;
var student_grade_average;
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
//define global array that will hold the student objects (created separately)
var student_array=[];
var student_object={};

/**
 * inputIds - id's of the elements that are used to add students
 * //Student Name will be added with the input id: "#student_name"
 * //Student Course will be added with the input id: "#course"
 * //Student grade will be added with the input id: "#student_grade
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
//Here, we are going to use a function called addClick to handle all events when the add button is clicked
$(document).ready(function(){
    addClick();
    //by adding a cancelClicked() into the document.ready, I ensure that it will load after all other events have subsided
    //prevents double adding data upon clicking add button
    cancelClicked();
    //

});
    function addClick(){
    $("#addClicked").click(function(){
        var student_name_input=$("#studentName").val();  //here, I'm setting up to add to the DOM
        $("#studentName").val(student_name_input);      //here, I add #studentName to the DOM
        var student_course_input=$("#course").val();    //I'm having major issues with my first entry, second entry normalizes, all new entries append to the original entry, on 2nd click, they make their own row
        $("#course").val(student_course_input);
        var student_grade_input= $("#studentGrade").val();
        $("#studentGrade").val(student_grade_input);

        var student_object={
            name: student_name_input,
            course: student_course_input,
            grade: student_grade_input
        };

        student_array.push(student_object);
        console.log(student_array);
        //define student object, append to DOM
        //loop through array; figure out why there are double entries, etc.
        for(var i=0;i<student_array.length;i++) {
            var nName = $('<td>', {
                text: student_array[i].name
            });
            var nCourse = $('<td>', {
                text: student_array[i].course
            });
            var nGrade = $('<td>', {
                text: student_array[i].grade
            });

            var deleteB=$('<button>',{
               type:"button",
                class:"btn btn-danger",
                text:"Delete"
            });
        }
        var nRow = $('<tr>', {
            id: "tableBody"
        });
        $('#tableBody').prepend(nRow);
        $(nRow).append(nName, nCourse, nGrade,deleteB);

        student_object.name=student_name_input;
        $("#tableBody").append(student_object.name);
        student_object.course=student_course_input;
        $("#tableBody").append(student_object.course);
        student_object.grade=student_grade_input;
        $("#tableBody").append(student_object.grade);

    });
}



/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
//this will clear out the AddStudentForm  (now we have to figure out a way to add new rows of data, likely using a for loop)
function cancelClicked(){
    $("#clickCancel").click(function(){
        $("#studentName").val('');
        $("#course").val('');
        $("#studentGrade").val('');
    })
}

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 *
 */
//gradeaverage function call calculates correct average of input; however, in the console, the value for sum comes up as undefined. check up on this
    function gradeAverage(){
    var sum=0;
    var average=0;

    for(var i=0;i<student_array.length;i++){
       sum+=parseInt(student_array[i].grade);

    }
    average=sum/student_array.length;
    $('.avgGrade .badge> span').html(average);
    return average;


}
    gradeAverage();



/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){};
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
    function updateStudentList(){};
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
//function domCreation(i) {
  /*  for(var i=0;i<student_array.length;i++) {
        var nName = $('<td>', {
            text: student_array[i].name
        });
        var nCourse = $('<td>', {
            text: student_array[i].course
        });
        var nGrade = $('<td>', {
            text: student_array[i].grade
        });
    }
    var nRow = $('<tr>', {
        id: "tableBody"
    });
    $('#tableBody').prepend(nRow);
    $(nRow).append(nName, nCourse, nGrade);
} */

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){

}

/**
 * Listen for the document to load and reset the data to the initial state
 */