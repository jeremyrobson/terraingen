var canvas, context, tile;
var colors = ["rgba(0,0,255,0.16)","rgba(0,255,0,0.16)"];

function wrap(n, size) {
    return n & (size-1);
}

function generate_map() {
    tile = [];
    for (var i=2;i<=7;i++) {
        tile[i] = [];
        for (var x=0;x<(2<<i);x++) {
            tile[i][x] = []
            for (var y=0;y<(2<<i);y++) {
                if (i==2)
                    tile[i][x][y] = Math.floor(Math.random() * 3 / 2);
                else
                    tile[i][x][y] = 0;
            }
        }
    }

    var sx, sy, sum, w, h;
    for (var i=3;i<=7;i++) {
        w = 2<<i;
        h = w;
        for (var x=0;x<w;x++) {
            for (var y=0;y<h;y++) {
                sum = 0;
                for (var a=-1;a<=1;a++) {
                    for (var b=-1;b<=1;b++) {
                        sx = wrap(Math.floor((x+a)/2),w/2);
                        sy = wrap(Math.floor((y+b)/2),h/2);
                        sum += tile[i-1][sx][sy];
                    }
                }
                if (sum > 2)
                    tile[i][x][y] = 1;
                if (sum < 7 && Math.random() < 0.4) //random water
                    tile[i][x][y] = 0;
            }
        }
    }
    
    /*
    todo: blur algorithm
    for (var x=0;x<256;x++) {
        for (var y=0;y<256;y++) {
            
        }
    }
    */
    
    draw(2, 7);
}

function draw(min, max) {
    context.clearRect(0,0,512,512);

    var w, h;
    for (var i=min;i<=max;i++) {
        w = 256 / 2>>i;
        h = w;
        for (var x=0;x<(2<<i);x++) {
            for (var y=0;y<(2<<i);y++) {
                context.fillStyle = colors[tile[i][x][y]];
                context.fillRect(x*w*2,y*h*2,w*2,h*2);
            }
        }
    }
}
