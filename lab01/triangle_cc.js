/**
 * Initialize the context of WebGL
 */
function initWebGL() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have WebGL, print tip
  if (!gl) {
    console.log('%c%s', 'color: blue', 'Unable to initialize the WebGL, your browser or machine may not support it.');
    return;
  }

  return gl;
}

/**
 * Initialize the shader
 */
function initShader(gl, type, source) {
  // Create the shader
  const shader = gl.createShader(type);

  // Send the source to shader
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // See if compiling shader falied, print tip
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('%c%s', 'color: blue', 'An error occurred compiling the shader: ' + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

/**
 * Initialize the shader program
 */
function initShaderProgram(gl, vsSource, fsSource) {
  // Create the shader program
  const shaderProgram = gl.createProgram();

  // Get shaders
  const vertexShader = initShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = initShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Attach shaders to shader program
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  // Tell WebGL the shader program, that is we use to draw
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('%c%s', 'color: blue', 'An error occurred linking program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

/**
 * Initialize the buffer
 */
function initBuffer(gl, verticePositions) {
  // Create buffer
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticePositions), gl.STATIC_DRAW);

  return positionBuffer;
}

/**
 * Draw the scene
 */
function drawScene(gl, programInfo) {
  // Clear to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.useProgram(programInfo.shaderProgram);
  gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.positionBuffer);
  gl.enableVertexAttribArray(programInfo.vertexPositionBound);
  gl.vertexAttribPointer(
    programInfo.vertexPositionBound,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.drawArrays(gl.LINE_LOOP, 0, 10);       // line
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, 10); // triangle
}

main();


