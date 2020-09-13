import { Injectable } from '@angular/core';
import { Client, GetThreadReply, Identity, PrivateKey, UserAuth } from '@textile/hub';
// import { Client } from '@textile/threads-client';
import { Buffer } from 'buffer';
import { Observable, of } from 'rxjs';
import { map, publishReplay, refCount, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HubClientService {
  /** The users unique pki identity */
  id$: Observable<PrivateKey>

  /** The Hub API authentication */
  client$: Observable<Client>

  constructor() { 
    this.id$ = this.getIdentity().pipe(
      publishReplay(1),refCount()
    );
    this.client$ = this.login().pipe(
      publishReplay(1), refCount()
    );
  }

  get publicKeyIdentity(): Observable<string> {
    return this.id$.pipe(map((id) => id.public.toString()));
  }

  getIdentity(): Observable<PrivateKey> {
    const storedIdent = localStorage.getItem('identity')
    if (storedIdent !== null) 
      return of(PrivateKey.fromString(storedIdent))
    
    return of(PrivateKey.fromRandom()).pipe(
      tap(identity => localStorage.setItem('identity', identity.toString()))
    )
  }

  sign(buf: Buffer): Observable<Uint8Array> {
    return this.id$.pipe(
      switchMap(id => id.sign(buf))
    )
  }

  login(): Observable<Client> {
    return this.id$.pipe(
      switchMap((id) => this.loginWithChallenge(id)),
      map((userAuth) => Client.withUserAuth(userAuth))
    )
  }

  loginWithChallenge(identity: Identity): Observable<UserAuth> {
    return Observable.create((observer) => {
      /** 
         * Configured for our development server
         * 
         * Note: this should be upgraded to wss for production environments.
         */
        const socketUrl = `ws://localhost:3001/ws/userauth`
        
        /** Initialize our websocket connection */
        const socket = new WebSocket(socketUrl)
  
        /** Wait for our socket to open successfully */
        socket.onopen = () => {
          /** Get public key string */
          const publicKey = identity.public.toString();
  
          /** Send a new token request */
          socket.send(JSON.stringify({
            pubkey: publicKey,
            type: 'token'
          })); 
  
          /** Listen for messages from the server */
          socket.onmessage = async (event) => {
            const data = JSON.parse(event.data)
            switch (data.type) {
              /** Error never happen :) */
              case 'error': {
                observer.error(data.value);
                break;
              }
              /** The server issued a new challenge */
              case 'challenge':{
                /** Convert the challenge json to a Buffer */
                const buf = Buffer.from(data.value)
                /** User our identity to sign the challenge */
                const signed = await identity.sign(buf)
                /** Send the signed challenge back to the server */
                socket.send(JSON.stringify({
                  type: 'challenge',
                  sig: Buffer.from(signed).toJSON()
                })); 
                break;
              }
              /** New token generated */
              case 'token': {
                observer.next(data.value)
                break;
              }
            }
          }
        }
    })
  }
}
