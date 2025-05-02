import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabs: undefined;
  Restaurant: { id: string };
  Cart: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default Stack; 