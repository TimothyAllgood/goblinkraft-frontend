import React, { useEffect, useState } from "react";
import Tavern from "../../../services/generator/tavern.service";
import "./TavernPage.css";
import NPC from "../NPCPage/NPC/NPC";
import Button from "../../../components/Button/Button";

function TavernPage() {
  const [tavern, setTavern] = useState({});
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    fetchTavern();
  }, []);

  const fetchTavern = async () => {
    setGenerating(true);
    let res = await Tavern.generateTavern();
    setTavern(res);
    setGenerating(false);
  };
  return (
    <div className="tavern-page container">
      <div className="tavern-page-header">
        <div className="tavern-buttons">
          <Button onClick={fetchTavern} variant="dark" disabled={generating}>
            {generating ? "Generating..." : "Visit Another Tavern"}
          </Button>
        </div>
      </div>
      <div className="tavern-heading">
        <div className="tavern-intro">
          <h2>Welcome to...</h2>
          <div className="tavern-sign">
            <h2>{tavern.name}</h2>
          </div>
          <div className="tavern-description">
            <h3>A most {tavern.quality} establishment</h3>
          </div>
        </div>
      </div>
      <div className="tavern-info">
        <div className="bartender">
          {tavern.barTender && (
            <>
              {/* <h2>Your Bartender for the evening:</h2> */}
              <NPC
                key={tavern?.barTender.name}
                npc={tavern?.barTender}
                disableActivity={true}
                hideButtons
                hideImage
              />
            </>
          )}
        </div>
        <div className="tavern-info-container">
          <div className="tavern-events tavern-detail">
            <div className="tavern-detail-header">
              <h3>General Atmopshere</h3>
            </div>
            <div className="event card-bg">
              <p>{tavern.tavernAtmosphere?.info}</p>
            </div>
          </div>
          <div className="tavern-events tavern-detail">
            <div className="tavern-detail-header">
              <h3>Tonight's Main Event</h3>
            </div>
            <div className="event card-bg">
              <p>{tavern.tavernEvent?.info}</p>
            </div>
          </div>
          <div className="tavern-feature tavern-detail">
            <div className="tavern-detail-header">
              <h3>Unique Feature</h3>
            </div>
            <div className="event card-bg">
              <p>{tavern.tavernFeature?.info}</p>
            </div>
          </div>
          <div className="tavern-events tavern-detail">
            <div className="tavern-detail-header">
              <h3>Rumors</h3>
            </div>
            <div className="event card-bg">
              <p>{tavern.tavernRumor?.name} </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tavern-menu">
        <div className="food">
          <div className="tavern-menu-header">
            <h3>Food</h3>
          </div>
          <div className="tavern-menu-container card-bg">
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
        </div>
        <div className="drinks">
          <div className="tavern-menu-header">
            <h3>Drinks</h3>
          </div>
          <div className="tavern-menu-container card-bg">
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
      <div className="patrons">
        <h3>Some interesting patrons tonight...</h3>
        <div className="people">
          {tavern.patrons?.length > 0 &&
            tavern.patrons.map((patron) => {
              return (
                <NPC key={patron.name} npc={patron} hideButtons hideImage />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default TavernPage;
