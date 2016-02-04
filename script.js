/**
 * Define all global variables here
 */
//Here, I'm setting up all the possible global variables that could exist, and that could be useful moving forward

var student_name_input;
var student_course_input;
var student_grade_input;
var student_grade_average;
var global_result;
/**
 * define global array that will hold the student objects (created separately)
 * @type {Array}
 */
var student_array = [];


/**
 * Here, we are going to use a function called addClick to handle all events when the add button is clicked.
 * by adding a cancelClicked() into the document.ready, I ensure that it will load after all other events have subsided
 * prevents double adding data upon clicking add button
 */
$(document).ready(function () {
    addClick();
    cancelClicked();
    sgtOnload();


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
 * here is the function to pull from the server
 */
function sgtOnload() {
    console.log("hi dan");
    $.ajax({
        dataType: 'json',
        data: {
            api_key: "FvFMoid4Gy"
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

            //global_result.feed.entry[0]["im:image"][2].label;
            //var movie = global_result["feed"]["entry"];
            //for (i = 0; i < movie.length; i++) {
            //    var img = $("<img>",{
            //        src: movie[i]["im:image"][2]["label"]
            //    });
            //    var titleDir = $("<div>", {
            //        html: movie[i]["title"]["label"],
            //        html: movie[i]["im:artist"]["label"]
            //    });
            //    $("#main").append(img);
            //    $("#main").append(titleDir);
        }

        //}
    });
}
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
            text: "Delete",
            //student_index:
        });
        var nRow = $('<tr>', {
            id: "tableBody"
        });
        $('#tableBody').prepend(nRow);
        $(nRow).append(nName, nCourse, nGrade, deleteB);
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
        console.log(student_array);
        gradeAverage();
        /**
         *  define student object, append to DOM
         */

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
/**
 * grade average function call calculates correct average of input;
 * however, in the console, the value for sum and average come up as undefined. check up on this
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
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    updateStudentList();
    gradeAverage();
};
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    for (var list = 0; list < student_array.length; list++) {
        $("#tableBody").empty();
    }
    /**
     * addStudentToDom - take in a student object, create html elements from the values and then append the elements
     * into the .student_list tbody
     * @param studentObj
     */

    /**
     * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
     */

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
    };
    reset();
}


/**
 * Listen for the document to load and reset the data to the initial state
 */