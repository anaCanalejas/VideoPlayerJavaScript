/* The vars would be definded in global context in order to make easier this sample
but for real purposes it has to be defined a global object and inside of it the application */

addEventListener('load', iniciar); 
var maxim, mmedia, play, bar, progress, mute, volume, loop;
function iniciar(){
	maxim = 192; /* Max width of progress bar */
	reproductor = document.getElementById('reproductor');
	mmedia = document.getElementById('media');
	play = document.getElementById('play');
	bar = document.getElementById('barra');
	progress = document.getElementById('progreso');
	mute = document.getElementById('mute');
	volume = document.getElementById('volume');
	play.addEventListener('click', push);
	mute.addEventListener('click', sound);
	bar.addEventListener('click', move);
	volume.addEventListener('change', level);

}

function push(){ 
	/* it plays or pauses the video and changes the buttons */
  if(!mmedia.paused && !mmedia.ended) {
    mmedia.pause();
    play.value = 'Play';
    clearInterval(loop); 
  }
  else{
    mmedia.play();
    play.value = 'Pause';
    loop = setInterval(status, 1000); 
  }
}

function status(){ 
/* Check media status and calculates progress bar */	
  if(!mmedia.ended){ /* if playing */
  	/* Calculate width in pixels*/
    var size = parseInt(mmedia.currentTime * maxim / mmedia.duration);
    progress.style.width = size + 'px'; 
  }
  else{
    progress.style.width = '0px'; /* Clear bar */
    play.innerHTML = 'Play'; /* Change button to play again  */
    clearInterval(loop); /* Stop loop execution */
  }
}




function move(e){
	/* Progress bar control */
  if(!mmedia.paused && !mmedia.ended){ /* If playing */
    var barOffset = bar.offsetLeft;
    var distanceBar = bar.offsetLeft + reproductor.offsetLeft; /* Actual distance from bar to window */
    var jumpX = e.pageX - distanceBar; /* Jump to this point */
    var newtime = jumpX * mmedia.duration / maxim ; /* New position in seconds */
    mmedia.currentTime = newtime;
    progress.style.width = jumpX + 'px'; /* Adjusts progress bar*/
  }
}


function sound(){ 
	/* This controls the mute and sound buttons */
  if(mute.value == 'Mute'){
    mmedia.muted = true;
    mute.value = 'Sound'; 
  }else{
    mmedia.muted = false;
    mute.value = 'Mute'; 
  }
}

function level(){
  mmedia.volume = volume.value; 
}
