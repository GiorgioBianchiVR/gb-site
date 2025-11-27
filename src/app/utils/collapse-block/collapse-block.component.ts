import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseService } from 'src/app/services/collapse.service';

@Component({
  selector: 'app-collapse-block',
  imports: [CommonModule],
  templateUrl: './collapse-block.component.html',
  styleUrl: './collapse-block.component.sass',
})
export class CollapseBlockComponent implements OnInit {
  expandedIndex: number | null = null;

  constructor(private collapseService: CollapseService) {}

  ngOnInit(): void {
    // Initialize with first item expanded (optional)
    // this.expandedIndex = 0;
  }

  get sections() {
    return this.collapseService.sections;
  }

  toggleCollapse(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }
}
