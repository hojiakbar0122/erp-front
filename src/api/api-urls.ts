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

    // ADMIN
    public static ADMIN:string="/admin"

    // ADMIN_PROFILE
    public static ADMIN_PROFILE:string="/admin/profile"

    // ADMIN_CHANGE_PASSWORD
    public static ADMIN_CHANGE_PASSWORD:string="/admin/change-password"

    // GROUP TEACHERS
    public static GROUP_TEACHERS: string = "/group-teachers";
    public static GROUP_TEACHERS_BY_GROUP_ID: string = this.GROUP_TEACHERS + "/by-group";

    // GROUP STUDENTS
    public static GROUP_STUDENTS: string = "/group-students";
    public static GROUP_STUDENTS_BY_GROUP_ID: string = this.GROUP_STUDENTS + "/by-group";

}