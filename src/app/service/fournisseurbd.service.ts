import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Injectable } from '@angular/core';
import { Fournisseur } from './models.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseurbdService {

  private _storage: Storage | null = null;
  private fournisseurs: Fournisseur[] = [];
  constructor(private storage: Storage) { 
    this._storage = storage;
    this._storage.create();
    this._storage.defineDriver(CordovaSQLiteDriver);   

  }
  // Get Add fournisseurs
  async addFournisseur(fournisseur: Fournisseur) {
    const id = Date.now();
    fournisseur.id = id;
    this.fournisseurs.push(fournisseur);
    await this._storage?.set(id.toString(), fournisseur); 
  }

  // Get all fournisseurs
  async getFournisseurs(): Promise<Fournisseur[]> {
    const fournisseurs: Fournisseur[] = [];
    await this._storage?.forEach((value, key) => {
      fournisseurs.push(value);
    });
    return fournisseurs;
  }

  // Update a fournisseur
  async updateFournisseur(updatedFournisseur: Fournisseur) {
    await this._storage?.set(updatedFournisseur.id.toString(), updatedFournisseur); 
  }

  // Delete a fournisseur
  async deleteFournisseur(id: number) {
    await this._storage?.remove(id.toString()); 
  }
}