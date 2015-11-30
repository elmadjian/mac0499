
var scroll = 'none';

var infotag = document.createElement('div');
    infotag.id = 'infotag';
    infotag.style.position = 'fixed';
    infotag.style.width = '240px';   
    infotag.style.height = '135px';
    infotag.style.zIndex = 99;
    infotag.style.display = 'none';
    //infotag.style.backgroundColor = "red";
    //infotag.style.padding = "30px 10px 10px 30px";

var img = chrome.extension.getURL('images/fundo.png');
    infotag.style.backgroundImage = "url('" + img + "')";

var innertag = document.createElement('div');
    innertag.id = "innertag";
    infotag.appendChild(innertag);
    innertag.style.padding = "45px 10px 10px 40px";

var bolinha = document.createElement('div');
    bolinha.id = 'bolinha';
    bolinha.style.position = 'fixed';
    bolinha.style.width = '25px';
    bolinha.style.height = '25px';
    bolinha.style.display = 'block';
    bolinha.style.backgroundColor = 'red';
    bolinha.style.zIndex = 98;

var centro = document.createElement('div');
    centro.id = 'centro';
    centro.style.position = 'fixed';
    centro.style.width = '7px';
    centro.style.height = '7px';
    centro.style.display = 'block';
    centro.style.backgroundColor = 'blue';
    centro.style.zIndex = 99;

document.body.appendChild(infotag);
document.body.appendChild(bolinha);
document.body.appendChild(centro);

window.onload = function() {
    $('*').blast({delimiter: 'word'});
    $('*').css('lineHeight', 3);
    $('#innertag').css('lineHeight', 1.5);
    //$('.blast').css('height', '30px');

    var eyeBuffer = [];
    var centroideAnterior = {x:0, y:0};
    var socket = new WebSocket('ws://127.0.0.1:8089');
    socket.onopen = function(evt) {
        console.log("conexao com servidor aberta");
        // socket.send(JSON.stringify({
        //     h: window.innerHeight, 
        //     w: window.innerWidth
        // }));
    };
    console.log()
    socket.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        eyeBuffer.push({x: data.x, y: data.y - 52});
        $('#bolinha').css('left', data.x + 'px');
        $('#bolinha').css('top', data.y - 52 + 'px');
        var eyePosition = new CustomEvent('eyeposition', {
            detail: {
                x: data.x,
                y: data.y - 52
            }
        });
        document.dispatchEvent(eyePosition);

        if (eyeBuffer.length == 30) {
            var centroide = calculaCentroide(eyeBuffer);
            //console.log("centroide:", centroide);
            if (checaFixacaoLonga(eyeBuffer, centroide) && 
            !diferencaCentroide(centroide, centroideAnterior)) {
                console.log("FIXACAO");
                $('#bolinha').css('backgroundColor', 'green');
                var fixacao = new CustomEvent('fixacao', {
                    detail: {
                        x: centroide.x,
                        y: centroide.y
                    }
                }); 
                document.dispatchEvent(fixacao);
            }
            else {
                console.log("nope...");
                $('#bolinha').css('backgroundColor', 'red');
            }
            centroideAnterior = centroide;
            eyeBuffer.splice(0,15);
        }
    };
}

//================================================
function diferencaCentroide(atual, anterior) {
    if (Math.pow(atual.x - anterior.x, 2) + Math.pow(atual.y - anterior.y, 2) > 325)
        return false;
    return true;
}

//================================================
function calculaCentroide(eyeBuffer) {
    var xcenter = 0;
    var ycenter = 0;
    for (var i = 0; i < eyeBuffer.length; i++) {
        xcenter += eyeBuffer[i].x;
        ycenter += eyeBuffer[i].y;
    }
    return {
        x: xcenter/eyeBuffer.length,
        y: ycenter/eyeBuffer.length
    };
}

//================================================
function checaFixacaoLonga(eyeBuffer, c) {
    var outCount = 0;
    for (var i = 0; i < eyeBuffer.length; i++) {
        if (Math.pow(eyeBuffer[i].x - c.x,2) + Math.pow(eyeBuffer[i].y - c.y, 2) > 325)
            outCount++;
        if (outCount > 9)
            return false;
    }
    return true;
}

//detecta movimento do mouse para saber se ele ultrapassou
//um limiar para fazer a tela rolar
//==================================================
document.addEventListener('eyeposition', function(evt) {
    if (evt.detail.y > 635)
        scroll = 'down';
    else if (evt.detail.y < 80)
        scroll = 'up';
    else
        scroll = 'none';
    });


