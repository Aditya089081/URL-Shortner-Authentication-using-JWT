export const handleLogout = (req,res)=>{
    res.clearCookie('uid');
    res.redirect("/");
}