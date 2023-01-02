import('../js/light.js')
import('../js/earth.js')
import('../js/flyship.js')

var scene = new THREE.Scene(); {
	const loader = new THREE.CubeTextureLoader()
	const texture = loader.load([
		'img/1.png',
		'img/2.png',
		'img/3.png',
		'img/4.png',
		'img/5.png',
		'img/6.png',
	])
	scene.background = texture
}



var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setClearColor(new THREE.Color(0xE0FFFF));
document.body.appendChild(renderer.domElement);
camera.position.set(0, 0, 40);

var group = new THREE.Group();
group.position.set(0, -5.2, 0);
scene.add(group);

var orbit = new THREE.OrbitControls(camera, renderer.domElement);


var flag = 1

function changeview() {
	flag = !flag;
	if (flag == 1) {
		camera.position.set(0, 0, 40);
		var l = new THREE.Vector3(0, 0, 0);
		camera.lookAt(l)
	}

}
var line_flag=1
function visline() {
	line_flag=!line_flag
}
