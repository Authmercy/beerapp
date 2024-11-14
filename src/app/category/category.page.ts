import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CatbdService } from 'src/app/service/catbd.service';
import { Categorie } from '../service/models.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categories: Categorie[] = [];
  selectedCategorie!: Categorie;
  categorie: Categorie = {} as Categorie; 
  pending: boolean = false;
  isOpenForm: boolean = false;

  constructor(
    private categorieDbService: CatbdService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    
    this.categories = await this.categorieDbService.getCategories();
   
    console.log(this.categories)

  }

  onAddCategorie() {
    this.categorie = {} as Categorie;
    this.isOpenForm = true;
  }

  onCancel() {
    this.isOpenForm = false;
  }

  async openActionSheet(categorie: Categorie) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => this.editCategorie(categorie),
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () =>{console.log("Attempting to delete categorie with ID:", categorie.id);
             this.deleteCategorie(categorie.id)}
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

  editCategorie(categorie: Categorie) {
    this.categorie = { ...categorie }; 
    this.isOpenForm = true;
  }

  async saveCategorie() {
    if (!this.categorie.nomCat ) {

      console.log("Categorie data is incomplete");
      return;
    }
    if (this.categorie.id) {
      await this.categorieDbService.updateCategorie(this.categorie); 
    } else {
      console.log(this.categorie); 
      await this.categorieDbService.addCategorie(this.categorie); 
    }
    this.loadCategories(); 
    this.onCancel(); 
  }
  
  deleteCategorie(id: number) {
    console.log('Categorie ID to be deleted:', id); 
    this.categorieDbService.deleteCategorie(id);
  }
  

  onSearchChange(ev: any) {
    const searchTerm: string = ev.detail.value.toLowerCase();
    this.loadCategories().then(() => {
      this.categories = this.categories.filter(categorie => 
        categorie.nomCat.toLowerCase().includes(searchTerm)
      );
    });
  }
}