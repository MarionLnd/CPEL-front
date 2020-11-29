//import Dashboard from "./components/Dashboards/Dashboard";
import ProfileStudent from "./components/Student/Profile";
import Login from "./components/Student/Login";
import Exercise from "./components/Student/Exercise";
import Course from "./components/Student/Course";
import CourseContent from "./components/Student/CourseContent";
import ExerciceContent from "./components/Student/ExerciceContent";
import TD from "./components/Student/TD";
import Notifications from "./components/Student/Notifications";
import StudentRendering from "./components/Student/StudentRendering";

// Register
import Register from "@/components/Register";

// Professor
import Dashboard from "@/components/Professsors/Dashboards/Dashboard";
import Profile from "@/components/Professsors/DetailsPages/Profile";
import CreateExercise from "@/components/Professsors/CreatePages/CreateExercise";
import CreateGroup from "@/components/Professsors/CreatePages/CreateGroup";
import CreateCorrection from "@/components/Professsors/CreatePages/CreateCorrection";
import EditCorrection from "@/components/Professsors/EditPages/EditCorrection";
import EditExercise from "@/components/Professsors/EditPages/EditExercise";
import EditGroup from "@/components/Professsors/EditPages/EditGroup";
import Module from "@/components/Professsors/DetailsPages/Module";
import Group from "@/components/Professsors/DetailsPages/Group";
import ExercisePage from "@/components/Professsors/DetailsPages/Exercice";
import StudentPage from "@/components/Professsors/DetailsPages/Student";
import CreateModule from "@/components/Professsors/CreatePages/CreateModule";
import StudentRending from "@/components/Professsors/DetailsPages/StudentRending";
import CreateTD from "@/components/Professsors/CreatePages/CreateTD";
import TDProf from "@/components/Professsors/DetailsPages/TD";

// Admin
import DashboardAdmin from "@/components/Admin/Dashboard/Dashboard";
import ProfileAdmin from "@/components/Admin/DetailsPages/Profile";
import AddProfessor from "@/components/Admin/CreatePages/AddProfessor";
import AddStudent from "@/components/Admin/CreatePages/AddStudent";
import AddGroup from "@/components/Admin/CreatePages/AddGroup";
import EditProfessor from "@/components/Admin/EditPages/EditProfessor";
import EditStudent from "@/components/Admin/EditPages/EditStudent";
import EditGroupAdmin from "@/components/Admin/EditPages/EditGroup";
import ProfessorAdmin from "@/components/Admin/DetailsPages/Professor";
import StudentAdmin from "@/components/Admin/DetailsPages/Student";
import GroupAdmin from "@/components/Admin/DetailsPages/Group";

export default [
    //{path: '/', component: Login},

    {path: '/login', component: Login },
    {path: '/tableau-de-bord', component: Course },
    {path: '/profil', component: ProfileStudent },
    {path: '/course',component: Course},
    {path: '/exercise', component: Exercise },
    {path: '/td', component: TD },
    {path: '/courseContent/:id', component: CourseContent },
    {path: '/exerciceContent/:id', component: ExerciceContent },
    {path: '/notifications', component: Notifications },
    {path: '/rendering', component: StudentRendering },

    // Register
    {path: '/inscription/', component: Register },

    // Professor interface
    {path: '/professeur/', component: Dashboard },
    {path: '/professeur/tableau-de-bord', component: Dashboard },
    {path: '/professeur/profil', component: Profile },
    {path: '/professeur/creer-exercice', component: CreateExercise },
    {path: '/professeur/creer-td', component: CreateTD },
    {path: '/professeur/creer-groupe', component: CreateGroup },
    {path: '/professeur/creer-correction', component: CreateCorrection },
    {path: '/professeur/creer-module', component: CreateModule },
    {path: '/professeur/editer-correction/:idCorrection', component: EditCorrection, props: (route) => ({ query: route.query.idCorrection}) },
    {path: '/professeur/editer-exercice/:idExercice', component: EditExercise },
    {path: '/professeur/editer-groupe/:idGroup', component: EditGroup },
    {path: '/professeur/module/:idModule', component: Module },
    {path: '/professeur/td/:idTD', component: TDProf },
    {path: '/professeur/groupe/:idGroup', component: Group },
    {path: '/professeur/:idModule/exercice/:idExercise', component: ExercisePage },
    {path: '/professeur/etudiant/:idStudent', component: StudentPage, props: (route) => ({ query: route.query.groupName })},
    {path: '/professeur/etudiant/:idStudent/rendu-exercice/:idExercise', component: StudentRending, props: (route) => ({ query: route.query.idStudentRending })},

    // Admin interface
    {path: '/admin/', component: DashboardAdmin },
    {path: '/admin/tableau-de-bord', component: DashboardAdmin },
    {path: '/admin/profil', component: ProfileAdmin },
    {path: '/admin/ajouter-professeur', component: AddProfessor },
    {path: '/admin/ajouter-etudiant', component: AddStudent },
    {path: '/admin/ajouter-groupe', component: AddGroup },
    {path: '/admin/gerer-professeurs/:idProfessor', component: EditProfessor },
    {path: '/admin/gerer-etudiants/:idStudent', component: EditStudent },
    {path: '/admin/gerer-groupes/:idGroup', component: EditGroupAdmin },
    {path: '/admin/professeur/:idProfessor', component: ProfessorAdmin },
    {path: '/admin/etudiant/:idStudent', component: StudentAdmin },
    {path: '/admin/groupe/:idGroup', component: GroupAdmin },
    {path: '/admin/professeur/:idProfessor', component: Dashboard },
    {path: '/admin/etudiant/:idStudent', component: Dashboard },
    {path: '/admin/groupe/:idGroup', component: Dashboard },
    
]
