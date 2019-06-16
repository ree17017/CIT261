function draw() {
    var canvas = document.getElementById('draw');
    if (canvas.getContext) {
        console.log('canvas.getContext: ', canvas.getContext);
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(25, 5, 10, 90);

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(65, 5, 10, 90);

        ctx.fillStyle = 'rgba(0,0,200,0.5)';
        ctx.fillRect(25, 50, 50, 10);

        ctx.fillStyle = 'rgba(0,0,200,0.5)';
        ctx.fillRect(25, 5, 50, 10);

        ctx.fillStyle = 'rgba(0,0,200,0.5)';
        ctx.fillRect(25, 85, 50, 10);
    }
}

function loadVideo() {
    var controls = document.getElementById('videoControls').checked;
    var autoplay = document.getElementById('videoAutoplay').checked;
    var loop = document.getElementById('videoLoop').checked;
    var displayVideo = document.getElementById('movieDisplay');
    var whichVideo = document.getElementById('whichMovie').value;
    var videoString = "";

    videoString = "<video ";
    videoString += (controls) ? "controls " : "";
    videoString += (autoplay) ? "autoplay " : "";
    videoString += (loop) ? "loop " : "";
    videoString += ">"
    videoString += "<source src='" + whichVideo + "'>Your browser does not support audio.</video>"
    console.log('videoString: ', videoString);

    displayVideo.innerHTML = videoString;
}

function loadAudio() {
    var controls = document.getElementById('audioControls').checked;
    var autoplay = document.getElementById('audioAutoplay').checked;
    var loop = document.getElementById('audioLoop').checked;
    var displayAudio = document.getElementById('audioDisplay');
    var whichAudio = document.getElementById('whichAudio').value;
    var audioString = "";

    audioString = "<audio ";
    audioString += (controls) ? "controls " : "";
    audioString += (autoplay) ? "autoplay " : "";
    audioString += (loop) ? "loop " : "";
    audioString += ">"
    audioString += "<source src='" + whichAudio + "'>Your browser does not support audio.</audio>"
    console.log('audioString: ', audioString);

    displayAudio.innerHTML = audioString;
}

function clearInnerHTML(from) {
    console.log('from: ', from);
    from = document.getElementById(from);
    from.innerHTML = "";
}