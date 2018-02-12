import ReactDOM from 'react-dom';
import React from 'react';

export default class ImageTest extends React.Component {

    imageTest = () => {
        var node = document.getElementById('img');
        var height = node.height;
        var width = node.width;
        var canvas2 = document.getElementById('canvas2');
        var canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        var context = canvas.getContext('2d');
        context.drawImage(node, 0, 0, width, height);

        canvas2.height = height;
        canvas2.width = width;
        var context2 = canvas2.getContext('2d');

        var midHor = Math.floor(width/4);
        var midVer = Math.floor(height/4);
        var q1 = {x: 0,y: 0};
        var q2 = {x: midHor,y: 0};
        var q3 = {x: midHor*2,y: 0};
        var q4 = {x: midHor*3,y: 0};

        var q5 = {x: 0,y: midVer};
        var q6 = {x: midHor,y: midVer};
        var q7 = {x: midHor*2,y: midVer};
        var q8 = {x: midHor*3,y: midVer};

        var q9 = {x: 0,y: midVer*2};
        var q10 = {x: midHor,y: midVer*2};
        var q11 = {x: midHor*2,y: midVer*2};
        var q12 = {x: midHor*3,y: midVer*2};

        var q13 = {x: 0,y: midVer*3};
        var q14 = {x: midHor,y: midVer*3};
        var q15 = {x: midHor*2,y: midVer*3};
        var q16 = {x: midHor*3,y: midVer*3};

        var qArr = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16];

        var colors = [];

        for (var i = 0; i < qArr.length; i++) {
            var x = qArr[i].x;
            var y = qArr[i].y;
            var color = this.averageRGB(context,x,x+midHor,y, y+midVer);
            colors.push(color);

            context2.beginPath();
            context2.strokeRect(x,y,midHor,midVer);
            context2.strokeStyle = color;

            context2.fill();
            context2.beginPath();
            context2.rect(x,y,midHor,midVer);
            context2.fillStyle = color;

            context2.fill();
        }

        
        for (var i = 0; i < 4; i++) {
            var div = document.createElement('div')
            var el = document.getElementById('gradients');
            var gradient = 'linear-gradient(' + colors[i] + ',' + colors[i+4] + ',' + colors[i+8] + ',' + colors[i+12]+  ')';
            div.setAttribute('style', 'background: '+ gradient + '; height: 100%; width: 25%; display: inline-block; float: left;');
            el.append(div);
        }
        
    }

    averageRGB = (context,xMin,xMax,yMin,yMax) => {
        var r = 0;
        var g = 0;
        var b = 0;
        var col = yMax + 1;
        var row = xMax + 1;
        var max = xMax * yMax;

        for (var i = xMin; i < row; i++) {
            var r2 = 0;
            var g2 = 0;
            var b2 = 0;
            var count = 0;
            for (var j = yMin; j < col; j++) {
                var data = context.getImageData(i, j, 1, 1).data;
                r2 = r2 + Math.pow(data[0], 2);
                g2 = g2 + Math.pow(data[1], 2);
                b2 = b2 + Math.pow(data[2], 2);
                count = count +1;
            }
            r2 = Math.floor(Math.sqrt(r2/count));
            g2 = Math.floor(Math.sqrt(g2/count));
            b2 = Math.floor(Math.sqrt(b2/count));

            r = r + r2;
            g = g + g2;
            b = b + b2;

        }
        var total = xMax - xMin;
        r = Math.floor(r/total);
        g = Math.floor(g/total);
        b = Math.floor(b/total);

        return 'rgb('+r+','+g+','+b+')';
    }

    render() {

        return (
            <div className="testContainer">
                <div id="sky">
                    <img id="img" src="../img/sky5.png" onClick={ this.imageTest }/>
                </div>
                <div id="canvas-container">
                    <canvas id="canvas2"></canvas>
                </div>
                <div id="gradients">
                </div>
            </div>
            );
    }
}

