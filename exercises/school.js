function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      console.log(this.courses);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseNumber, note) {
      let course = this.courses.find(course => {
        return course.code === courseNumber;
      });

      if (course.hasOwnProperty("note")) {
        course.note = course.note + "; " + note;
      } else {
        course.note = note;
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.hasOwnProperty("note")) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseNumber, note) {
      let course = this.courses.find(course => {
        return course.code === courseNumber
      });
      course.note = note;
    }
  };
}

function school() {
  return {
    students: [],


    addStudent(name, year) {
      const VALID_YEARS = ["1st", "2nd", "3rd", "4th", "5th"];
      if (VALID_YEARS.includes(year)) {
        this.students.push(createStudent(name, year));
      } else {
        console.log("Invalid Year");
      }

    },

    enrollStudent(studentName, course) {
      let student = this.getStudent(studentName);
      student.addCourse(course);
    },

    addGrade(studentName, courseNumber, grade) {
      let student = this.getStudent(studentName);
      let course = student.courses.find(course => {
        return course.code === courseNumber;
      });

      course.grade = grade;
    },

    getStudent(studentName) {
      return this.students.find(student => {
        return student.name === studentName;
      });
    },

    getReportCard(studentName) {
      let student = this.getStudent(studentName);
      student.courses.forEach(course => {
        if (course.hasOwnProperty("grade")) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In Progress`);
        }
      });

    },

    courseReport(courseName) {
      console.log(`=${courseName} Grades=`);

      let grades = [];
      this.students.forEach(student => {

        let course = student.courses.find(course => {
          return course.name === courseName;
        });

        if (course) {
          grades.push(course.grade);
          console.log(`${student.name}: ${course.grade}`);
        }

      });
      console.log("---");
      console.log(`Course Average: ${grades.reduce((accum, curr) => accum + curr) / grades.length}`);


    },
  }
}

let aliso = school();
aliso.addStudent("foo", "3rd");
aliso.addStudent("bar", "1st");
aliso.addStudent("qux", "2nd");
aliso.enrollStudent("foo", { name: 'Math', code: 101 });
aliso.enrollStudent("foo", { name: 'Advanced Math', code: 102 });
aliso.enrollStudent("foo", { name: 'Physics', code: 202 });

aliso.enrollStudent("bar", { name: 'Math', code: 101 });

aliso.enrollStudent("qux", { name: 'Math', code: 101 });
aliso.enrollStudent("qux", { name: 'Advanced Math', code: 102 });

aliso.addGrade("foo", 101, 95);
aliso.addGrade("foo", 102, 90);

aliso.addGrade("bar", 101, 91);

aliso.addGrade("qux", 101, 93);
aliso.addGrade("qux", 102, 60);

// aliso.getReportCard("qux");

aliso.courseReport("Physics");



