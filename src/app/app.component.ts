import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { UnitComponent } from './unit/unit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TitleComponent, UnitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ggj-2024';
  select = 0;
  select2 = 0;
  assets = ['💩', '🤡', '🎃', '👻', '😹', '🍎', '🍔'];
  player1Assets: string[] = new Array(3)
    .fill(0)
    .map((_, i) => this.assets[Math.floor(Math.random() * this.assets.length)]);

  player2Assets: string[] = new Array(3)
    .fill(0)
    .map((_, i) => this.assets[Math.floor(Math.random() * this.assets.length)]);

  tryAssets: string[] = [];
  tryAssets2: string[] = [];

  health1 = 100;
  health2 = 100;
  startText = 'READY';
  humanPlaying = true;
  damageScore1 = 0;
  damageScore2 = 0;

  ngOnInit(): void {
    console.log('player2Assets', this.player2Assets);

    setTimeout(() => {
      this.startText = 'FIGHT';
      setTimeout(() => {
        this.startText = '';
      }, 1000);
    }, 1000);
  }

  tryAsset1: string | null = null;
  tryAsset2: string | null = null;

  @HostListener('window:keydown', ['$event']) keyDown(event: KeyboardEvent) {
    if (this.humanPlaying) {
      if (event.code === 'Space') {
        const selectedAsset = this.assets[this.select];
        this.tryAssets.push(selectedAsset);
        this.tryAsset1 = selectedAsset;
        setTimeout(() => (this.tryAsset1 = null), 500);
        if (this.tryAssets.length === 3) {
          this.damageScore2 = this.calculateDamageScore(
            this.player2Assets,
            this.tryAssets
          );

          var audio = new Audio(
            this.damageScore2 ? 'assets/laugh.m4a' : 'assets/lame2.m4a'
          );
          audio.play();

          this.health2 -= this.damageScore2;
          if (this.health2 <= 0) {
            this.killed();
          }

          setTimeout(() => (this.damageScore2 = 0), 2000);
        }
      }

      if (event.key === 'ArrowLeft') {
        if (this.select > 0) {
          this.select--;
        }
      } else if (event.key === 'ArrowRight') {
        if (this.select < 6) {
          this.select++;
        }
      }
    }
    // console.log('select', this.select);

    if (this.tryAssets.length >= 3) {
      // console.log('next round');

      setTimeout(() => {
        this.completeRound();
        if (!this.humanPlaying) {
          if (this.health2 >= 0) {
            this.enemyRound();
          } else {
            alert('you win !!!');
          }
        }
      }, 1500);
    }
  }

  completeRound() {
    this.select2 = 0;
    this.select = 0;
    this.humanPlaying = !this.humanPlaying;
    this.tryAssets = [];
    this.tryAssets2 = [];
  }
  calculateDamageScore(checkAssets: string[], tryAssets: string[]): number {
    if (
      tryAssets.map((a) => a).join('') === checkAssets.map((a) => a).join('')
    ) {
      console.log('perfect');

      return 100;
    }

    if (
      checkAssets.some((a, index) =>
        tryAssets.find((b, index2) => b === a && index === index2)
      )
    ) {
      console.log('found match');
      return 20;
    }

    if (checkAssets.some((a) => tryAssets.includes(a))) {
      console.log('includes');
      return 10;
    }

    return 0;
  }

  move = (randomIndex: number) => {
    setTimeout(() => {
      // console.log('randomIndex', randomIndex, this.select2);
      if (this.select2 !== randomIndex) {
        this.select2 =
          this.select2 < randomIndex ? this.select2 + 1 : this.select2 - 1;
        this.move(randomIndex);
      } else {
        const selectedAsset = this.assets[this.select2];
        this.tryAssets2.push(selectedAsset);

        this.tryAsset2 = selectedAsset;
        setTimeout(() => (this.tryAsset2 = null), 500);
        if (this.tryAssets2.length === 3) {
          this.damageScore1 = this.calculateDamageScore(
            this.player1Assets,
            this.tryAssets2
          );

          this.health1 -= this.damageScore1;
          var audio = new Audio(
            this.damageScore1 ? 'assets/laugh2.m4a' : 'assets/lame.m4a'
          );
          audio.play();

          if (this.health1 <= 0) {
            this.killed();
          }

          setTimeout(() => (this.damageScore1 = 0), 2000);
        }

        if (this.tryAssets2.length < 3) {
          setTimeout(() => this.enemyRound(), 1000);
        } else {
          setTimeout(() => {
            this.completeRound();
          }, 1500);
        }
      }
    }, 300);
  };

  killed() {
    setTimeout(() => {
      var audio = new Audio('assets/ko.m4a');
      audio.play();
    }, 1000);
  }

  enemyRound = () => {
    const randomIndex = Math.floor(Math.random() * this.assets.length);
    this.move(randomIndex);
  };
}
