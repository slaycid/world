/* global THREE */

window.addEventListener('load', init)
let scene
let camera
let renderer
let mesh

function init() {
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 40
  
  
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  
  const controls = new THREE.OrbitControls(camera)
  controls.enableZoom = false
  
  scene.add(new THREE.AmbientLight(0x404040)) 
  
  const loader = new THREE.OBJLoader()
  loader.load('https://cdn.glitch.com/fcf3c007-b4eb-4250-ba6b-653fdab94ce3%2Fjapanese_temple.obj?1558792651869',
              (obj) => {
                    let material = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.25 })
                    mesh = new THREE.Points(obj.children[0].geometry, material)
                    mesh.position.y = -15
                    scene.add(mesh)
                    
                },
              (xhr) => {
                  console.log(xhr)
              },
              (err) => {
                  console.error("loading .obj went wrong, ", err)
                }
             )
  
  document.body.appendChild(renderer.domElement)
  animationLoop()
}

function animationLoop() {
  renderer.render(scene, camera)
  if(mesh) {
    mesh.rotation.y += 0.005
  }
  requestAnimationFrame(animationLoop)
}
