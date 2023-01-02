"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		-0.1, -0.1, 
		 0.0,  0.1, 
		 0.1, 0.0, 
		/*0.3, 0.1,
		0.5, -0.1,
		 0.5,  0.1,
		 0.3, -0.1,
		 0.5,  -0.1,
		 0.3,  0.1
		  /*-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5*/
	];
	
	 let colors = [
	    1.0, 0.0, 0.0, 1.0, // red
	    0.0, 1.0, 0.0, 1.0, // green
	    0.0, 0.0, 1.0, 1.0, // blue
	  ];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	render();
}
  function setColorBuffers(gl, shaderProgram, colorData) {
    // 创建空白的缓冲对象
    const buffer = gl.createBuffer();
    // 绑定目标
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // WebGL 不支持直接使用 JavaScript 原始数组类型，需要转换
    const dataFormat = new Float32Array(colorData);
    // 初始化数据存储
    gl.bufferData(gl.ARRAY_BUFFER, dataFormat, gl.DYNAMIC_DRAW);

    // 获取对应数据索引，变量跟顶点着色器里面对应
    const vertexPos = gl.getAttribLocation(shaderProgram, "vertexColor");
    // 解析顶点数据
    gl.vertexAttribPointer(vertexPos, 4, gl.FLOAT, false, 0, 0);
    // 启用顶点属性，顶点属性默认是禁用的。
    gl.enableVertexAttribArray(vertexPos);
  }
  
function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, 3);
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}

