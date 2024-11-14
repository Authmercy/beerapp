export interface Boisson {
    id: number;
    nomBoisson: string;
    quantite: number;
    prix_sans_bonus: number;
    prix_avec_bonus: number;
    prix: number,
    categorieId: Categorie;
  }
  
  
  export interface Categorie {
    id: number;
    nomCat: string;
    boissons: Boisson[];
  
  }
   
  export interface Type {
    id: number;
    nom: string;
    categories: Categorie[];
  }
  
  export interface Facture {
    id: number;
    client: Client;
    date: Date;
    boissons: Boisson[];
    total: number;
    montantVerse: number;
    montantRembourse: number;
    montantNet: number;
    paye: boolean;
    bonus: boolean
  }
  
  export interface Client {
    id: number;
    nom: string;
    tel: string;
    address:string;
    email: string
    factures: Facture[];
    detteTotale: number;
  }
  
  export interface Fournisseur {
    id: number;
    nom: string;
    tel: string;
    address:string;
    email: string
   
  }
  