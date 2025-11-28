import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Technology {
  name: string;
  icon: string; // SVG icon path or name
}

@Component({
  selector: 'app-software-engineer',
  templateUrl: './software-engineer.component.html',
  styleUrls: ['./software-engineer.component.scss'],
  standalone: false
})
export class SoftwareEngineerComponent {
  description = 'Developed and maintained full-stack applications using modern web technologies. Collaborated with cross-functional teams to deliver high-quality software solutions. Implemented CI/CD pipelines and version control best practices.';

  technologies: Technology[] = [
    { name: 'Angular', icon: 'angular' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'HTML5', icon: 'html' },
    { name: 'CSS3', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'Git', icon: 'git' },
    { name: 'Azure DevOps', icon: 'azure-devops' }
  ];

  githubUrl = 'https://github.com/GiorgioBianchiVR';

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  openGithub(): void {
    window.open(this.githubUrl, '_blank');
  }
}
