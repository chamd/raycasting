let canvas = document.getElementById('display2d')
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');

let canvas3d = document.getElementById('display3d');
/** @type {CanvasRenderingContext2D} */
let ctx3d = canvas3d.getContext('2d');

canvas3d.width = document.documentElement.clientWidth
canvas3d.height = window.innerHeight

window.onresize = function() {
    canvas3d.width = document.documentElement.clientWidth
    canvas3d.height = window.innerHeight

    setPlayer(playerPos[0], playerPos[1], playerRot)
};

// let map = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
//     [1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let playerPos = [0, 0];
let playerRot = 0;
let nowKey = {};
let FOV = 60;
let HES = 0.1;
let mode = 0;
let editPos = [0, 0];
let editBlock = 1;
let speed = 1;
// let view = false;

function setMap() {
    for (let i = 0; i < map[0].length; i++) {
        for (let j = 0; j < map.length; j++) {
            ctx.beginPath();
            ctx.rect(i * 50, j * 50, 50, 50);
            if (map[j][i] == 0) {
                ctx.fillStyle = 'rgb(0, 0, 0)';
            } else if (map[j][i] == 1) {
                ctx.fillStyle = 'rgb(255, 255, 255)';
            } else if (map[j][i] == 2) {
                ctx.fillStyle = 'rgb(255, 0, 0)';
            } else if (map[j][i] == 3) {
                ctx.fillStyle = 'rgb(0, 255, 0)';
            } else if (map[j][i] == 4) {
                ctx.fillStyle = 'rgb(0, 0, 255)';
            } 
            ctx.fill();
            ctx.strokeStyle = 'rgb(100, 100, 100)';
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function setPlayer(x, y, a) { // x, y, angle
    if (mode == 0) {
        if (map[Math.floor(y / 50)][Math.floor(x / 50)] == 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setMap();
            ctx.beginPath();
            ctx.rect(x - 5, y - 5, 10, 10);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.closePath();
    
            playerPos = [x, y];
            playerPosBlock = [Math.floor(x / 50), Math.floor(y / 50)];
        } else if (map[Math.floor(y / 50)][Math.floor(x / 50)] == 4) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setMap();
            ctx.beginPath();
            ctx.rect(x - 5, y - 5, 10, 10);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.closePath();
    
            playerPos = [x, y];
            playerPosBlock = [Math.floor(x / 50), Math.floor(y / 50)];
        }
        setRotation(x, y, a);
        if (playerRot > 360) {
            playerRot = 0;
        } else if (playerRot < 0) {
            playerRot = 360;
        }
    } else {
        if (x < 0) {
            x = 0;
        } else if (y < 0) {
            y = 0;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setMap();
        ctx.beginPath();
        ctx.rect(x * 50, y * 50, 50, 50);
        ctx.fillStyle = getColor(255, editBlock, 0);
        ctx.fill();
        ctx.closePath();
        setRotation(playerPos[0], playerPos[1], playerRot);
    }
}

function setRotation(x, y, a) { // x, y, angle
    playerRot = a;
    ctx3d.clearRect(0, 0, canvas3d.width, canvas3d.height);
    let grd = ctx3d.createLinearGradient(0, 0, 0, canvas3d.height / 2);
    grd.addColorStop(0, "rgb(100, 100, 100)");
    grd.addColorStop(1, "rgb(0, 0, 0)");
    ctx3d.fillStyle = grd;
    ctx3d.fillRect(0, 0, canvas3d.width, canvas3d.height / 2);

    let grd2 = ctx3d.createLinearGradient(0, canvas3d.height / 2, 0, canvas3d.height);
    grd2.addColorStop(0, "rgb(0, 0, 0)");
    grd2.addColorStop(1, "rgb(100, 100, 100)");
    ctx3d.fillStyle = grd2;
    ctx3d.fillRect(0, canvas3d.height / 2, canvas3d.width, canvas3d.height);
    for (let i = -1 * FOV / 2; i < FOV / 2; i += HES) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        rayCasting(x, y, a + i, 0, canvas3d.width / FOV * (i + FOV / 2));
        ctx.stroke();
        ctx.closePath();
    }

    // ctx.beginPath();
    // ctx.moveTo(x, y);
    // rayCasting(x, y, ((1 / Math.atan(getTest(x, y, a, 0, 0) / 1) * Math.PI / 2) * (180 / Math.PI)), 0, 0);
    // ctx.stroke();
    // ctx.closePath();

    // document.getElementById('status').innerHTML = `pos : [${x}, ${y}]<br>pos(block) : [${playerPosBlock[0]}, ${playerPosBlock[1]}]<br>rot : ${a}<br>rot(radian) : ${a * Math.PI / 180}<br>rot(radian(pi)) : ${a / 180}π`;
}

function getPosInBlock(p, m) { // position, minus
    let temp = p;
    while (temp > 50) {
        temp -= 50;
    }
    return m ? (50 - temp) : temp;
}

function getAngle(w, h, a, b, c) { // width, height, a, b, c
    // Math.atan(w / h) + Math.PI       ul FF
    // - Math.atan(w / h) + Math.PI     ur TF
    // 2 * Math.PI - Math.atan(w / h)   dl FT
    // Math.atan(w / h)                 dr TT

    let result = a + b * Math.atan(w / h) + c;
    return result;
}

function rayCasting(x, y, a, d, n) { // x, y, angle, distance, number(line id in 3D)
    if (a > 360) {
        a -= 360;
    } else if (a < 0) {
        a += 360;
    }
    let radA = a * Math.PI / 180;

    let ul = getAngle(getPosInBlock(x, false), getPosInBlock(y, false), 0, 1, Math.PI);
    let ur = getAngle(getPosInBlock(x, true), getPosInBlock(y, false), 0, -1, Math.PI);
    let dl = getAngle(getPosInBlock(x, false), getPosInBlock(y, true), 2 * Math.PI, -1, 0);
    let dr = getAngle(getPosInBlock(x, true), getPosInBlock(y, true), 0, 1, 0);

    let tan = Math.tan(a * (Math.PI / 180));
    let cot = 1 / tan;

    let dp = [x + getPosInBlock(y, true) * tan, y + getPosInBlock(y, true)];
    let rp = [x + getPosInBlock(x, true), y + getPosInBlock(x, true) * cot];
    let up = [x - getPosInBlock(y, false) * tan, y - getPosInBlock(y, false)];
    let lp = [x - getPosInBlock(x, false), y - getPosInBlock(x, false) * cot];

    function draw(p, c, _a, _b, _c, _d) {
        if (map[Math.floor((p[1] - _c) / 50)][Math.floor((p[0] - _d) / 50)] == 0) {
            rayCasting(p[0] + _b, p[1] + _a, a, d + Math.sqrt((p[0] - x)**2 + (p[1] - y)**2), n);
        } else {
            if (mode == 0) {
                ctx.lineTo(p[0], p[1]);
                ctx.strokeStyle = getColor(c, map[Math.floor((p[1] - _c) / 50)][Math.floor((p[0] - _d) / 50)], 0);
            }
            draw3D(d + Math.sqrt((p[0] - x)**2 + (p[1] - y)**2), n, c, map[Math.floor((p[1] - _c) / 50)][Math.floor((p[0] - _d) / 50)]);
        }
    }

    if (dl < radA || radA < dr) {
        draw(dp, 255, 1, 0, 0, 0)
    } else if (dr < radA && radA < ur) {
        draw(rp, 200, 0, 1, 0, 0)
    } else if (ur < radA && radA < ul) {
        draw(up, 255, 0, 0, 1, 0)
    } else if (ul < radA && radA < dl) {
        draw(lp, 200, 0, 0, 0, 1)
    }
}

setMap();
setPlayer(75, 75, 45);

setInterval(() => {
    if (mode == 0) {
        // w sinx, cosx
        // s sin(x+180) => -sinx, cos(x+180) => -cosx
        // a sin(x+90) => cosx, cos(x+90) => -sinx
        // d sin(x+270) => -cosx, cos(x+270) => sinx
        if (nowKey.w == true) {
            setPlayer(playerPos[0] + speed * Math.sin(playerRot * Math.PI / 180), playerPos[1] + speed * Math.cos(playerRot * Math.PI / 180), playerRot);
        }
        if (nowKey.s == true) {
            setPlayer(playerPos[0] + speed * - Math.sin(playerRot * Math.PI / 180), playerPos[1] + speed * - Math.cos(playerRot * Math.PI / 180), playerRot);
        }
        if (nowKey.a == true) {
            setPlayer(playerPos[0] + speed * Math.cos(playerRot * Math.PI / 180), playerPos[1] + speed * - Math.sin(playerRot * Math.PI / 180), playerRot);
        }
        if (nowKey.d == true) {
            setPlayer(playerPos[0] + speed * - Math.cos(playerRot * Math.PI / 180), playerPos[1] + speed * Math.sin(playerRot * Math.PI / 180), playerRot);
        }
        if (nowKey.ArrowLeft == true) {
            setPlayer(playerPos[0], playerPos[1], playerRot + 1.5);
        }
        if (nowKey.ArrowRight == true) {
            setPlayer(playerPos[0], playerPos[1], playerRot - 1.5);
        }
        if (nowKey.ArrowUp == true) {
            speed = 3;
        } else if (nowKey.ArrowUp == false) {
            speed = 1;
        }
    }
    // if (view && (playerRot > 150)) {
    //     setPlayer(playerPos[0], playerPos[1], playerRot - 0.5);
    // }
}, 10);

setInterval(() => {
    if (mode == 1) {
        if (editPos[0] < 0) {
            editPos[0] = 0;
        } else if (editPos[1] < 0) {
            editPos[1] = 0;
        }
        if (nowKey.ArrowUp == true) {
            setPlayer(editPos[0], editPos[1] -= 1, playerRot);
        }
        if (nowKey.ArrowDown == true) {
            setPlayer(editPos[0], editPos[1] += 1, playerRot);
        }
        if (nowKey.ArrowLeft == true) {
            setPlayer(editPos[0] -= 1, editPos[1], playerRot);
        }
        if (nowKey.ArrowRight == true) {
            setPlayer(editPos[0] += 1, editPos[1], playerRot);
        }
        if (nowKey.e == true) {
            map[editPos[1]][editPos[0]] = editBlock;
            setPlayer(editPos[0], editPos[1], playerRot);
        }
        if (nowKey.q == true) {
            map[editPos[1]][editPos[0]] = 0;
            setPlayer(editPos[0], editPos[1], playerRot);
        }
        if (nowKey.w == true) {
            editBlock ++;
            if (editBlock > 4) {
                editBlock = 1;
            }
            setPlayer(editPos[0], editPos[1], playerRot);
        }
    }
}, 100);

// let test = [5, 5]

// setInterval(() => {
//     map[test[1]][test[0]] = 0;
//     test[0] += 1;
//     map[test[1]][test[0]] = 1

//     setPlayer(playerPos[0], playerPos[1], playerRot);
// }, 1000);

window.addEventListener('keydown', e => {
    nowKey[e.key] = true;
});

window.addEventListener('keyup', e => {
    nowKey[e.key] = false;
})

function draw3D(d, n, c, b) { // distance, number(line id in 3D), color, block
    let h = canvas3d.height / d * 50;
    ctx3d.beginPath();
    ctx3d.rect(
        canvas3d.width - n, //x
        canvas3d.height / 2 - (h / 2) , //y
        canvas3d.width * HES / FOV + 1, //w
        h //h
    );
    ctx3d.fillStyle = getColor(c, b, d);
    ctx3d.fill();
    ctx3d.closePath();
}

function setMode() {
    if (mode == 0) {
        mode = 1;
        document.getElementById('map').style.width = `700px`;
        document.getElementById('map').style.height = `700px`;
        document.getElementById('map').style.top = `calc(50vh - 350px)`;
        document.getElementById('map').style.left = `calc(50vw - 350px)`;
        document.getElementById('map').style.transform = `translateY(-20px) scale(1.03)`;
        setTimeout(() => {
            document.getElementById('map').style.transform = `translateY(5px) scale(1)`;
            setTimeout(() => {
                document.getElementById('map').style.transform = `translateY(0)`;
            }, 400);
        }, 300);
        document.getElementById('display2d').style.transform = `scale(1)`;
        document.getElementById('display2d').style.top = `100px`;
        document.getElementById('display2d').style.left = `100px`;
    } else if (mode == 1) {
        mode = 0;
        document.getElementById('map').style.width = `200px`;
        document.getElementById('map').style.height = `100px`;
        document.getElementById('map').style.top = `calc(100vh - 120px)`;
        document.getElementById('map').style.left = `calc(50vw - 100px)`;
        document.getElementById('map').style.transform = `translateY(20px) scale(0.97)`;
        setTimeout(() => {
            document.getElementById('map').style.transform = `translateY(-5px) scale(1)`;
            setTimeout(() => {
                document.getElementById('map').style.transform = `translateY(0)`;
            }, 400);
        }, 300);
        document.getElementById('display2d').style.transform = `scale(0)`;
        document.getElementById('display2d').style.top = `calc(-250px + 50px)`;
        document.getElementById('display2d').style.left = `calc(-250px + 100px)`;
    }
}

function getColor(c, b, d) {
    let result =
        b == 1 ? `rgb(${c - d / 5}, ${c - d / 5}, ${c - d / 5})` :
        b == 2 ? `rgb(${c - d / 5}, 0, 0)` :
        b == 3 ? `rgb(0, ${c - d / 5}, 0)` :
        `rgb(0, 0, ${c - d / 5})`

    return result;
}

// function setView() {
//     view = true;
// }    