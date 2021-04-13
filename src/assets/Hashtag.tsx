import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={512}
      viewBox="0 0 24 24"
      width={512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.001 18a.75.75 0 01-.738-.89l2-10.5a.75.75 0 111.473.28l-2 10.5a.749.749 0 01-.735.61zM9.001 18a.75.75 0 01-.738-.89l2-10.5a.75.75 0 111.473.28l-2 10.5a.749.749 0 01-.735.61z" />
      <path d="M17.25 15H6.75a.75.75 0 010-1.5h10.5a.75.75 0 010 1.5zM17.25 10.5H6.75a.75.75 0 010-1.5h10.5a.75.75 0 010 1.5z" />
      <path d="M21.25 24H2.75A2.752 2.752 0 010 21.25V2.75A2.752 2.752 0 012.75 0h18.5A2.752 2.752 0 0124 2.75v18.5A2.752 2.752 0 0121.25 24zM2.75 1.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25V2.75c0-.689-.561-1.25-1.25-1.25z" />
    </svg>
  );
}

export default SvgComponent;