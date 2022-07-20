import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { MeshStandardMaterial } from 'three'

// Loading 
const loader=new THREE.TextureLoader()
const textureLoader=new THREE.TextureLoader()
const normalTexture=textureLoader.load('/textures/NormalMap.png')
const cross1=loader.load('/textures/cross123.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry=new THREE.SphereBufferGeometry(0.45,64,64);
const geometry2=new THREE.TorusGeometry(.7,.2,16,100);
const particlesGeometry=new THREE.BufferGeometry;
const particlesCnt=30000;
const posArray=new Float32Array(particlesCnt*3);
for(let i=0;i<particlesCnt*3;i++)
{
    posArray[i]=(Math.random()-0.5)*(Math.random()*5)
}
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(posArray,3));

// Materials
const material2=new THREE.PointsMaterial({
  size: 0.005
})
const particlesMaterial=new THREE.PointsMaterial({
    size: 0.005,
    map: cross1,
    transparent:true,
    color:'white'
    
   

  })

const material = new THREE.MeshStandardMaterial()
material.metalness=0.7
material.roughness=0.2
material.normalMap=normalTexture;

material.color = new THREE.Color(0xffffff)
material2.color=new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
const sphere2=new THREE.Points(geometry2,material2)

scene.add(sphere)

scene.add(sphere2)
const particleMesh=new THREE.Points(particlesGeometry,particlesMaterial)
scene.add(particleMesh)
// Light1

const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 1
scene.add(pointLight)

//light2
const pointLight2 = new THREE.PointLight(0xde1515, 2)
pointLight2.position.set(-3.33,2.23,-1.87)

pointLight2.intensity=10

scene.add(pointLight2)
// const light1=gui.addFolder('Light 1')

// light1.add(pointLight2.position,'x').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position,'y').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position,'z').min(-6).max(6).step(0.01)
// light1.add(pointLight2,'intensity').min(0).max(10).step(0.01)

// const light1color={
//     color:0xff0000
// }
// light1.addColor(light1color,'color')
// .onChange(()=>{
//     pointLight2.color.set(light1color.color)
// })
// const pointLightHelper =new THREE.PointLightHelper(pointLight2,0.5)
// scene.add(pointLightHelper)
//light3
const pointLight3 = new THREE.PointLight(0x2036d2, 2)
pointLight3.position.x = 4.35
pointLight3.position.y = -2
pointLight3.position.z = -1.08
pointLight3.intensity=10

scene.add(pointLight3)
// const light2=gui.addFolder('Light 2')


// light2.add(pointLight3.position,'x').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position,'y').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position,'z').min(-6).max(6).step(0.01)
// light2.add(pointLight3,'intensity').min(0).max(10).step(0.01)

// const light2color={
//     color:0xff0000
// }
// light2.addColor(light2color,'color')
// .onChange(()=>{
//     pointLight3.color.set(light2color.color)
// })
// const pointLightHelper2 =new THREE.PointLightHelper(pointLight3,0.5)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2.5


scene.add(camera)

// Controls
// const controls = new OrbitControls(camera,


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove',onDocumentMouseMove)

let mouseX=0;
let mouseY=0;
let targetX=0;
let targetY=0;
const windowX=innerWidth/2;
const windowY=innerHeight/2;
function onDocumentMouseMove(event){
    mouseX=(event.clientX-windowX)
    mouseY=(event.clientY-windowY)

}

const updateSphere=(event)=>{
    sphere.position.y=window.scrollY* .001
    }
    window.addEventListener('scroll',updateSphere);
 

const clock = new THREE.Clock()

const tick = () =>
{
targetX=mouseX* .001
targetY=mouseY* .001
    const elapsedTime = clock.getElapsedTime()
    particleMesh.rotation.y=-0.01*(elapsedTime)
    // Update objects
    sphere.rotation.y = 0.8* elapsedTime
    // sphere2.rotation.x = 0.5* elapsedTime
    if(mouseX>0)
    {
    particleMesh.rotation.x=-mouseY*(elapsedTime*0.00008)
    particleMesh.rotation.y=-mouseX*(elapsedTime*0.00008)
    }

    sphere2.rotation.y = -(0.4* elapsedTime)
  
// sphere2.rotation.y+=.5*(targetX-sphere.rotation.y)
// sphere2.rotation.x+=.5*(targetY-sphere.rotation.x)
  




    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()