import { IconSvgProps } from "../../../../types/SongsTypesProps";


export const PlusIcon = ({size = 24, width, height, ...props}: IconSvgProps) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M6 12h12" />
          <path d="M12 18V6" />
        </g>
      </svg>
    );
  };


export const SearchIcon = (props: IconSvgProps) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  };

  export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}: IconSvgProps) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...otherProps}
      >
        <path
          d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  };

  
  export const DeleteIcon = (props: IconSvgProps) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 20 20"
        width="1em"
        {...props}
      >
        <path
          d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M8.60834 13.75H11.3833"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <path
          d="M7.91669 10.4167H12.0834"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </svg>
    );
  };
  
  export const EditIcon = (props: IconSvgProps) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 20 20"
        width="1em"
        {...props}
      >
        <path
          d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
        <path
          d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
        <path
          d="M2.5 18.3333H17.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
      </svg>
    );
  };

  // 1. Asignar contraseña temporal
export const TemporaryPasswordIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      {/* Candado */}
      <path
        d="M6.66667 8.33333V6.66667C6.66667 4.825 8.15833 3.33333 10 3.33333C11.8417 3.33333 13.3333 4.825 13.3333 6.66667V8.33333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />

      <path
        d="M10 12.0833V13.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />

      <rect
        x="4.16667"
        y="8.33333"
        width="11.6667"
        height="8.33333"
        rx="2"
        stroke="currentColor"
        strokeWidth={1.5}
      />

      {/* Reloj pequeño */}
      <path
        d="M14.5833 4.16667V5.83333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />

      <path
        d="M14.5833 5.83333L15.4167 6.66667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

// 2. Cambio de rol de usuario
export const ChangeUserRoleIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      {/* Usuario */}
      <path
        d="M10 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 10 2.5C8.15905 2.5 6.66666 3.99238 6.66666 5.83333C6.66666 7.67428 8.15905 9.16667 10 9.16667Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />

      <path
        d="M4.16666 16.6667C4.16666 13.9 6.78333 11.6667 10 11.6667C13.2167 11.6667 15.8333 13.9 15.8333 16.6667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />

      {/* Flechas de cambio */}
      <path
        d="M14.1667 9.16667H17.5L16.25 7.91667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />

      <path
        d="M17.5 9.16667L16.25 10.4167"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

// 3. Activar usuario
export const ActivateUserIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      {/* Usuario */}
      <path
        d="M10 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 10 2.5C8.15905 2.5 6.66666 3.99238 6.66666 5.83333C6.66666 7.67428 8.15905 9.16667 10 9.16667Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />

      <path
        d="M4.16666 16.6667C4.16666 13.9 6.78333 11.6667 10 11.6667C11.0667 11.6667 12.0667 11.9083 12.9333 12.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />

      {/* Check */}
      <path
        d="M13.3333 15L15 16.6667L18.3333 13.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

// 4. Deshabilitar usuario
export const DisableUserIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      {/* Usuario */}
      <path
        d="M10 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 10 2.5C8.15905 2.5 6.66666 3.99238 6.66666 5.83333C6.66666 7.67428 8.15905 9.16667 10 9.16667Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />

      <path
        d="M4.16666 16.6667C4.16666 13.9 6.78333 11.6667 10 11.6667C11.0667 11.6667 12.0667 11.9083 12.9333 12.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />

      {/* X */}
      <path
        d="M14.1667 14.1667L17.5 17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />

      <path
        d="M17.5 14.1667L14.1667 17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};