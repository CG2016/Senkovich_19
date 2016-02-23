function updateROutput(el, val) {
    var roundedValue = Math.round(val);
    var wasError = true;
    if (roundedValue < 0)
        el.textContent = 0;
    else if (roundedValue > 255)
        el.textContent = 255;
    else {
        el.textContent = roundedValue;
        wasError = false;
    }
    if (wasError)
        console.log("Error trying to convert luv to rgb");
}

function updateGOutput(el, val) {
    var roundedValue = Math.round(val);
    var wasError = true;
    if (roundedValue < 0)
        el.textContent = 0;
    else if (roundedValue > 255)
        el.textContent = 255;
    else {
        el.textContent = roundedValue;
        wasError = false;
    }
    if (wasError)
        console.log("Error trying to convert luv to rgb");
}

function updateBOutput(el, val) {
    var roundedValue = Math.round(val);
    var wasError = true;
    if (roundedValue < 0)
        el.textContent = 0;
    else if (roundedValue > 255)
        el.textContent = 255;
    else {
        el.textContent = roundedValue;
        wasError = false;
    }
    if (wasError)
        console.log("Error trying to convert luv to rgb");
}

function updateCOutput(el, val) {
    var roundedValue = Math.round(val);
    if (roundedValue < 0)
        el.textContent = 0;
    else if (roundedValue > 255)
        el.textContent = 255;
    else
        el.textContent = roundedValue;
}

function updateMOutput(el, val) {
    var roundedValue = Math.round(val);
    if (roundedValue < 0)
        el.textContent = 0;
    else if (roundedValue > 255)
        el.textContent = 255;
    else
        el.textContent = roundedValue;
}

function updateYOutput(el, val) {
    var roundedValue = Math.round(val);
    if (roundedValue < 0)
        el.textContent = 0;
    else if (roundedValue > 255)
        el.textContent = 255;
    else
        el.textContent = roundedValue;
}

function updateHOutput(el, val) {
    el.textContent = Math.round(val);
}

function updateSOutput(el, val) {
    el.textContent = Math.round(val);
}

function updateLOutput(el, val) {
    el.textContent = Math.round(val);
}

function updatelOutput(el, val) {
    var roundedValue = Math.round(val);
    el.textContent = roundedValue;
    if (isNaN(roundedValue))
        console.log("Error trying to convert luv to rgb");
}

function updateuOutput(el, val) {
    el.textContent = Math.round(val);
}

function updatevOutput(el, val) {
    el.textContent = Math.round(val);
}
