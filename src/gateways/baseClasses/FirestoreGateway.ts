/**
 * @packageDocumentation
 * @module Gateways
 */

 import { CollectionReference, Firestore } from '@google-cloud/firestore';
 import { ILogger } from '../../context/interfaces';

 export default abstract class FirestoreGateway {
    protected collection?: CollectionReference;
    protected db: Firestore;
    protected logger: ILogger;

    constructor(config: FirebaseFirestore.Settings, logger: ILogger) {
        this.db = new Firestore(config);
        this.logger = logger;
    }
 }
