const fcs = ['https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13733', 
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13697', 
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13698',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13699',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13700',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13701',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13702',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13703',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13704',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13705',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13706',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13707',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13708',
'https://fbschedules.com/wp-admin/admin-ajax.php?action=load_fbschedules_ajax&type=NCAA&display=current&team=&current_season=2022&view=weekly&conference=&conference-division=&ncaa-subdivision=fcs&ispreseason=&current-page-type=&is_spring_week_only=&pid=51619&schedule-week=week-13709',
]

const fbs = "https://api.sportsdata.io/v3/cfb/scores/json/Games/2022";

const authFbs = {
    method: "GET",
    headers: {
    "Ocp-Apim-Subscription-Key": process.env.FBS_API_KEY
}
};

module.exports = {
    fcsEndpoints, fbsEndpoints, fbsAuth
}

function fcsEndpoints () {
    return fcs
}
function fbsEndpoints () {
    return fbs
}
function fbsAuth () {
    return authFbs
}