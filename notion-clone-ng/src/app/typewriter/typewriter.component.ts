// In your component.ts file
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import Typed from 'typed.js';

@Component({
  standalone: true,
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.scss'],
})
export class TypewriterComponent implements OnInit, AfterViewInit {
  @ViewChild('typewriterElement')
  typewriterElement!: ElementRef;
  private typed: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options = {
      strings: ['🚀 Supercharged Productivity.', '🤖 AI-Powered Insights.'],
      typeSpeed: 75,
      backSpeed: 75,
      showCursor: true,
      cursorChar: '|',
      loop: true,
    };

    this.typed = new Typed(this.typewriterElement.nativeElement, options);
  }
}
