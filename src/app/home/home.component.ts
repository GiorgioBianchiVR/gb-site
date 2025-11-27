import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  frameId: number | null = null;

  constructor(private router: Router) {}

  open(path: string) {
    this.router.navigate([path]);
  }

  ngAfterViewInit(): void {
    const el = this.container.nativeElement;
    const meshColor: THREE.ColorRepresentation = 0x39fff0;
    const pointLightColor: THREE.ColorRepresentation = 0xfff5b6;
    const ambientLightColor: THREE.ColorRepresentation = 0x404040;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      35,
      el.clientWidth / el.clientHeight
    );
    this.camera.position.z = 8.5;

    const controls = new OrbitControls(this.camera, el);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = true;
    controls.enableDamping = true;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(this.renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 128, 16);
    const material = new THREE.MeshStandardMaterial({
      color: meshColor,
      metalness: 0.2,
      roughness: 0.5,
    });
    const knot = new THREE.Mesh(geometry, material);
    this.scene.add(knot);

    const light = new THREE.PointLight(pointLightColor, 8.5);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    const ambient = new THREE.AmbientLight(ambientLightColor, 1.2);
    this.scene.add(ambient);

    const animate = () => {
      knot.rotation.x += 0.005;
      knot.rotation.y += 0.004;
      controls.update();
      this.renderer.render(this.scene, this.camera);
      this.frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', this.onResize);
  }

  onResize = () => {
    const el = this.container.nativeElement;
    this.camera.aspect = el.clientWidth / el.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(el.clientWidth, el.clientHeight);
  };

  ngOnDestroy(): void {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onResize);
    if (this.renderer) this.renderer.dispose();
  }
}
