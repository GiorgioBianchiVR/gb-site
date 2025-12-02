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
  styleUrl: './home.component.sass',
  standalone: false,
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  frameId: number | null = null;

  public isWorkValid: boolean = false;
  public isEducationValid: boolean = false;
  public isProjectsValid: boolean = false;
  public isInchiostroValid: boolean = false;
  public isPassionsValid: boolean = false;

  private _clickCounter: number = 0;
  private _clickGoal: number = 50;

  private _educationElement: HTMLDivElement | null = null;
  public get educationElement(): HTMLDivElement | null {
    return this._educationElement;
  }
  public set educationElement(value: HTMLDivElement | null) {
    this._educationElement = value;
  }
  private _workElement: HTMLDivElement | null = null;
  public get workElement(): HTMLDivElement | null {
    return this._workElement;
  }
  public set workElement(value: HTMLDivElement | null) {
    this._workElement = value;
  }
  private _inchiostroElement: HTMLDivElement | null = null;
  public get inchiostroElement(): HTMLDivElement | null {
    return this._inchiostroElement;
  }
  public set inchiostroElement(value: HTMLDivElement | null) {
    this._inchiostroElement = value;
  }
  private _passionsElement: HTMLDivElement | null = null;
  public get passionsElement(): HTMLDivElement | null {
    return this._passionsElement;
  }
  public set passionsElement(value: HTMLDivElement | null) {
    this._passionsElement = value;
  }
  private _projectsElement: HTMLDivElement | null = null;
  public get projectsElement(): HTMLDivElement | null {
    return this._projectsElement;
  }
  public set projectsElement(value: HTMLDivElement | null) {
    this._projectsElement = value;
  }

  //TODO move interaction logic to a service
  constructor(private router: Router) {}

  public get clickCounter(): number {
    return this._clickCounter;
  }
  public set clickCounter(value: number) {
    this._clickCounter = value;
  }

  public get clickGoal(): number {
    return this._clickGoal;
  }
  public set clickGoal(value: number) {
    this._clickGoal = value;
  }

  open(path: string) {
    this.router.navigate([path]);
  }

  ngAfterViewInit(): void {
    //Save reference to elements DIV to be used in component
    this.educationElement = document.getElementById('education-link') as HTMLDivElement | null;
    this.workElement = document.getElementById('work-link') as HTMLDivElement | null;
    this.inchiostroElement = document.getElementById('inchiostro-link') as HTMLDivElement | null;
    this.passionsElement = document.getElementById('passions-link') as HTMLDivElement | null;
    this.projectsElement = document.getElementById('projects-link') as HTMLDivElement | null;

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
      //Update camera position in zoomed in or out
      if(this.camera.position.z < 7.2) {
        this.camera.position.z += 0.0075;
      }
      //Update click counter to reset work item interaction
      if(this.clickCounter > 0) {
        this.clickCounter -= 0.05;
        this.updateWorkBlur(this.workElement);
      }
      knot.rotation.x += 0.005;
      knot.rotation.y += 0.004;
      controls.update();
      this.renderer.render(this.scene, this.camera);
      this.frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', this.onResize);

    controls.addEventListener('change', () => {
      this.onZoomChange();
    });

    el.addEventListener('click', () => {
      this.onClick();
    });
  }

  //TODO add comments to method
  onZoomChange(): void {
    const educationElement = document.getElementById('education-link') as HTMLDivElement | null;
    if (educationElement && this.camera.position.z < 0.7) {
      this.isEducationValid = true;
      educationElement.classList.remove('static-waving-blur');
      educationElement.classList.add('valid-project-item');
      educationElement.style.filter = 'none';
    } else if (educationElement && !this.isEducationValid && this.camera.position.z < 7.2) {
      educationElement.classList.remove('static-waving-blur');
      educationElement.style.filter = 'blur(' + this.camera.position.z + 'px) brightness(' + 7.2 / this.camera.position.z * 100 + '%)';
    } else if(!this.isEducationValid) {
      educationElement?.classList.add('static-waving-blur');
    }
  }

  onClick(): void {
    if (this.workElement && this.clickCounter >= this.clickGoal) {
      this.isWorkValid = true;
      this.workElement.classList.remove('static-waving-blur');
      this.workElement.classList.add('valid-project-item');
      this.workElement.style.filter = 'none';
    } else if (this.workElement && !this.isWorkValid && this.clickCounter < this.clickGoal) {
      if(this.clickCounter < 1 && this.clickCounter > 0) {
        this.clickCounter = 0;
      } else {
        this.clickCounter += 1;
        this.workElement.classList.remove('static-waving-blur');
        this.updateWorkBlur(this.workElement);
      }
    } else if(!this.isWorkValid) {
      this.workElement?.classList.add('static-waving-blur');
    }
  }

  onResize = () => {
    console.log('resize event');
    const el = this.container.nativeElement;
    this.camera.aspect = el.clientWidth / el.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(el.clientWidth, el.clientHeight);
  };

  private updateWorkBlur(workElement: HTMLDivElement | null) {
    if (workElement) {
      workElement.style.filter = 'blur(' + (1 - this.clickCounter / this.clickGoal) * 8 + 'px) brightness(' + this.clickCounter / this.clickGoal * 100 + '%)';
    }
  }

  ngOnDestroy(): void {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onResize);
    if (this.renderer) this.renderer.dispose();
  }

  skipInteraction() {
    this.isEducationValid = true;
    this.validateElement(this.educationElement);
    this.isWorkValid = true;
    this.validateElement(this.workElement);
    this.isProjectsValid = true;
    this.validateElement(this.projectsElement);
    this.isInchiostroValid = true;
    this.validateElement(this.inchiostroElement);
    this.isPassionsValid = true;
    this.validateElement(this.passionsElement);
  }

  validateElement(element: HTMLDivElement | null): void {
    element?.classList.remove('static-waving-blur');
    element?.classList.add('valid-project-item');
    element? element.style =  '""' : '';
  }

}
