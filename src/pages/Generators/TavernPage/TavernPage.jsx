import React, { useEffect, useState } from "react";
import "./TavernPage.css";
import Tavern from "../../../services/generator/tavern.service";
import { Button, Divider } from "@mui/material";
import NPC from "../NPCList/NPC/NPC";

function TavernPage() {
  const [tavern, setTavern] = useState({});

  useEffect(() => {
    fetchTavern();
  }, []);

  const fetchTavern = async () => {
    let res = await Tavern.generateTavern();
    setTavern(res);
    console.log(res);
  };
  return (
    <>
      <div className="button-container">
        <Button variant="contained" onClick={fetchTavern}>
          Roll New Tavern
        </Button>
      </div>
      <section className="tavern-page">
        <div className="tavern-header">
          <div className="name">
            <h3>{tavern.name}</h3>
          </div>
          <p className="capitalize italics">{tavern.quality}</p>
        </div>
        <Divider />
        <div className="tavern">
          <div className="bar">
            <div className="bartender">
              {tavern.barTender && (
                <>
                  <h2>Bartender</h2>
                  <NPC
                    key={tavern?.barTender.name}
                    npc={tavern?.barTender}
                    disableActivity={true}
                  />
                </>
              )}
            </div>
            <div className="menu-items">
              <div className="food">
                <h3>Food</h3>
                {tavern.menu?.food?.map((item, i) => {
                  return (
                    <div key={i} className="menu-item">
                      <div className="name-price">
                        <p className="bold">{item.name}</p>
                        <p className="price">{item.price}</p>
                      </div>
                      <div className="menu-description">
                        <p className="italics">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="drinks">
                <h3>Drinks</h3>
                {tavern.menu?.drinks?.map((item, i) => {
                  return (
                    <div key={i} className="menu-item">
                      <div className="name-price">
                        <p className="bold">{item.name}</p>
                        <p className="price">{item.price}</p>
                      </div>
                      <div className="menu-description">
                        <p className="italics">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="tavern-details">
            <div className="tavern-info">
              <div className="tavern-events">
                <h3>General Atmopshere</h3>
                <div className="event">
                  <p>{tavern.tavernAtmosphere?.info}</p>
                </div>
              </div>
              <div className="tavern-events">
                <h3>Tonight's Main Event</h3>
                <div className="event">
                  <p>{tavern.tavernEvent?.info}</p>
                </div>
              </div>
              <div className="tavern-feature">
                <h3>Unique Feature</h3>
                <div className="event">
                  <p>{tavern.tavernFeature?.info}</p>
                </div>
              </div>
              <div className="tavern-events">
                <h3>Rumors</h3>
                <div className="event">
                  <p className="bold">{tavern.tavernRumor?.name} </p>
                </div>
              </div>
            </div>
            <Divider />
            <div className="patrons">
              <h3>Notable Patrons</h3>
              <div className="people">
                {tavern.patrons?.length > 0 &&
                  tavern.patrons.map((patron) => {
                    return (
                      <NPC
                        key={patron.name}
                        npc={patron}
                        disableActivity={true}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TavernPage;
