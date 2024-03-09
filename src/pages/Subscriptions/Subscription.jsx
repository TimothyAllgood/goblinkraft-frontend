import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./Subscription.css";

function Subscription() {
  const standardPriceId = "price_1Oa1xZCnGy8JPFhxJgkM625r";
  const premiumPriceId = "price_1Oa1xOCnGy8JPFhxXxe9RCZ3";
  return (
    <section className="subscriptions">
      <Box className="subscription">
        <div className="subscription-name">
          <Typography>Standard</Typography>
        </div>
        <div className="price">$5.00</div>
        <div className="info">
          <div className="info-item active-benefit">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 1</Typography>
          </div>
          <div className="info-item active-benefit">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 2</Typography>
          </div>
          <div className="info-item">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 3</Typography>
          </div>
          <div className="info-item">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 4</Typography>
          </div>
          <div className="info-item ">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 5</Typography>
          </div>
        </div>
        <div className="btn">
          <Button
            variant="contained"
            href={`/subscribe/checkout/${standardPriceId}`}
          >
            Subscribe
          </Button>
        </div>
      </Box>
      <Box className="subscription">
        <div className="subscription-name">
          <Typography>Premium</Typography>
        </div>
        <div className="price">$10.00</div>
        <div className="info">
          <div className="info-item active-benefit">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 1</Typography>
          </div>
          <div className="info-item active-benefit">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 2</Typography>
          </div>
          <div className="info-item active-benefit">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 3</Typography>
          </div>
          <div className="info-item active-benefit">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 4</Typography>
          </div>
          <div className="info-item active-benefit">
            <Icon>
              <CheckIcon />
            </Icon>
            <Typography>Lorem Ipsum 5</Typography>
          </div>
        </div>
        <div className="btn">
          <Button
            variant="contained"
            href={`/subscribe/checkout/${premiumPriceId}`}
          >
            Subscribe
          </Button>
        </div>
      </Box>{" "}
    </section>
  );
}

export default Subscription;
