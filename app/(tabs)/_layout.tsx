import { Tabs } from 'expo-router';

export default function TabLayout() {
return (
<Tabs>
<Tabs.Screen name="index" options={{ title: 'Rate Caddy' }} />
<Tabs.Screen name="provider" options={{ title: 'Dashboard' }} />
</Tabs>
);
}
