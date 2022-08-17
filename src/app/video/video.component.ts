import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  toggleVideo() {
  this.videoplayer.nativeElement.play();
}
}
