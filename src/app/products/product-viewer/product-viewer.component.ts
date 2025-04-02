import {
  Component,
  Input,
  type OnInit,
  type ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core"
import { CommonModule } from "@angular/common";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: "app-product-viewer",
  templateUrl: "./product-viewer.component.html",
  styleUrls: ["./product-viewer.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class ProductViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() productId!: string
  @ViewChild("container") containerRef!: ElementRef

  isFullscreen = false
  isLoading = true

  private renderer?: THREE.WebGLRenderer
  private scene?: THREE.Scene
  private camera?: THREE.PerspectiveCamera
  private controls?: OrbitControls
  private model?: THREE.Group
  private animationFrameId?: number

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initThreeJS()
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }

    if (this.renderer) {
      this.renderer.dispose()
    }

    window.removeEventListener("resize", this.handleResize)
  }

  private initThreeJS(): void {
    const container = this.containerRef.nativeElement

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf8f9fa)

    this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 5)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.minDistance = 3
    this.controls.maxDistance = 10
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 1

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(directionalLight)

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
    backLight.position.set(-1, -1, -1)
    this.scene.add(backLight)

    this.createPhoneModel()

    this.animate()

    window.addEventListener("resize", this.handleResize)

    this.isLoading = false
  }

  private createPhoneModel(): void {
    const phoneGeometry = new THREE.BoxGeometry(1, 2, 0.1)
    const phoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.2,
    })
    const phoneScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 1.8, 0.01),
      new THREE.MeshBasicMaterial({ color: 0x1e90ff }),
    )
    phoneScreen.position.z = 0.06

    this.model = new THREE.Group()
    this.model.add(new THREE.Mesh(phoneGeometry, phoneMaterial))
    this.model.add(phoneScreen)

    const cameraLens = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 32),
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.9,
        roughness: 0.1,
      }),
    )
    cameraLens.position.set(0.3, 0.8, 0.06)
    this.model.add(cameraLens)

    this.scene?.add(this.model)
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate)

    if (this.controls) {
      this.controls.update()
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  private handleResize = (): void => {
    if (!this.containerRef?.nativeElement || !this.camera || !this.renderer) return

    const container = this.containerRef.nativeElement
    this.camera.aspect = container.clientWidth / container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(container.clientWidth, container.clientHeight)
  }

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen
    setTimeout(() => {
      this.handleResize()
    }, 100)
  }

  resetView(): void {
    if (this.controls && this.camera) {
      this.controls.reset()
      this.camera.position.set(0, 0, 5)
    }
  }
}

