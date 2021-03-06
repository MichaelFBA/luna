import { speechSynthesis } from "../scripts/speech.js";
if (!customElements.get("selfie-intent")) {
  class SelfieIntent extends HTMLElement {
    styles() {
      return `
      .selfie{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #video {
        border: 1px solid black;
        box-shadow: 2px 2px 3px black;
        width:320px;
        height:240px;
      }
      
      #photo {
        border: 1px solid black;
        box-shadow: 2px 2px 3px black;
        width:320px;
        height:240px;
      }
      
      #canvas {
        display:none;
      }
      
      .camera {
        width: 340px;
        display:inline-block;
      }
      
      .output {
        width: 340px;
      }
      
      #startbutton {
        border: 1px solid #fff;
        position: absolute;
        border-radius: 50%;
        padding: 1em;
        font-size: 0.5em;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, -50%);
        margin: 0 auto;
      }
      `;
    }

    constructor() {
      super();

      // The width and height of the captured photo. We will set the
      // width to the value defined here, but the height will be
      // calculated based on the aspect ratio of the input stream.

      this.width = 320; // We will scale the photo width to this
      this.height = 0; // This will be computed based on the input stream

      // |streaming| indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.

      this.streaming = false;

      // The various HTML elements we need to configure or control. These
      // will be set by the startup() function.

      this.video = null;
      this.canvas = null;
      this.photo = null;
      this.startbutton = null;
    }

    startup() {
      this.video = document.getElementById("video");
      this.canvas = document.getElementById("canvas");
      this.photo = document.getElementById("photo");
      this.startbutton = document.getElementById("startbutton");

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
        });

      this.video.addEventListener(
        "canplay",
        (ev) => {
          if (!this.streaming) {
            this.height =
              this.video.videoHeight / (this.video.videoWidth / this.width);

            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.

            if (isNaN(this.height)) {
              this.height = this.width / (4 / 3);
            }

            this.video.setAttribute("width", this.width);
            this.video.setAttribute("height", this.height);
            this.canvas.setAttribute("width", this.width);
            this.canvas.setAttribute("height", this.height);
            this.streaming = true;
          }
        },
        false
      );

      this.startbutton.addEventListener(
        "click",
        (ev) => {
          this.takepicture();
          ev.preventDefault();
        },
        false
      );

      this.clearphoto();
    }

    // Fill the photo with an indication that none has been
    // captured.

    clearphoto() {
      var context = canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

    takepicture() {
      var context = this.canvas.getContext("2d");
      if (this.width && this.height) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        context.drawImage(this.video, 0, 0, this.width, this.height);

        var data = this.canvas.toDataURL("image/png");
        this.photo.setAttribute("src", data);
      } else {
        this.clearphoto();
      }
    }

    connectedCallback() {
      this.innerHTML = `
      <style>${this.styles()}</style>
        <div class="selfie">
        <div class="camera">
          <video id="video">Video stream not available.</video>
          <button id="startbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="36.174" height="36.174"><path d="M23.921 20.528c0 3.217-2.617 5.834-5.834 5.834s-5.833-2.617-5.833-5.834 2.616-5.834 5.833-5.834 5.834 2.618 5.834 5.834zm12.253-8.284v16.57a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-16.57a4 4 0 0 1 4-4h4.92V6.86a3.5 3.5 0 0 1 3.5-3.5h11.334a3.5 3.5 0 0 1 3.5 3.5v1.383h4.92c2.209.001 4 1.792 4 4.001zm-9.253 8.284c0-4.871-3.963-8.834-8.834-8.834-4.87 0-8.833 3.963-8.833 8.834s3.963 8.834 8.833 8.834c4.871 0 8.834-3.963 8.834-8.834z"/></svg>
          </button> 
        </div>
        <canvas id="canvas">
        </canvas>
        <div class="output">
          <img id="photo" alt="The screen capture will appear in this box."> 
        </div>
      </div>
      `;
       // Set up our event listener to run the startup process
       this.startup()
    }
  }

  customElements.define("selfie-intent", SelfieIntent);
}
