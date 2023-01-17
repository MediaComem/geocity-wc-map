export default class SVGCreator {
    static crossCreator() {
        const cross = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    
        cross.setAttributeNS(null, "width", "20")
        cross.setAttributeNS(null, "height", "20")
        cross.setAttributeNS(null, "viewBox", "0 0 20 20")
        cross.setAttribute('class','custom-popup-title-svg');
        cross.innerHTML = ` <g clip-path="url(#clip0_278_3610)">
                            <path d="M15.4 4.6001L4.59998 15.4001" stroke="#1E293B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.4 15.4001L4.59998 4.6001" stroke="#1E293B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_278_3610">
                            <rect width="19.2" height="19.2" fill="white" transform="translate(0.400024 0.399902)"/>
                            </clipPath>
                            </defs>
                          `
        return cross
    }
}