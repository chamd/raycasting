let canvas = document.getElementById('display2d')
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');

let canvas3d = document.getElementById('display3d');
/** @type {CanvasRenderingContext2D} */
let ctx3d = canvas3d.getContext('2d');

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
let speed = 1;
// let view = false;

function setMap() {
    for (let i = 0; i < map[0].length; i++) {
        for (let j = 0; j < map.length; j++) {
            ctx.beginPath();
            ctx.rect(i * 50, j * 50, 50, 50);
            if (map[j][i] == 0) {
                ctx.fillStyle = 'rgb(0, 0, 0)';
            } else {
                ctx.fillStyle = 'rgb(255, 255, 255)';
            }
            ctx.fill();
            ctx.strokeStyle = 'rgb(100, 100, 100)';
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function setPlayer(x, y, a) {
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
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fill();
        ctx.closePath();
    }
}

function setRotation(x, y, a) {
    playerRot = a;
    ctx3d.clearRect(0, 0, canvas3d.width, canvas3d.height);
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

function getPosInBlock(p, m) {
    let temp = p;
    while (temp > 50) {
        temp -= 50;
    }
    return m ? (50 - temp) : temp;
}

function getAngle(w, h, a, b, c) {
    // Math.atan(w / h) + Math.PI       ul FF
    // - Math.atan(w / h) + Math.PI     ur TF
    // 2 * Math.PI - Math.atan(w / h)   dl FT
    // Math.atan(w / h)                 dr TT

    let result = a + b * Math.atan(w / h) + c;
    return result;
}

function rayCasting(x, y, a, d, n) {
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

    if (dl < radA || radA < dr) {
        if (map[Math.floor(dp[1] / 50)][Math.floor(dp[0] / 50)] == 0) {
            rayCasting(dp[0], dp[1] + 1, a, d + Math.sqrt((dp[0] - x)**2 + (dp[1] - y)**2), n);
        } else {
            ctx.lineTo(dp[0], dp[1]);
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            draw3D(d + Math.sqrt((dp[0] - x)**2 + (dp[1] - y)**2), n, 255);
        }
    } else if (dr < radA && radA < ur) {
        if (map[Math.floor(rp[1] / 50)][Math.floor(rp[0] / 50)] == 0) {
            rayCasting(rp[0] + 1, rp[1], a, d + Math.sqrt((rp[0] - x)**2 + (rp[1] - y)**2), n);
        } else {
            ctx.lineTo(rp[0], rp[1]);
            ctx.strokeStyle = 'rgb(200, 0, 0)';
            draw3D(d + Math.sqrt((rp[0] - x)**2 + (rp[1] - y)**2), n, 200);
        }
    } else if (ur < radA && radA < ul) {
        if (map[Math.floor((up[1] - 1) / 50)][Math.floor(up[0] / 50)] == 0) {
            rayCasting(up[0], up[1], a, d + Math.sqrt((up[0] - x)**2 + (up[1] - y)**2), n);
        } else {
            ctx.lineTo(up[0], up[1]);
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            draw3D(d + Math.sqrt((up[0] - x)**2 + (up[1] - y)**2), n, 255);
        }
    } else if (ul < radA && radA < dl) {
        if (map[Math.floor(lp[1] / 50)][Math.floor((lp[0] - 1) / 50)] == 0) {
            rayCasting(lp[0], lp[1], a, d + Math.sqrt((lp[0] - x)**2 + (lp[1] - y)**2), n);
        } else {
            ctx.lineTo(lp[0], lp[1]);
            ctx.strokeStyle = 'rgb(200, 0, 0)';
            draw3D(d + Math.sqrt((lp[0] - x)**2 + (lp[1] - y)**2), n, 200);
        }
    }
}

setMap();
setPlayer(75, 75, 225);

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
            map[editPos[1]][editPos[0]] = 1;
            setMap();
        }
        if (nowKey.q == true) {
            map[editPos[1]][editPos[0]] = 0;
            setMap();
        }
    }
}, 100);

window.addEventListener('keydown', e => {
    nowKey[e.key] = true;
});

window.addEventListener('keyup', e => {
    nowKey[e.key] = false;
})

function draw3D(d, n, c) {
    ctx3d.beginPath();
    ctx3d.rect(
        canvas3d.width - n, //x
        canvas3d.height / 2 - (30000 / d / 2), //y
        canvas3d.width * HES / FOV + 1, //w
        30000 / d//h
    );
    ctx3d.fillStyle = `rgb(${c - d / 5}, 0, 0)`;
    ctx3d.fill();
    ctx3d.closePath();
}

function setMode(m) {
    mode = m;
}

// function setView() {
//     view = true;
// }