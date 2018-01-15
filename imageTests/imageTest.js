import ReactDOM from 'react-dom';
import React from 'react';

export default class ImageTest extends React.Component {



    render() {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }
        function test1() {
            var node = document.getElementById('img1');
            var height = node.height;
            var width = node.width;
            var canvas = document.createElement('canvas');
            canvas.height = height;
            canvas.width = width;

            canvas.getContext('2d').drawImage(node, 0, 0, width, height);

            var rgbData = [];
            var gradient = 'linear-gradient(';
            var w = Math.floor(width/2);

            for (var i = 1; i < height; i++) {
                var randomW = getRandomInt(0, width);
                var test = canvas.getContext('2d').getImageData(randomW, i, 1, 1).data;
                var rgb = 'rgb(' + test[0] + ',' + test[1] + ',' + test[2] + ')';
                if( i < height - 1 && i % 20 == 0) {
                    gradient = gradient + rgb + ', ';
                }
                else if ( i < height - 1 && i % 20 != 0) {
                    gradient = gradient + '';
                }
                else {
                    gradient = gradient + rgb + ')';
                }

                rgbData.push(rgb);
            }
            document.getElementById('imgGradient').style.background = gradient;
        }
        function test2() {
            // var node = document.getElementById('img2');
            // var height = node.height;
            // var width = node.width;
            // var canvas = document.createElement('canvas');
            // canvas.height = height;
            // canvas.width = width;

            // canvas.getContext('2d').drawImage(node, 0, 0, width, height);

            document.getElementById('imgGradient2').innerHTML = 'This doesn\'t do anything yet';

        }

        return (
            <div className="testContainer">
                <div className="test">
                    <img id="img1" src="../img/sky1.jpeg" onClick={test1}/>
                    <div id="imgGradient" className="gradient"></div>
                </div>
                <div className="test2">
                    <img id="img2" src="../img/sky1.jpeg" onClick={test2}/>
                    <div id="imgGradient2" className="gradient"></div>
                </div>
            </div>
            );
    }
}

