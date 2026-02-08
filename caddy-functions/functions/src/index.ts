import * as admin from "firebase-admin";
import { logger } from "firebase-functions";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

admin.initializeApp();

export const onRatingCreated = onDocumentCreated("ratings/{ratingId}", async (event) => {
const snap = event.data;

if (!snap) {
logger.error("No data in rating document");
return;
}

const ratingData = snap.data();
const providerId = ratingData.providerId;

logger.info('New rating for provider:', providerId, ratingData.rating);

// Get provider data ONCE
const providerDoc = await admin.firestore()
.collection('users')
.doc(providerId)
.get();

if (!providerDoc.exists) {
logger.info('Provider not found:', providerId);
return;
}

// Extract provider info ONCE - NO REDECLARATION
const providerData = providerDoc.data();
const fcmToken = providerData?.fcmToken;
const providerEmail = providerData?.email;

// Push notification
if (fcmToken) {
const message = {
notification: {
title: `New Rating! ${ratingData.rating}⭐`,
body: `You received a ${ratingData.rating}/5 star rating`,
},
token: fcmToken,
};

try {
await admin.messaging().send(message);
logger.info('✅ Push sent successfully to:', providerId);
} catch (error) {
logger.error('❌ Push error:', error);
}
} else {
logger.info('No FCM token for provider:', providerId);
}

// Email notification LOG (Phase 5)
if (providerEmail) {
logger.info(`📧 Email queued for ${providerEmail}: ${ratingData.rating}⭐ at ${ratingData.timestamp}`);
} else {
logger.info('No email for provider:', providerId);
}
});
