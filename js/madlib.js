var studentList = [];
const student = {
    name: "",
    index: 0,
    intelligence: 1,
    UI: function UI() {
        console.log("student.index = " + this.index);
        document.getElementById("student").innerHTML += `${this.name} went to class?<br>`;
        console.log(this.name);
        `Display ${this.name} intelligence: ${this.intelligence}<br>`;
    },
    attendClass: function attendClass(index) {
        this.intelligence *= 5;
        document.getElementById("person").innerHTML += `${this.name} went to class! YAY<br>`;
    },
    displayIntelligence: function displayIntelligence() {
        console.log("intelligence = " + this.intelligence);
        document.getElementById('person').innerHTML +=
            `${this.name} intelligence is ${this.intelligence}<br>`;
    }
};

function newStudent() {
    var inputName = document.getElementById("name").value;
    console.log("inputName = " + inputName);
    studentList.push(Object.create(student));
    studentList[studentList.length - 1].index = (studentList.length - 1);
    studentList[0].name = "Bob";
    console.log("studentList = " + studentList[0].name + " index= " +
        studentList[0].index);
    studentList[studentList.length - 1].name = inputName;

    studentList[studentList.length - 1].UI();
    studentList[studentList.length - 1].attendClass();
    studentList[studentList.length - 1].displayIntelligence();

}