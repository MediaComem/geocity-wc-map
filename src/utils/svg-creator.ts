export default class SVGCreator {
  static info = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <g class="WarningCircle" clip-path="url(#a)">
      <g class="icon">
        <path d="M16 28C22.627 28 28 22.627 28 16 28 9.373 22.627 4 16 4 9.373 4 4 9.373 4 16 4 22.627 9.373 28 16 28ZM16 10V17" class="Vector"/>
        <path d="M16 23C16.8284 23 17.5 22.3284 17.5 21.5C17.5 20.6716 16.8284 20 16 20C15.1716 20 14.5 20.6716 14.5 21.5C14.5 22.3284 15.1716 23 16 23Z" class="Vector"/>
      </g>
    </g>
    <defs>
      <clipPath id="a" class="a">
        <path fill="#fff" d="M0 0H32V32H0z"/>
      </clipPath>
    </defs>
  </svg>
  
        `;

  static warning = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <g class="Warning" clip-path="url(#a)">
    <g class="icon">
      <path d="M16 13V18M14.275 5 3.275 24C3.1 24.304 3.007 24.648 3.007 24.998 3.007 25.349 3.099 25.693 3.273 25.997 3.448 26.301 3.699 26.553 4.003 26.729 4.306 26.906 4.65 26.999 5 27H27C27.351 26.999 27.695 26.906 27.998 26.729 28.301 26.553 28.552 26.301 28.727 25.997 28.902 25.693 28.993 25.349 28.993 24.998 28.993 24.648 28.9 24.304 28.725 24L17.725 5C17.551 4.696 17.3 4.444 16.997 4.268 16.694 4.092 16.35 4 16 4 15.65 4 15.306 4.092 15.003 4.268 14.7 4.444 14.449 4.696 14.275 5V5Z" class="Vector"/>
      <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" class="Vector"/>
    </g>
  </g>
  <defs>
    <clipPath id="a" class="a">
      <path fill="#fff" d="M0 0H32V32H0z"/>
    </clipPath>
  </defs>
</svg>

        `;

  static error = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <g class="WarningOctagon" clip-path="url(#a)">
    <g class="icon">
      <path d="M16 22C16.276 22 16.5 22.224 16.5 22.5 16.5 22.776 16.276 23 16 23 15.724 23 15.5 22.776 15.5 22.5 15.5 22.224 15.724 22 16 22ZM16 8V17" class="Vector"/>
    </g>
  </g>
  <defs>
    <clipPath id="a" class="a">
      <path fill="#fff" d="M0 0H32V32H0z"/>
    </clipPath>
  </defs>
</svg>

        `;
}
