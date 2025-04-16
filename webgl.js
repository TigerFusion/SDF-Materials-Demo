"use strict";

function getWebGLContext(canvas)
{
	var context = canvas.getContext("webgl2");

	if (context === null)
	{
		alert("Your browser does not support WebGL 2");
	}
	
	return context;
}

function initShaderProgram(gl, vShader, fShader)
{
	var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vShader);
	var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShader);

	if (!vertexShader || !fragmentShader)
	{
		return null;
	}

	var shaderProgram = gl.createProgram();
	
	if (!shaderProgram)
	{
		console.log("Error: cannot create program");
		return null;
	}
	
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
	{
		alert("Error: shader program " + gl.getProgramInfoLog(shaderProgram));
		gl.deleteProgram(shaderProgram);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);
		return null;
	}
	
	return shaderProgram;
}

function loadShader(gl, type, source)
{
	var shader = gl.createShader(type);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		if (type == gl.VERTEX_SHADER)
		{
			alert("Error: vertex shader " + gl.getShaderInfoLog(shader));
		}
		else if (type == gl.FRAGMENT_SHADER)
		{
			alert("Error: fragment shader " + gl.getShaderInfoLog(shader));
		}
		
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}
