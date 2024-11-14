import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Client } from './models.model';
@Injectable({
  providedIn: 'root'
})
export class ClientbdService {

  private _storage: Storage | null = null;
  private clients: Client[] = [];
  constructor(private storage: Storage) {
    this._storage = storage;
    this._storage.create();
    this._storage.defineDriver(CordovaSQLiteDriver);  
  }
  
  // Get Add clients
  async addClient(client: Client) {
    const id = Date.now();
    client.id = id;
    await this._storage?.set(id.toString(), client);
    this.clients.push(client);
  }
  

  // Get all clients
  async getClients(): Promise<Client[]> {
    const clients: Client[] = [];
    await this._storage?.forEach((value, key) => {
      clients.push(value);
    });
    console.log("Retrieved clients:", clients); 
    return clients;
  }
  

  // Update a client
  async updateClient(updatedClient: Client) {
    await this._storage?.set(updatedClient.id.toString(), updatedClient); 
  }

  // Delete a client
  async deleteClient(id: number) {
    if (id === undefined || id === null) {
      console.error("Invalid ID for deletion:", id);
      return; 
    }
    await this._storage?.remove(id.toString());
    console.log(`Client with ID ${id} deleted successfully.`);
  }
  
  
}