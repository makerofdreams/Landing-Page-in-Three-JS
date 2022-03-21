import './style.css'
import * as THREE from 'three'

// textures 
const textureLoader = new THREE.TextureLoader()
const normalSphereMap = textureLoader.load('/textures/NormalMap.png')

const light3Color = {
    color: 0x2222ed
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const objectDistance = 4

// object 1
const geometry = new THREE.SphereBufferGeometry(1.3, 64, 64)
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.9
material.roughness = 0.2
material.normalMap = normalSphereMap
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
sphere.position.y = -objectDistance * 0
scene.add(sphere)

//object 2
const mesh1 = new THREE.Mesh(
    new THREE.TorusBufferGeometry(1, 0.4, 16, 60), material
)
mesh1.position.y = -objectDistance * 1

const mesh2 = new THREE.Mesh(
    new THREE.ConeBufferGeometry(1, 2, 32), material
)
mesh2.position.y = -objectDistance * 2

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotBufferGeometry(0.8, 0.35, 100, 16), material
)
mesh3.position.y = -objectDistance * 3

mesh1.position.x = -1.8
mesh2.position.x = 1.8
mesh3.position.x = -1.8

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

// particles 
const particleCount = 800
const position = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount; i++) {
    position[i * 3 + 0] = (Math.random() - 0.5) * 9
    position[i * 3 + 1] = objectDistance * 0.5 - Math.random() * objectDistance * 4
    position[i * 3 + 2] = (Math.random() - 0.5) * 9
}

const particleGeometry = new THREE.BufferGeometry()
particleGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

const particleMaterial = new THREE.PointsMaterial({
    color: light3Color.color,
    sizeAttenuation: true,
    size: 0.03
})
const particle = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particle)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.intensity = 1
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 10
scene.add(pointLight2)

//light 3
const pointLight3 = new THREE.PointLight(light3Color.color, 2)
pointLight3.position.set(1.6, -1.52, -1.6)
pointLight3.intensity = 1.345
scene.add(pointLight3)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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

// Base camera
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
cameraGroup.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.autoRotate = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
})

let scrollY = window.scrollY
window.addEventListener('scroll', () => {
    scrollY = window.scrollY

})

const animate = () => {

    targetX = mouseX * .0005
    targetY = mouseY * .0005

    cameraGroup.position.x = targetX
    cameraGroup.position.y = targetY

    // Animate Camera 
    camera.position.y = -scrollY / sizes.height * objectDistance

    const elapsedTime = clock.getElapsedTime()

    // Animtate meshes
    for (const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime * 0.25
        mesh.rotation.y = elapsedTime * 0.25
    }

    // Update objects
    sphere.rotation.y = .7 * elapsedTime
    sphere.rotation.y += .7 * (targetX - sphere.rotation.y)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

animate()

anime.timeline({
        loop: false
    })
    .add({
        targets: '.ml15 .word',
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i
    }).add({
        targets: '.ml15',
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });