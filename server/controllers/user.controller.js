import { readVisits, writeVisits } from "../databases/visits.js";

export function getUser(req, res) {
  res.json(req.session.user);
}

export function getUserData(req, res) {
  const session = req.session;

  const user = session.user.name;

  const visits = readVisits();

  if (!visits[user]) {
    visits[user] = {};
    writeVisits(visits);
  }

  return res.json({ visits: visits[user], isLogged : true, name : user });
}

export function getStatus(req, res) {
  res.json({
    loggedIn: !!req.session.user,
    user: req.session.user || null,
  });
}
