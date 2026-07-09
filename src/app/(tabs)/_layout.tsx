import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <Image 
            // !! Verifică dacă extensia este .png sau .jpg și numele corect al imaginii
            source={require('@/assets/images/homescreen/navbar.png')} 
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
        ),
      }}
    >
      {/* Primul ecran trebuie să se numească "index" */}
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Acasă',
          tabBarIcon: () => null,
        }}
      />
      
      <Tabs.Screen
        name="donatii"
        options={{
          title: 'Donații',
          tabBarIcon: () => null,
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profilul meu',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 30, 
    left: 25,
    right: 25,
    height: 80, 
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});
