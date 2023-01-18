export default class SVGCreator {
    static crossCreator() {
        const cross = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    
        cross.setAttributeNS(null, "width", "20");
        cross.setAttributeNS(null, "height", "20");
        cross.setAttributeNS(null, "fill", "none");
        cross.setAttributeNS(null, "viewBox", "0 0 20 20");
        cross.setAttribute('class','custom-popup-title-svg');
        cross.innerHTML = ` 
                            <path d="M15.4 4.59998L4.60004 15.4" stroke="#1E293B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.4 15.4L4.60004 4.59998" stroke="#1E293B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          `;
        return cross;
    }

    static warningCreator() {
        const warning = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    
        warning.setAttributeNS(null, "width", "32");
        warning.setAttributeNS(null, "height", "32");
        warning.setAttributeNS(null, "fill", "none");
        warning.setAttributeNS(null, "viewBox", "0 0 32 32");
        warning.setAttribute('class','warning-notification-title-svg');
        warning.innerHTML = ` 
                            <path d="M16 13V18" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.2748 5.00001L3.27479 24C3.09955 24.3035 3.00715 24.6478 3.00684 24.9983C3.00653 25.3487 3.09832 25.6931 3.27302 25.997C3.44773 26.3008 3.6992 26.5534 4.00226 26.7294C4.30532 26.9055 4.64932 26.9988 4.99979 27H26.9998C27.3503 26.9988 27.6943 26.9055 27.9973 26.7294C28.3004 26.5534 28.5519 26.3008 28.7266 25.997C28.9013 25.6931 28.9931 25.3487 28.9927 24.9983C28.9924 24.6478 28.9 24.3035 28.7248 24L17.7248 5.00001C17.5509 4.6961 17.2997 4.44353 16.9968 4.26787C16.6939 4.09221 16.35 3.99969 15.9998 3.99969C15.6496 3.99969 15.3057 4.09221 15.0028 4.26787C14.6998 4.44353 14.4487 4.6961 14.2748 5.00001V5.00001Z" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#B45309"/>
                          `;
        return warning;
    }
}