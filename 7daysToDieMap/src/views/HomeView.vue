<script lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { defineComponent } from 'vue'
import map19Labels from '@/assets/map/Navezgane_19_Labels.png'
import map20 from '@/assets/map/Navezgane_20.png'

const canvasToMakeTSHappy = document.createElement('canvas');
const renderToMakeTSHappy: any  = canvasToMakeTSHappy.getContext('2d');

const mapSizePixels = 6144;

var requestAnimFrame = (function (callback) {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        })();

export default defineComponent( {
    name: 'Home',
    components: {
    },
    data: () => {
        return {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            mapCanvas: canvasToMakeTSHappy,
            titleRender: renderToMakeTSHappy,
            LabelCanvas: canvasToMakeTSHappy,
            lightRender: renderToMakeTSHappy,
            titleImage: new Image(),
            titleImageClean: new Image(),
            imageReady: false,
            cleanimageReady: false,
            mouseX: 0,
            mouseY: 0,
            showAllLabel: false,
        };
    },
    methods: {
        setup() {
            console.log('Title Setup');
            this.titleRender.save();
            // this.titleRender.fillStyle = 'white';
            // this.titleRender.fillRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
            this.titleRender.clearRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
            this.titleRender.restore();
        }, //SETUP
        draw() {
            //draw main
            this.titleRender.save();
            this.titleRender.clearRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
            if (this.cleanimageReady) {
                let backgroundGradient = this.titleRender.createLinearGradient(0, 0, 0, this.mapCanvas.height);
                backgroundGradient.addColorStop(0, 'black');
                backgroundGradient.addColorStop(0.5, 'darkgrey');
                backgroundGradient.addColorStop(0.93, 'black');
                backgroundGradient.addColorStop(1, 'black');
                this.titleRender.fillStyle = backgroundGradient;
                // this.titleRender.fillStyle = 'grey';
                this.titleRender.fillRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
                // 	context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                // this.titleRender.fillStyle = 'black';
                this.titleRender.drawImage(this.titleImageClean, 0, 0, this.mapCanvas.width, this.mapCanvas.height);
            }
            this.titleRender.restore();
            //draw flashlight layer
            //TODO flashlight size based on canvas size instead of static
            let flashlightSize = this.screenWidth / 8;
            this.lightRender.save();
            this.lightRender.globalCompositeOperation = 'source-over';
            this.lightRender.beginPath();
            this.lightRender.clearRect(0, 0, this.LabelCanvas.width, this.LabelCanvas.height);
            let backgroundGradient = this.lightRender.createLinearGradient(0, 0, 0, this.mapCanvas.height);
            backgroundGradient.addColorStop(0, 'black');
            backgroundGradient.addColorStop(0.5, 'darkgrey');
            backgroundGradient.addColorStop(0.93, 'black');
            backgroundGradient.addColorStop(1, 'black');
            this.lightRender.fillStyle = backgroundGradient;
            this.lightRender.fillRect(0, 0, this.LabelCanvas.width, this.LabelCanvas.height);
            if (this.imageReady) {
                this.lightRender.drawImage(this.titleImage, 0, 0, this.LabelCanvas.width, this.LabelCanvas.height);
            }
            if (this.mouseX != null && this.mouseY != null) {
                this.lightRender.globalCompositeOperation = 'xor';
                if(!this.showAllLabel){
                  let grd = this.lightRender.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, flashlightSize);
                  grd.addColorStop(0, 'rgba(0,0,0,1)');
                  grd.addColorStop(0.7, 'rgba(0,0,0,1)');
                  grd.addColorStop(0.9, 'rgba(0,0,0,0.8)');
                  grd.addColorStop(1, 'rgba(0,0,0,0.1)');
                  // Fill with gradient
                  this.lightRender.fillStyle = grd;
                  // this.lightRender.fillRect(this.mouseX, this.mouseY, 50, 50);
                  this.lightRender.arc(this.mouseX, this.mouseY, flashlightSize, 0, 2 * Math.PI);
                  this.lightRender.fill();
                  //white light effect
                  this.lightRender.globalCompositeOperation = 'source-over';
                  grd = this.lightRender.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, flashlightSize);
                  grd.addColorStop(0, 'rgba(255,255,255,0.3)');
                  // grd.addColorStop(0.7, 'rgba(0,0,0,1)');
                  // grd.addColorStop(0.9, 'rgba(0,0,0,1)');
                  grd.addColorStop(1, 'rgba(255,255,255,0)');
                  // Fill with gradient
                  this.lightRender.fillStyle = grd;
                  // this.lightRender.fillRect(this.mouseX, this.mouseY, 50, 50);
                  this.lightRender.arc(this.mouseX, this.mouseY, 200, 0, 2 * Math.PI);
              } else {
                console.log('else')
                this.lightRender.fillStyle = 'white';
                this.lightRender.fillRect(0, 0, this.LabelCanvas.width, this.LabelCanvas.height);
              }
                this.lightRender.fill();
            }
            this.lightRender.restore();
            requestAnimFrame(this.draw);
        }, //draw
        windowResized() {
            this.screenWidth = window.innerWidth;
            this.screenHeight = window.innerHeight;
            this.mapCanvas.width = this.screenWidth;
            this.mapCanvas.height = this.screenHeight;
            this.LabelCanvas.width = this.screenWidth;
            this.LabelCanvas.height = this.screenHeight;
            document.getElementById('stage').setAttribute('style', `height:${this.LabelCanvas.height + 20}px;`);
        },
        getMousePos(canvas: HTMLCanvasElement, event:MouseEvent) {
            let rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        },
        mouseMoved(event) {
            let mousePos = this.getMousePos(this.LabelCanvas, event);
            this.mouseX = mousePos.x;
            this.mouseY = mousePos.y;
        },
        mouseClick(event) {
          console.log('Click')
            this.showAllLabel = true;
        },
        mouseReleased(event) {
          this.showAllLabel = false;
        }
    },
    mounted: function () {
      console.log('mounted')
        
        this.mapCanvas = this.$refs['mapCanvas'];
        this.titleRender = this.mapCanvas.getContext('2d');
        this.LabelCanvas = this.$refs['light-layer'];
        this.lightRender = this.LabelCanvas.getContext('2d');
        window.addEventListener('resize', this.windowResized);
        this.windowResized();
        this.titleImage.onload = () => {
            this.imageReady = true;
        };
        this.titleImage.src = map20;
        this.titleImageClean.onload = () => {
            this.cleanimageReady = true;
        };
        this.titleImageClean.src = map19Labels;
        window.addEventListener('mousemove', this.mouseMoved);
        window.addEventListener('mousedown', this.mouseClick);
        window.addEventListener('mouseup', this.mouseReleased);
        //disabled right-click menu
        window.addEventListener('contextmenu', (event) => event.preventDefault());
        this.setup();
        this.draw();
    } //mounted
});


</script>

<template>
  <main class="main">
    <div id="stage" class="stage" ref="stage">
        <canvas id="mapCanvas" ref="mapCanvas">Your browser does not support HTML5 canvas</canvas>
        <canvas id="lightLayer" ref="light-layer"></canvas>
    </div>
  </main>
</template>

<style scoped>

body {
  overflow: hidden;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
    /* cursor: none; */
}
.stage {
    position: relative !important;
    /* height: 20vh; */
    /* width: 512px;
    height: 512px; */
    width: 100%;
    height:100%;
    /* border: 1px solid white; */
    /* margin: 0 5%; */
}
#mapCanvas {
    z-index: 1;
}
#lightLayer {
    z-index: 2;
}
</style>
