export default ({ redirect, $strapi }) => {
    if ($strapi.user) {
        return redirect('/')
    }
}