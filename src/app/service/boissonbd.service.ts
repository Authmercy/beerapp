import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Boisson } from './models.model';
@Injectable({
  providedIn: 'root'
})
export class BoissonbdService {

  private _storage: Storage | null = null;
  private boissons: Boisson[] = [];
  constructor(private storage: Storage) {
    this._storage = storage;
    this._storage.create();
    this._storage.defineDriver(CordovaSQLiteDriver);  
  }
  
  // Get Add boissons
  async addBoisson(boisson: Boisson) {
    const id = Date.now();
    boisson.id = id;
    await this._storage?.set(id.toString(), boisson);
    this.boissons.push(boisson);
  }
  

  // Get all boissons
  async getBoissons(): Promise<Boisson[]> {
    const boissons: Boisson[] = [];
    await this._storage?.forEach((value, key) => {
      boissons.push(value);
    });
    console.log("Retrieved boissons:", boissons); 
    return boissons;
  }
  

  // Update a boisson
  async updateBoisson(updatedBoisson: Boisson) {
    await this._storage?.set(updatedBoisson.id.toString(), updatedBoisson); 
  }

  // Delete a boisson
  async deleteBoisson(id: number) {
    if (id === undefined || id === null) {
      console.error("Invalid ID for deletion:", id);
      return; 
    }
    await this._storage?.remove(id.toString());
    console.log(`Boisson with ID ${id} deleted successfully.`);
  }
  
  
}