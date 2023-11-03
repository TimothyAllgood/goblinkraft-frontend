import { ReactSVG } from "react-svg";
import "./Index.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import User from "../../services/user.service";
import { useDispatch } from "react-redux";
import { login } from "../../state/userSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Index() {
  const { search } = useLocation();
  const { setItem } = useLocalStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let query = useMemo(() => new URLSearchParams(search), [search]);

  useEffect(() => {
    if (query.get("code")) {
      getGoogleUserInfo();
    }
  }, []);

  const getGoogleUserInfo = async () => {
    let res = await User.getGoogleUserInfo(query.get("code"));

    if (res) {
      setItem("token", res.token);
      await dispatch(login(res.token));
      navigate("/");
    }
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <ReactSVG className="logo" src="./src/assets/logo.svg" />
      </div>
      <div className="home-info">
        <p>
          Prepare to embark on a gobsmacking adventure like no other! Welcome to
          Goblinkraft, where mystical dungeons and mischievous goblins collide
          to craft the quirkiest Dungeons and Dragons backstories. Your
          character's fate awaits! Roll the dice of destiny, claim your spot in
          our fantastical realm, and let the goblicious fun begin!
        </p>
        <p>
          Trust us, you don't want to miss out on this goblin-infested
          storytelling extravaganza. Join Goblinkraft now and prepare to gobble
          up some legendary tales!
        </p>
        {/* <div className="button-container">
          <button>Sign In</button>
          <button>Sign Up</button>
        </div> */}
      </div>
    </div>
  );
}
