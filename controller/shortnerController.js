// controller/shortnerController.js
import { nanoid } from "nanoid";
import { saveLink, getLinkByShortCode, getLinksByUser } from "../model/modelController.js";

export const renderHome = async (req, res) => {
  try {
    const user = res.locals.user;
    if(!user){
      return res.render("index", { links:[], shortUrl: null, user:null });
    }
    const links = await getLinksByUser(user.id);
    res.render("index", { links, shortUrl: null, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const handleShortner = async (req, res) => {
  const { url, shorten } = req.body;
  const shortId = shorten && shorten.trim() !== "" ? shorten.trim() : nanoid(6);


  try {
    const user = res.locals.user;
    if (!user) {
      req.flash("errors", "Please login first");
      return res.redirect("/login");
    }

    await saveLink({
      shortcode: shortId,
      url,
      user_id: user.id,
    });

    const host = req.headers.host;
    const shortUrl = `http://${host}/${shortId}`;

    // fetch updated links
    const links = await getLinksByUser(user.id);

    res.render("index", { links, shortUrl, user });
  } catch (err) {
    console.error("Error saving link:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const handleRedirect = async (req, res) => {
  const { shortId } = req.params;
  const link = await getLinkByShortCode(shortId);

  if (!link) return res.status(404).send("Short URL not found");
  res.redirect(link.url);
};

export const getMe = (req, res) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).send(`
      <h1>You are not logged in</h1>
      <a href="/login">Go to Login</a>
    `);
  }
  res.render("profile", { user });
};
