<template>
    <div>
        <Header />

        <h1 class="pt-3 pb-3">Tableau de bord - Administrateur</h1>

        <ProfessorDashboard class="pb-3"/>
        <StudentDashboard class="pb-3" />
        <GroupDashboard />
    </div>
</template>

<script>
import ProfessorDashboard from "@/components/Admin/Dashboard/ProfessorDashboard";
import StudentDashboard from "@/components/Admin/Dashboard/StudentDashboard";
import GroupDashboard from "@/components/Admin/Dashboard/GroupDashboard";
import Header from "@/components/Admin/Header";

export default {
    name: "Dashboard",
    components: {StudentDashboard, ProfessorDashboard, GroupDashboard, Header}
}
</script>

<style scoped>

</style>
