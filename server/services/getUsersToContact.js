import { getDB } from "../mockupData.js";
import store from "../store.js";

function getUsersToContact() {
  console.log("Store ahora: ", store);
  const mockupData = getDB();
  const users = mockupData.users;

  return users.filter((user) => {
    const userBites = mockupData.bites.filter(
      (bite) => bite.user_id === user.id
    );

    console.log("userBites", userBites);

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
}

export default getUsersToContact;
