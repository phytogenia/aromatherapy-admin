import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Oil} from "../../models/oil.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DocumentChangeAction, DocumentReference} from "@angular/fire/compat/firestore/interfaces";
import {DomainType, OilDomain} from "../../models/domain.model";
import {data} from "autoprefixer";
import {forEach} from "ag-grid-community/dist/lib/utils/array";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class OilService {

  constructor(private firestore: AngularFirestore) {
  }


  getOils(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection('oils').get();

  }

  getOilById(oilId: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      'oils').doc(`${oilId}`)
      .get();
  }

  getOilDetailByID(oilId: string): Observable<QuerySnapshot<any>> {
    return this.firestore.collection(
      'oilsDomains', (ref) => ref.where('oilId', '==', `${oilId}`))
      .get();
  }

  async createOil(oil: Oil, oilDomains: OilDomain[]): Promise<void> {
    //TODO:: rebase with await only
    return await this.firestore.collection('oils').add({...oil}).then(data => {
      const oilsDomains = oilDomains.map((obj) => {
        return Object.assign({}, obj)
      });
      for (let oilDomain of oilsDomains) {
        this.createOilDetail(oilDomain, data.id).then(data2 => {
          console.log(data2)
        })
      }
    });
  }

  async createOilDetail(oilDetail: OilDomain, oilId: string): Promise<DocumentReference<any>> {
    oilDetail.oilId = oilId;
    return await this.firestore.collection('oilsDomains').add(oilDetail);
  }


  async updateOil(oil: Oil): Promise<void> {
    delete oil.id;
    return await this.firestore.doc('oils/' + oil.id).update(oil);
  }

  async deleteOil(oilId: string): Promise<void> {
    return await this.firestore.doc('oils/' + oilId).delete();
  }

}