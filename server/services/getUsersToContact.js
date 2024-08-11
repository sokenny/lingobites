import db from "../models/index.js";
import { Op } from "sequelize";
import store from "../store.js";

async function getUsersToContact() {
  console.log("Store ahora: ", store);

  const usersToContact = await db.User.findAll({
    include: [
      {
        model: db.Bite,
        as: "bites",
        where: {
          translated_at: null,
          [Op.or]: [
            {
              delivered_at: null,
            },
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

  const filteredUsers = usersToContact.filter((user) => {
    const userBites = user.bites;
    const userHasNoBites = userBites.length === 0;
    const userHasUntranslatedBites = userBites.some(
      (bite) => bite.translated_at === null
    );
    const userHasNoInProgressBite = !store["in-progress-bites"][user.id];

    console.log("userHasNoInProgressBite: ", userHasNoInProgressBite);
    console.log("userHasUntranslatedBites: ", userHasUntranslatedBites);

    return (
      userHasNoBites ||
      !userHasUntranslatedBites ||
      (userHasUntranslatedBites && userHasNoInProgressBite)
    );
  });

  return filteredUsers;
}

export default getUsersToContact;
