import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import Question from "../../../components/Question/Question";

import CharacterTrait from "../../../services/admin/generatorData/characterTrait/characterTrait";

function TraitAdmin() {
  const [role] = useLocalStorage("role");
  const isAdmin = role === "ADMIN";
  // const tabs = [
  //   {
  //     label: "Artificer",
  //     component: <Question type={ClassTrait} className="Artificer" />,
  //   },

  // ];
  return (
    <>
      {isAdmin && (
        <section className="admin-section" style={{ marginTop: "6rem" }}>
          <Question type={CharacterTrait} />
        </section>
      )}
      {!isAdmin && <p>You are not authorized to access this page.</p>}
    </>
  );
}

export default TraitAdmin;
