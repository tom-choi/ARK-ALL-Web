export const umAPI = {
    news:"https://api.data.um.edu.mo/service/media/news/v1.0.0/all",
    events: "https://api.data.um.edu.mo/service/media/events/v1.0.0/all",
    token:"Bearer b3d1931f-f419-390f-9884-80b2326497bf"
}

export const baseURL = "https://umall.one";

export const umallAPI = {
    activities: baseURL + "/api/get_activity/",
    organizations: baseURL + "/api/get_club_info/",
    getClub : baseURL + "/api/get_club_info/club_num/?club_num=",
    getAppInfo : baseURL + "/api/get_appInfo/",
    activitiesByClub : baseURL + "/api/get_activity/club_num/?club_num="
}