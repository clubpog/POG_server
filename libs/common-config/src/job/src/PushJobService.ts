import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../../../../pog-adminsdk.json';

@Injectable()
export class PushJobService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  }

  async send(summonerId: string) {
    const message = {
      notification: {
        title: 'test',
        body: 'test',
      },
      topic: summonerId,
    };
    return Promise.all([await admin.messaging().send(message)]);
  }
}
