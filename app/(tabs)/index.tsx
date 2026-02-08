import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../firebaseConfig'; // We'll create this next

export default function RatingScreen() {
const [rating, setRating] = useState(0);
const [submitting, setSubmitting] = useState(false);

const submitRating = async () => {
if (rating === 0) return;

setSubmitting(true);
try {
await addDoc(collection(db, 'ratings'), {
rating: rating,
timestamp: serverTimestamp(),
clientId: 'test-client-123', // Replace with real auth later
providerId: 'test-provider-456'
});
alert(`Rating ${rating}⭐ submitted!`);
setRating(0);
} catch (error) {
alert('Error: ' + error.message);
}
setSubmitting(false);
};

return (
<View style={styles.container}>
<Text style={styles.title}>Rate Your Caddy</Text>
<Text style={styles.subtitle}>Tap a star (0-5)</Text>

<View style={styles.stars}>
{[1,2,3,4,5].map((star) => (
<TouchableOpacity key={star} onPress={() => setRating(star)}>
<Text style={[
styles.star,
{ color: star <= rating ? '#ffd700' : '#ccc' }
]}>
★
</Text>
</TouchableOpacity>
))}
</View>

<TouchableOpacity
style={[styles.button, rating === 0 && styles.buttonDisabled]}
onPress={submitRating}
disabled={rating === 0 || submitting}
>
<Text style={styles.buttonText}>
{submitting ? 'Submitting...' : `Submit ${rating}⭐`}
</Text>
</TouchableOpacity>

<Text style={styles.info}>Data saves to Firestore "ratings" collection</Text>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 40,
backgroundColor: '#f5f5f5'
},
title: {
fontSize: 28,
fontWeight: 'bold',
marginBottom: 10,
color: '#333'
},
subtitle: {
fontSize: 16,
color: '#666',
marginBottom: 30
},
stars: {
flexDirection: 'row',
marginBottom: 40
},
star: {
fontSize: 60,
marginHorizontal: 5
},
button: {
backgroundColor: '#1e90ff',
paddingHorizontal: 30,
paddingVertical: 15,
borderRadius: 25,
marginBottom: 20
},
buttonDisabled: {
backgroundColor: '#ccc'
},
buttonText: {
color: 'white',
fontSize: 18,
fontWeight: 'bold'
},
info: {
fontSize: 12,
color: '#888',
textAlign: 'center'
}
});
// test change
