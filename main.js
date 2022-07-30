const elInput = document.querySelector(".input-js");
const elCopy = document.querySelector(".fa-copy");
const elCheck = document.querySelector(".fa-check");
const elHexWrapper = document.querySelector(".hex-wrapper");
const elHex = document.querySelector(".hex");
const elRgb = document.querySelector(".rgb");
const elHsl = document.querySelector(".hsl");

elInput.addEventListener("input", function () {
    document.body.style.backgroundColor = this.value;
    elHex.innerHTML = this.value

    // Hex to RGB
    const hexToRgb = hex =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
    elRgb.innerHTML = hexToRgb(this.value);

    // HEX to HSL
    function hexToCssHsl(hex, valuesOnly = false) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        var cssString = '';
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        
        cssString = h + ',' + s + '%,' + l + '%';
        cssString = !valuesOnly ? 'hsl(' + cssString + ')' : cssString;
        
        return cssString;
      }
      elHsl.innerHTML = hexToCssHsl(this.value);
    elCopy.classList.remove("fa-check");
    elCopy.classList.add("fa-copy");
})

if (elHexWrapper) {
    elHexWrapper.addEventListener("click", function (evt) {
        if (evt.target.matches (".copy-js")) {
            // change icon
            elCopy.classList.remove("fa-copy");
            elCopy.classList.add("fa-check");

            // Copy text
            navigator.clipboard.writeText(elHex.textContent);

        }
    })
}