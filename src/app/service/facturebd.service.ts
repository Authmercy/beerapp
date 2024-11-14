import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Facture } from './models.model';

@Injectable({
  providedIn: 'root'
})
export class FacturebdService {

  private _storage: Storage | null = null;
  private factures: Facture[] = [];
  constructor(private storage: Storage) {
    this._storage = storage;
    this._storage.create();
    this._storage.defineDriver(CordovaSQLiteDriver);  
  }
  
  // Get Add factures
  async addFacture(facture: Facture) {
    const id = Date.now();
    facture.id = id;
    await this._storage?.set(id.toString(), facture);
    this.factures.push(facture);
  }
  

  // Get all factures
  async getFactures(): Promise<Facture[]> {
    const factures: Facture[] = [];
    await this._storage?.forEach((value, key) => {
      factures.push(value);
    });
    console.log("Retrieved factures:", factures); 
    return factures;
  }
  

  // Update a facture
  async updateFacture(updatedFacture: Facture) {
    await this._storage?.set(updatedFacture.id.toString(), updatedFacture); 
  }

  // Delete a facture
  async deleteFacture(id: number) {
    if (id === undefined || id === null) {
      console.error("Invalid ID for deletion:", id);
      return; 
    }
    await this._storage?.remove(id.toString());
    console.log(`Facture with ID ${id} deleted successfully.`);
  }
  
  
}