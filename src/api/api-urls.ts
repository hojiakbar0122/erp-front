export class ApiUrls{
    // AUTH
    public static AUTH:string="/log-in"

    // GET GROUPS
    public static GROUPS:string="/group"

    // COURSE
    public static COURSE:string="/courses"

    // BRANCH
    public static BRANCH:string="/branches"

    // TEACHER
    public static TEACHER:string="/teacher"

    // STUDENTS
    public static STUDENTS:string="/students"

    // GROUP TEACHERS
    public static GROUP_TEACHERS: string = "/group-teachers";
    public static GROUP_TEACHERS_BY_GROUP_ID: string = this.GROUP_TEACHERS + "/by-group";

    // GROUP STUDENTS
    public static GROUP_STUDENTS: string = "/group-students";
    public static GROUP_STUDENTS_BY_GROUP_ID: string = this.GROUP_STUDENTS + "/by-group";

}