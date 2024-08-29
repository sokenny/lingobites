import db from "../models/index.js";
import { Op } from "sequelize";
import { client as redisClient } from "../lib/cache/index.js";
// import store from "../store.js";

async function getUsersToContact() {
  // Fetch users with untranslated bites
  const usersToContact = await db.User.findAll({
    include: [
      {
        model: db.Bite,
        as: "bites",
        where: {
          translated_at: null,
          [Op.or]: [
            { delivered_at: null },
            {
              delivered_at: {
                [Op.lt]: new Date(new Date() - 8 * 60 * 60 * 1000),
              },
            },
          ],
        },
      },
    ],
  });

  // Map over users and check conditions asynchronously
  const checks = usersToContact.map(async (user) => {
    const userBites = user.bites;
    const userHasNoBites = userBites.length === 0;
    const userHasUntranslatedBites = userBites.some(
      (bite) => bite.translated_at === null
    );

    let inProgressBite = await redisClient.get(`in-progress-bites:${user.id}`);

    const userHasNoInProgressBite = !inProgressBite;

    if (
      userHasNoBites ||
      !userHasUntranslatedBites ||
      (userHasUntranslatedBites && userHasNoInProgressBite)
    ) {
      return user; // Return the user if conditions are met
    }
  });

  const filteredUsers = (await Promise.all(checks)).filter(
    (user) => user !== undefined
  );

  return filteredUsers;
}

export default getUsersToContact;
