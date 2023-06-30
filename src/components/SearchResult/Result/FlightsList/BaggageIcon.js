import React from 'react';

export default function LuggageIcon(props) {
  const color = !!props.value ? '#4872F2' : '#737373'; 

  return (
    <svg
      className={props.className}
      width="55"
      height="44"
      viewBox="0 0 55 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M51.3534 7.84253H3.64659C2.18492 7.84253 1 9.01652 1 10.4647V40.3778C1 41.826 2.18492 43 3.64659 43H51.3534C52.8151 43 54 41.826 54 40.3778V10.4647C54 9.01652 52.8151 7.84253 51.3534 7.84253Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.3884 1.00002H32.6113C33.3132 1.00002 33.9864 1.27629 34.4827 1.76804C34.9791 2.2598 35.2579 2.92676 35.2579 3.6222V7.84245H19.7305V3.6222C19.7305 3.2769 19.7993 2.93501 19.933 2.61613C20.0667 2.29726 20.2627 2.00769 20.5097 1.76405C20.7566 1.52041 21.0497 1.3275 21.3721 1.19639C21.6945 1.06527 22.0399 0.998542 22.3884 1.00002V1.00002Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.9475 43V7.84253"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0522 7.84253V43"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!props.value && 
        <>
        <path d="M17 35.6772L38 14.3755" stroke="#737373" stroke-width="2" />
        <path d="M38 35.6772L17 14.3755" stroke="#737373" stroke-width="2" />
        </>
      }
      { props.value &&
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#4872F2"
          style={{ fontSize: '22px' }}
        >
          {props.value || 0}
        </text>
      }
    </svg>
  );
};