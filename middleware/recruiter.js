export default ({ redirect, $strapi }) => {
    if (!$strapi.user || $strapi.user.role.name != 'Recruiter') {
        return redirect('/')
    }
}