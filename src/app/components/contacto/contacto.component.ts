import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  punto = {
           title:"",
           position: {
                      lat: 0,
                      lng: 0,
            },
           label: {
                      color:"",
                      text: ""
            }
          }

    
  constructor() {
    this.dibujarPunto();

   }

  ngOnInit(): void {
  }

  dibujarPunto(){
    this.punto.position.lat = -34.596329;
    this.punto.position.lng = -58.3794843;
    this.punto.label.text = "Sede Central";
    this.punto.label.color = "blue";
    this.punto.title="Sede Central";
    }
   
 

}
