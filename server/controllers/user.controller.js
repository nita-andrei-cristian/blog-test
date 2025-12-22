import VISITS from "../databases/visits.js";

export function getUser(req, res) {
  res.json(req.session.user);
}

export function getUserData(req, res) {
  const session = req.session;

  const user = session.user.name;

  if (!VISITS[user]) {
    VISITS[user] = {};
  }

  return res.json({ visits: VISITS[user], isLogged : true, name : user });
}

export function getStatus(req, res) {
  res.json({
    loggedIn: !!req.session.user,
    user: req.session.user || null,
  });
}

