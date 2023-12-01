import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { EmpleadosService } from './services/empleados/empleados.service';
import { EmpresasService } from './services/empresas/empresas.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;

  empleadosForm!: FormGroup;
  empresasForm!: FormGroup;
  empresas: any;
  empleados: any;


  constructor(
    public fb: FormBuilder,
    public empleadosService: EmpleadosService,
    public empresasService: EmpresasService
  ) {

  }
  ngOnInit(): void {

    this.empleadosForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      empresa: ['', Validators.required],
    });

    this.empresasForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/[0-9]{7,8}-[0-9Kk]{1}/)]],
      telefono: ['', [Validators.pattern(/\+?[0-9]{6,12}/)]],
    });

    
    this.empresasService.getAllEmpresas().subscribe(resp=>{
      this.empresas = resp;
    },
    error => {console.error(error)}
    );

    this.empleadosService.getAllEmpleados().subscribe(resp=>{
      this.empleados = resp;
    },
    error=> {console.error(error)}
    );
    

  }

  guardarEmpleados():void{
    //console.log(this.empleadosForm.value);
    this.empleadosService.saveEmpleados(this.empleadosForm.value).subscribe(resp=>{
      this.empleadosForm.reset();
      this.empleados.push(resp);
    },
      error => { console.error(error);}
      
    );
  }

  guardarEmpresas():void{
    this.empresasService.saveEmpresas(this.empresasForm.value).subscribe(resp=>{
      this.empresasForm.reset();
      this.empresas.push(resp);
    },
      error => { console.error(error);}
      
    );
  }

}
