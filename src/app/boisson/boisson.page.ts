import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Boisson, Categorie } from 'src/app/service/models.model';
import { BoissonbdService } from 'src/app/service/boissonbd.service';
import { CatbdService } from 'src/app/service/catbd.service';
@Component({
  selector: 'app-boisson',
  templateUrl: './boisson.page.html',
  styleUrls: ['./boisson.page.scss'],
})
export class BoissonPage implements OnInit {

  boissons: Boisson[] = [];
  selectedBoisson!: Boisson;
  boisson: Boisson = {} as Boisson; 
  pending: boolean = false;
  isOpenForm: boolean = false;
  categories: Categorie[] = []
  constructor(
    private boissonDbService: BoissonbdService,
    private categorieDbService: CatbdService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadBoissons();
    this.loadCategories()
  }

  async loadBoissons() {
    this.boissons = await this.boissonDbService.getBoissons();  
    console.log(this.boissons)

  }
  async loadCategories() {
    // Assume you have a service to load categories, similar to boissons
    this.categories = await this.categorieDbService.getCategories();// Implement this method in your service
  }

  onAddBoisson() {
    this.boisson = {} as Boisson;
    this.isOpenForm = true;
  }

  onCancel() {
    this.isOpenForm = false;
  }

  async openActionSheet(boisson: Boisson) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => this.editBoisson(boisson),
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () =>{console.log("Attempting to delete boisson with ID:", boisson.id);
             this.deleteBoisson(boisson.id)}
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  editBoisson(boisson: Boisson) {
    this.boisson = { ...boisson }; 
    this.isOpenForm = true;
  }

  async saveBoisson() {
    if (!this.boisson.nomBoisson || !this.boisson.prix_sans_bonus) {

      console.log("Boisson data is incomplete");
      return;
    }
    if (this.boisson.id) {
      await this.boissonDbService.updateBoisson(this.boisson); 
    } else {
      console.log(this.boisson); 
      await this.boissonDbService.addBoisson(this.boisson); 
    }
    this.loadBoissons(); 
    this.onCancel(); 
  }
  
  deleteBoisson(id: number) {
    console.log('Boisson ID to be deleted:', id); 
    this.boissonDbService.deleteBoisson(id);
  }
  

  onSearchChange(ev: any) {
    const searchTerm: string = ev.detail.value.toLowerCase();
    this.loadBoissons().then(() => {
      this.boissons = this.boissons.filter(boisson => 
        boisson.nomBoisson.toLowerCase().includes(searchTerm)
      );
    });
  }
}