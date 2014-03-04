var canvas, context, tile;
var tileset = ["rgb(50,100,200)","rgb(0,200,0)","rgb(0,75,0)"];

function wrap(n, w) {
    if (n < 0) { return n + w; }
    if (n >= w) { return n % w; }
    return n;
}

function generate_terrain() {
    tile = [];
    tile[0] = [];
    for (var x=0;x<16;x++) {
        tile[0][x] = [];
        for (var y=0;y<16;y++) {
            tile[0][x][y] = Math.floor(Math.random() * 3 / 2);
        }
    }

    var r = 32;
    var land = 0;
    for (var z=1; z<5; z++) {
        tile[z] = [];
        for (var x=0;x<r;x++) {
            tile[z][x] = [];
            for (var y=0;y<r;y++) {
                land = tile[z-1][wrap(Math.floor(x/2)-1,r/2)][Math.floor(y/2)] +
                       tile[z-1][Math.floor(x/2)][wrap(Math.floor(y/2)-1,r/2)] +
                       tile[z-1][wrap(Math.floor(x/2)+1,r/2)][Math.floor(y/2)] +
                       tile[z-1][Math.floor(x/2)][wrap(Math.floor(y/2)+1,r/2)];
                if (land < 2)
                    tile[z][x][y] = 0
                else if (land == 2)
                    tile[z][x][y] = Math.floor(Math.random() * 2);
                else
                    tile[z][x][y] = 1;
            }
        }
        r *= 2;
    }
    
    for (var x=0;x<256;x++) {
        for (var y=0;y<256;y++) {
            if (tile[4][x][y] == 1 && (tile[4][wrap(x-1,256)][y] == 0 ||
                tile[4][x][wrap(y-1,256)] == 0 ||
                tile[4][wrap(x+1,256)][y] == 0 ||
                tile[4][x][wrap(y+1,256)] == 0)) {
                tile[4][x][y] = 2;
            }
        
            context.fillStyle = tileset[tile[4][x][y]];
            context.fillRect(x*2,y*2,2,2);
        }
    }
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    canvas.onmousedown = function() {
        generate_terrain();
    };
    
    generate_terrain();
};
