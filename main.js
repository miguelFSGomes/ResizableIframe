import url from './iframe.js';

const iframe = document.querySelector('iframe')
iframe.src = url;

const el = document.querySelector(".item");
const  IFrame = document.querySelector(".iframeContainer"); 
let isResizing = false;
let fullScreen = false;
 
  el.addEventListener("mousedown", mousedown);




function mousedown(e) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    if (!isResizing) {
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;
      IFrame.style.pointerEvents='none';

      const rect = el.getBoundingClientRect();

      el.style.left = rect.left - newX + "px";
      el.style.top = rect.top - newY + "px";

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    IFrame.style.pointerEvents='auto';
  }
}

const resizers = document.querySelectorAll(".resizer");
let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    isResizing = true;
    IFrame.style.pointerEvents='none';
    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = el.getBoundingClientRect();

      if (currentResizer.classList.contains("se")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
      } else if (currentResizer.classList.contains("sw")) {
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
      } else if (currentResizer.classList.contains("ne")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
      } else {
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
      }

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      IFrame.style.pointerEvents='auto';
      isResizing = false;
    }
  }
}


function onMinimise() {
  const mainDiv = document.querySelector('.item');
    document.querySelector('.iframeContainer').style.display="none";
    mainDiv.style.minHeight="50px";
    mainDiv.style.top=window.innerHeight-mainDiv.offsetHeight+ 'px';
    mainDiv.style.right=window.innerWidth-mainDiv.offsetWidth+ 'px';}


function onReset() {
  const mainDiv = document.querySelector('.item');
  document.querySelector('.iframeContainer').style.display="block";
  mainDiv.style.minHeight="500px";
  mainDiv.style.minWidth="800px";
  mainDiv.style.top='8px';
}

function onExpand() {
  const mainDiv = document.querySelector('.item');
  document.querySelector('.iframeContainer').style.display="block";

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  if(!fullScreen){
    mainDiv.requestFullscreen();
    fullScreen=true;
  }
  else{
    closeFullscreen();
    fullScreen=false;
  }
  
  
}



const mini=document.querySelector('.minimise');
const reset =document.querySelector('.reset');
const expand = document.querySelector('.expand');

 mini.addEventListener('click',onMinimise);
 reset.addEventListener('click',onReset);
 expand.addEventListener('click',onExpand);

 console.log('url',url);
 

