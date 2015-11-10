/**
 * Define all global variables here
 */
//Here, I'm setting up all the possible global variables that could exist, and that could be useful moving forward

var student_name_input;
var student_course_input;
var student_grade_input;
var student_grade_average;
var global_result;
var api_key = "FvFMoid4Gy";
/**
 * define global array that will hold the student objects (created separately)
 * @type {Array}
 */
var student_array = [];


/**
 * addClick(), cancelClicked(), sgtOnLoad() will be run after the dom is fully loaded and ready
 */
$(document).ready(function () {
    addClick();
    cancelClicked();
    sgtOnLoad();


    $("body").on("click", ".del-btn", function () {
        console.log(this);
        var index = $(this).attr("student_index");
        console.log(student_array, "student_array before");
        delete student_array[index];
        console.log(student_array, "student_array before");
        $(this).parent().remove();

        gradeAverage();
    });
});

/**
 * here is the function to pull student info from the server
 */
function sgtOnLoad() {

    console.log("hi dan");
    $.ajax({
        dataType: 'json',
        data: {
            api_key,
        },
        url: 'http://s-apis.learningfuze.com/sgt/get',
        crossDomain: true,
        type: 'POST',
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            global_result = result;
            for (i = 0; i < global_result.data.length; i++) {
                var studentObject = global_result.data[i];
                addStudentsToTable(studentObject);
            }
        }
    });
}
/**
 * function adds student information from inputs on page to the server and the sgt online
 * @param studentObject
 */
function studentToServer(studentObject) {
    //Variables to work with are below:
    //api_key:string for api access
    //studentObject: object that contains student data
    console.log('studentToServer', studentObject);
    $.ajax({
        dataType: 'json',
        data: {
            api_key,
            name: studentObject.name,
            course: studentObject.course,
            grade: studentObject.grade
        },
        url: 'http://s-apis.learningfuze.com/sgt/create',
        crossDomain: true,
        type: 'POST',
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            global_result = result;
            if (global_result.success === false) {
                console.log("there was an error")
            } else {
                console.log("There was no error")
            }


        }
    });
}

function deleteFromServer(student_object) {
    console.log('deleteFromServer', studentObject);
    $.ajax({
        dataType: 'json',
        data: {
            api_key,
            student_id: [i]
        },
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        crossDomain: true,
        type: 'POST',
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            global_result = result;
            if (global_result.success === false) {
                console.log("there was an error")
            } else {
                console.log("There was no error")
            }
        }
    });
}

/**
 * this function takes in student_object (student_name,student_course,student_grade) and dynamically creates them and
 * puts them on the board
 * @param student_object
 */
function addStudentsToTable(student_object) {
    if (student_object) {
        var nName = $('<td>', {
            text: student_object.name
        });
        var nCourse = $('<td>', {
            text: student_object.course
        });
        var nGrade = $('<td>', {
            text: student_object.grade
        });
        var deleteB = $('<button>', {
            type: "button",
            class: "btn btn-danger del-btn",
            text: "Delete"
            //student_index:
        });
        var nRow = $('<tr>', {
            id: "tableBody"
        });
        $(nRow).append(nName, nCourse, nGrade, deleteB);
        $('#tableBody').append(nRow);
    }
}
/**
 * Set up and add #studentName/#course/#studentGrade to DOM
 */
function addClick() {
    $("#addClicked").click(function () {
        var student_name_input = $("#studentName").val();
        $("#studentName").val(student_name_input);
        var student_course_input = $("#course").val();
        $("#course").val(student_course_input);
        var student_grade_input = $("#studentGrade").val();
        $("#studentGrade").val(student_grade_input);

        var student_object = {
            name: student_name_input,
            course: student_course_input,
            grade: student_grade_input
        };
        student_array.push(student_object);
        studentToServer(student_object);
        //console.log(student_array);
        gradeAverage();

        /**
         * dynamically creates student grade table and appends to body
         */
        for (var i = 0; i < student_array.length; i++) {

            if (student_array[i]) {
                var nName = $('<td>', {
                    text: student_array[i].name
                });

                var nCourse = $('<td>', {
                    text: student_array[i].course
                });
                var nGrade = $('<td>', {
                    text: student_array[i].grade
                });

                var deleteB = $('<button>', {
                    type: "button",
                    class: "btn btn-danger del-btn",
                    text: "Delete",
                    student_index: i
                });
            }
        }
        var nRow = $('<tr>', {
            id: "tableBody"
        });
        $('#tableBody').prepend(nRow);
        $(nRow).append(nName, nCourse, nGrade, deleteB);
    });
}

/**
 * this will clear out the AddStudentForm
 */
function cancelClicked() {
    $("#clickCancel").click(function () {
        $("#studentName").val('');
        $("#course").val('');
        $("#studentGrade").val('');
    });
}

/**
 * grade average function call calculates correct average of input;
 * @returns {number}
 */
function gradeAverage() {
    var sum = 0;
    var average = 0;
    var count = 0;
    for (var i = 0; i < student_array.length; i++) {

        if (student_array[i]) {
            count++;
            sum += parseInt(student_array[i].grade);
        }
    }
    average = sum / count;
    $(".avgGrade").text(Math.round(average));
    return average;
}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    updateStudentList();
    gradeAverage();
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    for (var list = 0; list < student_array.length; list++) {
        $("#tableBody").empty();
    }

    /**
     * set global variables to 0
     */
    function reset() {
        student_name_input = 0;
        student_course_input = 0;
        student_grade_input = 0;
        student_grade_average = 0;
        updateData();
        updateStudentList()
    }
    reset();
}
