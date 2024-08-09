import React from "react";
import "./SwordDivider.css";

function SwordDivider() {
  return (
    <div className="sword-divider">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_2"
        data-name="Layer 2"
        viewBox="0 0 49.57 50.18"
        className="sword sword-left"
      >
        <defs>
          <style>
            {`.cls-1,
                                .cls-2 {
                                    stroke: #000;
                                    stroke-miterlimit: 10;
                                    stroke-width: .5px;
                                }

                                .cls-2 {
                                    fill: none;
                                }`}
          </style>
        </defs>
        <g id="Layer_1-2" data-name="Layer 1">
          <g>
            <g>
              <path
                className="cls-2 blade"
                d="M13.75,16.47l1.84-1,.95-1.79,31.33,32.79c.2.21.36.47.45.75l.86,2.57-2.58-.8c-.31-.1-.59-.27-.82-.5L13.75,16.47Z"
              ></path>
              <polygon
                className="cls-2 grip"
                points="12.83 15.65 13.7 16.53 15.57 15.43 16.59 13.64 15.72 12.76 14.66 14.53 12.83 15.65"
              ></polygon>
              <rect
                className="cls-1"
                x="8.45"
                y="6.43"
                width="2.12"
                height="6.02"
                transform="translate(-3.89 9.49) rotate(-45)"
              ></rect>
              <path
                className="cls-2 not-blade"
                d="M14.56,14.44l-1.23.84-1.02.7c-.15.1-.29.22-.42.35l-3.35,3.35c-.13.13-.35.13-.48,0l-.15-.15c-.13-.13-.13-.35,0-.48l2.01-2.01c.52-.52.92-1.14,1.19-1.82l.08-.2c.17-.44.23-.92.15-1.38h0c-.11-.71-.44-1.36-.94-1.87l-3.8-3.8-.08-.08-.2-.2-.11-.11-2.62-2.62c-.22-.22-.52-.32-.83-.28l-.14.02c-.23-.02-.76-.54-.76-.77h0c.16-.3.37-.58.61-.82l.39-.39"
              ></path>
              <path
                className="cls-2 not-blade"
                d="M14.5,14.5l.84-1.23.7-1.02c.1-.15.22-.29.35-.42l3.35-3.35c.13-.13.13-.35,0-.48l-.15-.15c-.13-.13-.35-.13-.48,0l-2.01,2.01c-.52.52-1.14.92-1.82,1.19l-.2.08c-.44.17-.92.23-1.38.15h0c-.71-.11-1.36-.44-1.87-.94L5.03,3.53c-.22-.22-.32-.52-.28-.83l.02-.14c-.02-.23-.54-.76-.77-.76h0c-.3.16-.58.37-.82.61l-.39.39"
              ></path>
              <circle
                className="cls-2 not-blade"
                cx="1.7"
                cy="1.7"
                r="1.45"
              ></circle>
            </g>
            <line
              className="cls-2"
              x1="15.57"
              y1="15.5"
              x2="49.15"
              y2="49.82"
            ></line>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default SwordDivider;
