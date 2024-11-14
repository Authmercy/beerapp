import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Categorie } from './models.model';
@Injectable({
  providedIn: 'root'
})
export class CatbdService {
  private _storage: Storage | null = null;
  private categories: Categorie[] = [];
  constructor(private storage: Storage) {
    this._storage = storage;
    this._storage.create();
    this._storage.defineDriver(CordovaSQLiteDriver);  
  }
  
  // Get Add categories
  async addCategorie(categorie: Categorie) {
    const id = Date.now();
    categorie.id = id;
    await this._storage?.set(id.toString(), categorie);
    this.categories.push(categorie);
  }
  

  // Get all categories
  async getCategories(): Promise<Categorie[]> {
    const categories: Categorie[] = [];
    await this._storage?.forEach((value, key) => {
      categories.push(value);
    });
    console.log("Retrieved categories:", categories); 
    return categories;
  }
  

  // Update a categorie
  async updateCategorie(updatedCategorie: Categorie) {
    await this._storage?.set(updatedCategorie.id.toString(), updatedCategorie); 
  }

  // Delete a categorie
  async deleteCategorie(id: number) {
    if (id === undefined || id === null) {
      console.error("Invalid ID for deletion:", id);
      return; 
    }
    await this._storage?.remove(id.toString());
    console.log(`Categorie with ID ${id} deleted successfully.`);
  }
}

