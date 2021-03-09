import { speechSynthesis } from "../scripts/speech.js";
if (!customElements.get("selfie-intent")) {
  class SelfieIntent extends HTMLElement {
    styles() {
      return `
      #video {
        width: 100vw;
        height: 80vh;
        object-fit: cover;
      }
      .camera {
        width: 100vw;
        height: 100vh;
        display: inline-block;
        position: fixed;
        top: 0;
        left: 0;
      }
      
      #startbutton {
        position: absolute;
        border-radius: 50%;
        padding: 2em;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        border: none;
      }
      `;
    }

    constructor() {
      super();

      // The width and height of the captured photo. We will set the
      // width to the value defined here, but the height will be
      // calculated based on the aspect ratio of the input stream.

      this.width = 640; // We will scale the photo width to this
      this.height = 0; // This will be computed based on the input stream

      // |streaming| indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.

      this.streaming = false;

      // The various HTML elements we need to configure or control. These
      // will be set by the startup() function.

      this.video = null;
      this.startbutton = null;
      this.imageCapture = null;
    }

    upload(body) {
      fetch(`/save-file`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/octet-stream' }),
        body,
      })
      .then(response => response.json())
    }

    startup() {
      this.video = document.getElementById("video");
      this.startbutton = document.getElementById("startbutton");

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
          const track = stream.getVideoTracks()[0];
          this.imageCapture = new ImageCapture(track);
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
            this.streaming = true;
          }
        },
        false
      );

      this.startbutton.addEventListener(
        "click",
        (ev) => {
          this.onTakePhotoButtonClick();
          ev.preventDefault();
        },
        false
      );
    }

    onTakePhotoButtonClick() {
      this.imageCapture.takePhoto()
        .then(blob => this.upload(blob))
      .catch(error => console.log(error));
    }

    connectedCallback() {
      this.innerHTML = `
      <style>${this.styles()}</style>
      <div class="camera">
        <video id="video">Video stream not available.</video>
        <button id="startbutton"></button> 
      </div>
      `;
       // Set up our event listener to run the startup process
       this.startup()
    }
  }

  customElements.define("selfie-intent", SelfieIntent);
}
