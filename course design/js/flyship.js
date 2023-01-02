// model
var groupm = new THREE.Group()
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('model/');
mtlLoader.load('a.mtl', function(materials) {

	materials.preload();

	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('model/');
	objLoader.load('a.obj', function(mesh) {
		groupm.add(mesh)
		scene.add(groupm)

	})
})
// console.log(mesh)
console.log(groupm)
groupm.position.set(0, 5.6, 0)
groupm.scale.set(0.005, 0.005, 0.005);




const initialPoints = [{
		x: 5,
		y: 5,
		z: -5
	},
	{
		x: 5,
		y: 0,
		z: 5
	},
	{
		x: -5,
		y: -3,
		z: 5
	},
	{
		x: -5,
		y: 0,
		z: -5
	}
];

const addCube = (pos) => {
	const geometry = new THREE.BoxBufferGeometry(0.3, 0.3, 0.3);
	const material = new THREE.MeshBasicMaterial(0x00ff00);
	const cube = new THREE.Mesh(geometry, material);
	cube.position.copy(pos);
	scene.add(cube);
	return cube
}

const cubeList = initialPoints.map(pos => {
	return addCube(pos);
});


const curve = new THREE.CatmullRomCurve3(
	cubeList.map((cube) => cube.position) // 直接绑定方块的position以便后续用方块调整曲线
);
curve.curveType = 'chordal'; // 曲线类型
curve.closed = true; // 曲线是否闭合

const points = curve.getPoints(50); // 50等分获取曲线点数组
const line = new THREE.LineLoop(
	new THREE.BufferGeometry().setFromPoints(points),
	new THREE.LineBasicMaterial({
		color: 0x00ff00
	})
); // 绘制实体线条，仅用于示意曲线，后面的向量线条同理，相关代码就省略了

scene.add(line);


var mesh = groupm

var position

function changePosition(t) {
	position = curve.getPointAt(t); // t: 当前点在线条上的位置百分比，后面计算
	mesh.position.copy(position);
	// console.log(position)
	if (flag == 0)
		camera.position.copy(position);
}

function changeLookAt(t) {
	var tangent = curve.getTangentAt(t);
	var lookAtVec = tangent.add(position); // 位置向量和切线向量相加即为所需朝向的点向量
	mesh.lookAt(lookAtVec);
	if (flag == 0)
		camera.lookAt(lookAtVec)
}

const loopTime = 10 * 1000; // loopTime: 循环一圈的时间

// 在渲染函数中获取当前时间
const render = () => {
	let time = Date.now();
	let t = (time % loopTime) / loopTime; // 计算当前时间进度百分比

	changePosition(t);
	changeLookAt(t);
	if(line_flag==0)
		scene.remove(line)
	else
		scene.add(line)
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

requestAnimationFrame(render);




