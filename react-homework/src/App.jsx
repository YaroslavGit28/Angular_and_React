import Header from "./components/Header";
import StudentList from "./components/StudentList";
import StatCard from "./components/StatCard";
import Footer from "./components/Footer";

import { students } from "./data/students";

function App() {

    const totalStudents = students.length;

    const average =
        students.reduce((sum, s) => sum + s.gpa, 0) /
        totalStudents;

    const youngest =
        Math.min(...students.map(s => s.age));

    const cities =
        new Set(students.map(s => s.city)).size;

    return (

        <div className="container">

            <Header />

            <div className="stats">

                <StatCard
                    icon="🎓"
                    label="Студентов"
                    value={totalStudents}
                />

                <StatCard
                    icon="⭐"
                    label="Средний балл"
                    value={average.toFixed(2)}
                />

                <StatCard
                    icon="👶"
                    label="Возраст"
                    value={youngest}
                />

                <StatCard
                    icon="🏙️"
                    label="Городов"
                    value={cities}
                />

            </div>

            <StudentList
                students={students}
                sortBy="gpa"
            />

            <Footer />

        </div>

    );

}

export default App;