export default class SVGCreator {
    static infoCreator(logoColor:string) {
        const info = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    
        info.setAttributeNS(null, "width", "32");
        info.setAttributeNS(null, "height", "32");
        info.setAttributeNS(null, "fill", "none");
        info.setAttributeNS(null, "viewBox", "0 0 32 32");
        info.setAttribute('class','notification-title-svg');
        info.innerHTML = ` 
                            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="${logoColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15 15H16V22H17" stroke="${logoColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.75 12C16.5784 12 17.25 11.3284 17.25 10.5C17.25 9.67157 16.5784 9 15.75 9C14.9216 9 14.25 9.67157 14.25 10.5C14.25 11.3284 14.9216 12 15.75 12Z" fill="${logoColor}"/>
                          `;
        return info;
    }

    static warningCreator(logoColor:string) {
        const warning = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    
        warning.setAttributeNS(null, "width", "32");
        warning.setAttributeNS(null, "height", "32");
        warning.setAttributeNS(null, "fill", "none");
        warning.setAttributeNS(null, "viewBox", "0 0 32 32");
        warning.setAttribute('class','notification-title-svg');
        warning.innerHTML = ` 
                            <path d="M16 13V18" stroke="${logoColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.2748 5.00001L3.27479 24C3.09955 24.3035 3.00715 24.6478 3.00684 24.9983C3.00653 25.3487 3.09832 25.6931 3.27302 25.997C3.44773 26.3008 3.6992 26.5534 4.00226 26.7294C4.30532 26.9055 4.64932 26.9988 4.99979 27H26.9998C27.3503 26.9988 27.6943 26.9055 27.9973 26.7294C28.3004 26.5534 28.5519 26.3008 28.7266 25.997C28.9013 25.6931 28.9931 25.3487 28.9927 24.9983C28.9924 24.6478 28.9 24.3035 28.7248 24L17.7248 5.00001C17.5509 4.6961 17.2997 4.44353 16.9968 4.26787C16.6939 4.09221 16.35 3.99969 15.9998 3.99969C15.6496 3.99969 15.3057 4.09221 15.0028 4.26787C14.6998 4.44353 14.4487 4.6961 14.2748 5.00001V5.00001Z" stroke="${logoColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="${logoColor}"/>
                          `;
        return warning;
    }

    static errorCreator(logoColor:string) {
        const error = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    
        error.setAttributeNS(null, "width", "32");
        error.setAttributeNS(null, "height", "32");
        error.setAttributeNS(null, "fill", "none");
        error.setAttributeNS(null, "viewBox", "0 0 32 32");
        error.setAttribute('class','notification-title-svg');
        error.innerHTML = ` 
                            <path d="M16 10V17" stroke="${logoColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.5625 4.00001H11.4375C11.3077 3.99955 11.179 4.02471 11.0589 4.07404C10.9388 4.12338 10.8296 4.19591 10.7375 4.28751L4.28751 10.7375C4.19591 10.8296 4.12338 10.9388 4.07404 11.0589C4.02471 11.179 3.99955 11.3077 4.00001 11.4375V20.5625C3.99955 20.6924 4.02471 20.821 4.07404 20.9411C4.12338 21.0613 4.19591 21.1705 4.28751 21.2625L10.7375 27.7125C10.8296 27.8041 10.9388 27.8766 11.0589 27.926C11.179 27.9753 11.3077 28.0005 11.4375 28H20.5625C20.6924 28.0005 20.821 27.9753 20.9411 27.926C21.0613 27.8766 21.1705 27.8041 21.2625 27.7125L27.7125 21.2625C27.8041 21.1705 27.8766 21.0613 27.926 20.9411C27.9753 20.821 28.0005 20.6924 28 20.5625V11.4375C28.0005 11.3077 27.9753 11.179 27.926 11.0589C27.8766 10.9388 27.8041 10.8296 27.7125 10.7375L21.2625 4.28751C21.1705 4.19591 21.0613 4.12338 20.9411 4.07404C20.821 4.02471 20.6924 3.99955 20.5625 4.00001V4.00001Z" stroke="${logoColor}" stroke-width="2" stroke-miterlimit="10"/>
                            <path d="M16 23C16.8284 23 17.5 22.3284 17.5 21.5C17.5 20.6716 16.8284 20 16 20C15.1716 20 14.5 20.6716 14.5 21.5C14.5 22.3284 15.1716 23 16 23Z" fill="${logoColor}"/>
                          `;
        return error;
    }
}