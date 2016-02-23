function updateRGB(r, g, b) {
    updateROutput(Routput[0], r);
    Rinput.val(r);
    Rinput.trigger('change');
    updateGOutput(Goutput[0], g);
    Ginput.val(g);
    Ginput.trigger('change');
    updateBOutput(Boutput[0], b);
    Binput.val(b);
    Binput.trigger('change');
}

function updateCMY(r, g, b) {
    updateCOutput(Coutput[0], 255 - r);
    Cinput.val(255 - r);
    Cinput.trigger('change');
    updateMOutput(Moutput[0], 255 - g);
    Minput.val(255 - g);
    Minput.trigger('change');
    updateYOutput(Youtput[0], 255 - b);
    Yinput.val(255 - b);
    Yinput.trigger('change');
}

function updateHSL(h, s, l) {
    updateHOutput(Houtput[0], h);
    Hinput.val(h);
    Hinput.trigger('change');
    updateSOutput(Soutput[0], s);
    Sinput.val(s);
    Sinput.trigger('change');
    updateLOutput(Loutput[0], l);
    Linput.val(l);
    Linput.trigger('change');
}

function updateLUV(l, u, v) {
    updatelOutput(loutput[0], l);
    linput.val(l);
    linput.trigger('change');
    updateuOutput(uoutput[0], u);
    uinput.val(u);
    uinput.trigger('change');
    updatevOutput(voutput[0], v);
    vinput.val(v);
    vinput.trigger('change');
}
