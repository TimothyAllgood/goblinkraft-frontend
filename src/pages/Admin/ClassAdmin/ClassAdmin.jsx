import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import Question from "../../../components/Question/Question";
import Tabs from "../../../components/Tabs/Tabs";
import ClassTrait from "../../../services/admin/generatorData/classTrait/classTrait";

function ClassAdmin() {
  const [role] = useLocalStorage("role");
  const isAdmin = role === "ADMIN";
  const tabs = [
    {
      label: "Artificer",
      component: <Question type={ClassTrait} className="Artificer" />,
    },
    {
      label: "Barbarian",
      component: <Question type={ClassTrait} className="Barbarian" />,
    },
    {
      label: "Bard",
      component: <Question type={ClassTrait} className="Bard" />,
    },
    {
      label: "Cleric",
      component: <Question type={ClassTrait} className="Cleric" />,
    },
    {
      label: "Druid",
      component: <Question type={ClassTrait} className="Druid" />,
    },
    {
      label: "Fighter",
      component: <Question type={ClassTrait} className="Fighter" />,
    },
    {
      label: "Monk",
      component: <Question type={ClassTrait} className="Monk" />,
    },
    {
      label: "Paladin",
      component: <Question type={ClassTrait} className="Paladin" />,
    },
    {
      label: "Rogue",
      component: <Question type={ClassTrait} className="Rogue" />,
    },
    {
      label: "Ranger",
      component: <Question type={ClassTrait} className="Ranger" />,
    },
    {
      label: "Sorcerer",
      component: <Question type={ClassTrait} className="Sorcerer" />,
    },
    {
      label: "Warlock",
      component: <Question type={ClassTrait} className="Warlock" />,
    },
    {
      label: "Wizard",
      component: <Question type={ClassTrait} className="Wizard" />,
    },
  ];
  return (
    <>
      {isAdmin && (
        <section className="admin-section" style={{ marginTop: "6rem" }}>
          <Tabs tabs={tabs} />
        </section>
      )}
      {!isAdmin && <p>You are not authorized to access this page.</p>}
    </>
  );
}

export default ClassAdmin;