//=================================================
document.addEventListener('fixacao', function(evt) {
    var xpos = parseInt(evt.detail.x);
    var ypos = parseInt(evt.detail.y);
    var word = document.elementFromPoint(xpos, ypos);
    var wordup, worddown, yposd = ypos, yposu = ypos;
    console.log("achei classe:", word.className);
    var tag = document.getElementById('infotag');
    var itag = document.getElementById('innertag');
    $('#centro').css('left', xpos + 'px');
    $('#centro').css('top', ypos + 'px');
    //console.log("fixacao: h:", xpos, " v:", ypos);

    var i = 0;
    while (word.className != 'blast' && i < 30) {
        yposd++;
        yposu--;
        wordup = document.elementFromPoint(xpos, yposu);
        worddown = document.elementFromPoint(xpos, yposd);
        if (wordup.className == 'blast') {
            word = wordup;
            console.log("achei wordup:", word.className, wordup.className);
        }
        else if (worddown.className == 'blast') {
            word = worddown;
            console.log("achei worddow:", word.className, worddown.className);
        }
        i++;
    }
    if (word.className == 'blast') {
        var selectedWord = word.innerHTML;
        itag.innerHTML = selectedWord + ":<br>";
        //traduzPalavra(selectedWord, itag, word);
    }
    else
        itag.innerHTML = '';
    tag.style.top = ypos + 15 + 'px';
    tag.style.left = xpos - 45 + 'px';
    $('#infotag').fadeIn(100);
});

document.addEventListener('click', function(evt) {
    console.log("mouseclick: h:", evt.clientX, " v:", evt.clientY);
    console.log("elemento:")
});

//!DEBUG ONLY - DEACTIVATE THIS, PLEASE!
//==================================================
document.addEventListener('click', function(evt) {
    var xpos = evt.clientX;
    var ypos = evt.clientY;
    var word = document.elementFromPoint(xpos, ypos);
    var wordup, worddown, yposd = ypos, yposu = ypos;
    console.log("achei classe:", word.className);
    var tag = document.getElementById('infotag');
    var itag = document.getElementById('innertag');
    $('#centro').css('left', xpos + 'px');
    $('#centro').css('top', ypos + 'px');
    //console.log("fixacao: h:", xpos, " v:", ypos);

    var i = 0;
    while (word.className != 'blast' && i < 30) {
        yposd++;
        yposu--;
        wordup = document.elementFromPoint(xpos, yposu);
        worddown = document.elementFromPoint(xpos, yposd);
        if (wordup.className == 'blast') {
            word = wordup;
            console.log("achei wordup:", word.className, wordup.className);
        }
        else if (worddown.className == 'blast') {
            word = worddown;
            console.log("achei worddow:", word.className, worddown.className);
        }
        i++;
    }
    if (word.className == 'blast') {
        word.style.backgroundColor = "yellow";
        var selectedWord = word.innerHTML;
        itag.innerHTML = selectedWord + ":<br>";
        traduzPalavra(selectedWord, itag, word);
    }
    else
        itag.innerHTML = '';
    tag.style.top = ypos + 15 + 'px';
    tag.style.left = xpos - 45 + 'px';
    $('#infotag').fadeIn(100);
});

/*document.addEventListener('click', function(evt) {
    console.log("mouseclick: h:", evt.clientX, " v:", evt.clientY);
    console.log("elemento:")
});*/

//Faz a tela rolar para cima ou para baixo
//em função da posição do mouse
//=============================
window.setInterval(function() {
    if (scroll == 'down')
        window.scrollBy(0,8);
    else if (scroll == 'up')
        window.scrollBy(0,-8);
}, 15);

//Recebe uma palavra para requisição AJAX
//e devolve o termo traduzido
//========================================
function traduzPalavra(termo, innertag, wordtag) {
    var url = "https://mymemory.translated.net/api/get?q=" + termo + "&langpair=en|pt";
    $.getJSON(url, {})
     .done(function(data) {
        var lower = 0;
        var selected = 0;
        console.log(data);
        for (var i = 0; i < data.matches.length; i++) {
            if (data.matches.match > lower) {
                lower = data.matches.match;
                selected = i;
            }
        }
        innertag.innerHTML += "<b>" + data.matches[selected].translation + "</b>";
        $('#infotag').fadeOut(6200);
        wordtag.style.backgroundColor = "";
     });
}

