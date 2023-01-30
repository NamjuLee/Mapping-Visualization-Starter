import mapboxgl from "mapbox-gl";


export const example = (): void => {
    
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoiY2xhNGU0YWo4MDlhYzNwdHBwenVvang4eiJ9.P3sX4l_3KjdPeRRbVS1VVg.njzaWduanUiLCJhIjo';
    //Animation from https://javascript.tutorials24x7.com/blog/how-to-draw-animated-circles-in-html5-canvas

    const canvas = document.createElement('canvas');
    canvas.id = 'canvasID';
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    // // const circles: any = [];
    // // const radius = 20;
    if (ctx) {
        canvas.style.display = 'none';
    }

    // function Circle(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
    //     this.x = x;
    //     this.y = y;
    //     this.dx = dx;
    //     this.dy = dy;

    //     this.radius = radius;

    //     this.draw = function () {
    //         ctx.beginPath();
    //         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //         ctx.strokeStyle = color;
    //         ctx.stroke();
    //     };

    //     this.update = function () {
    //         if (this.x + this.radius > 400 || this.x - this.radius < 0) {
    //             this.dx = -this.dx;
    //         }

    //         if (this.y + this.radius > 400 || this.y - this.radius < 0) {
    //             this.dy = -this.dy;
    //         }

    //         this.x += this.dx;
    //         this.y += this.dy;

    //         this.draw();
    //     };
    // }

    // for (let i = 0; i < 5; i++) {
    //     const color =
    //         '#' +
    //         (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    //     const x = Math.random() * (400 - radius * 2) + radius;
    //     const y = Math.random() * (400 - radius * 2) + radius;

    //     const dx = (Math.random() - 0.5) * 2;
    //     const dy = (Math.random() - 0.5) * 2;

    //     circles.push(new Circle(x, y, dx, dy, radius, color));
    // }

    // function animate() {
    //     requestAnimationFrame(animate);
    //     ctx.clearRect(0, 0, 400, 400);

    //     for (let r = 0; r < 5; r++) {
    //         circles[r].update();
    //     }
    // }

    // animate();

    const map = new mapboxgl.Map({
        container: 'map',
        zoom: 5,
        minZoom: 14,
        center: [-71.093161, 42.358871],
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/dark-v10' // 'mapbox://styles/mapbox/streets-v11'
    });

    map.on('load', () => {
        map.addSource('canvas-source', {
            type: 'canvas',
            canvas: 'canvasID',
            coordinates: [
                [91.4461, 21.5006],
                // [100.3541, 21.5006],
                // [100.3541, 13.9706],
                // [91.4461, 13.9706]
            ],
            // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
            animate: true
        });

        map.addLayer({
            id: 'canvas-layer',
            type: 'raster',
            source: 'canvas-source'
        });
    });

}; 