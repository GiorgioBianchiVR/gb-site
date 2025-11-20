import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: false
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  frameId: number | null = null;

  constructor(private router: Router) {}

  open(path: string){ this.router.navigate([path]); }

  ngAfterViewInit(): void {
    const el = this.container.nativeElement;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000014);

        this.camera = new THREE.PerspectiveCamera(35, el.clientWidth / el.clientHeight, 0.1, 1000);
        this.camera.position.z = 5.5;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(el.clientWidth, el.clientHeight);
        el.appendChild(this.renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 128, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0x39fff0, metalness: 0, roughness: 0.2 });
        const knot = new THREE.Mesh(geometry, material);
        this.scene.add(knot);

        const light = new THREE.PointLight(0x39fff0, 2.5);
        light.position.set(5, 5, 5);
        this.scene.add(light);

        const ambient = new THREE.AmbientLight(0x404040, 0.7);
        this.scene.add(ambient);

        const animate = () => {
          knot.rotation.x += 0.01;
          knot.rotation.y += 0.015;
          // knot.position.x += 0.01;
          // knot.position.y += 0.015;
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
      }

      ngOnDestroy(): void {
        if (this.frameId !== null) cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.onResize);
        if (this.renderer) this.renderer.dispose();
      }
}
