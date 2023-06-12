import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/httpService';
import { Constant } from 'src/config/constant';
import Recorder from 'recorder-js';

declare var MediaRecorder: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  blobFile: any;
  recordAudio;
  sendObj = {
    audio: this.blobFile
  };
  audioContext = new (AudioContext)({ sampleRate: 16000 });
  recorder = new Recorder(this.audioContext, {});
  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.setUpAudio();
    this.http.get(Constant.server_url + Constant.api.users).subscribe(data => {
      console.log("get total users ", data);
    }, error => {
      console.error("failed retriving users");
    })
  }

  setUpAudio() {
    this.recordAudio = () => {
      return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream, {
              mimeType: 'audio/webm',
              numberOfAudioChannels: 1,
              audioBitsPerSecond: 16000,
            });
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });

            const start = () => {
              mediaRecorder.start();
            };

            let audio;

            const stop = () => {
              return new Promise(resolve => {
                mediaRecorder.addEventListener('stop', () => {
                  const audioBlob = new Blob(audioChunks, { 'type': 'audio/wav; codecs=MS_PCM' });
                  const reader = new FileReader();
                  reader.readAsDataURL(audioBlob);
                  reader.addEventListener('load', () => {
                    const base64data = reader.result;
                    this.sendObj.audio = base64data;
                    // this.http.post('apiUrl', this.sendObj, httpOptions).subscribe(data => console.log(data));
                  }, false);


                  const audioUrl = URL.createObjectURL(audioBlob);
                  console.log('Audiourl', audioUrl);
                  audio = new Audio(audioUrl);
                  const play = () => {
                    audio.play();
                  };
                  resolve({ audioBlob, audioUrl, play, });
                  // resolve({ audioBlob, audioUrl, audio });
                });

                mediaRecorder.stop();
              });
            };
            resolve({ start, stop, audio });
          });
      });
    };
  }

  async startPlay() {
    this.recorder = await this.recordAudio();
    this.recorder.start();
  }

  async stopPlay() {
    const audio = await this.recorder.stop();
    audio.play();
  }

  async playAudio2() {
    //const audio = this.recorder.audio;
    const audio = await this.recorder.stop().audioBlob;

    console.log("audio ", audio);

    //audio.play();
  }

  async playAudio() {
    const audio = await this.recorder.stop();
    audio.play();
  }

}
