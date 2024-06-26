import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: any; // Save logged in user data


  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user')!);
      }
    })

  }


  // Sign up with email/password
  /*SignUp(email: string, password: string): any {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /!* Call the SendVerificaitonMail() function when new user sign
        up and returns promise *!/
        SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }*/


  // Sign in with email/password
  signIn(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/stats']);
        this.SetUserData(result.user);

      }).catch((error) => {
        window.alert(error.message)
      })
  }


  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return sendEmailVerification(this.afAuth.currentUser)
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     })
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    return (localStorage.getItem('user') != null);
  }

  // Sign in with Google
  /*GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }*/

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth']);

    })
  }

  // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth.signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['stats']);
  //       })
  //       this.SetUserData(result.user);
  //     }).catch((error) => {
  //       window.alert(error)
  //     })
  // }


}
