import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
})
export class UnitComponent implements OnChanges {
  constructor() {}

  @Input() damage: number = 0;
  @Input() height: number = 300;
  @Input() name: string = 'laffa-warrior';
  @Input() human = false;
  @Input() health: number = 100;
  // @Input() positionX = 0;
  @Input() select = 0;
  @Input() playing = false;

  // assets = ['emoji1', 'emoji2', 'emoji3', 'emoji4', 'emoji5'];
  @Input() tryAssets: string[] = [];
  @Input() assets = ['💩', '🤡', '🎃', '👻', '😹', '🍎', '🍔'];
  @Input() myAssets = new Array(3)
    .fill(0)
    .map((_, i) => this.assets[Math.floor(Math.random() * this.assets.length)]);

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('tryAssets', this.tryAssets, this.myAssets);
  }
}
