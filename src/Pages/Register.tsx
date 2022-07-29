import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {  VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
// components
import { Button } from '../Components/Button';
import { Header } from '../Components/Header';
import { Input } from '../Components/Input';
// firebase
import firestore from '@react-native-firebase/firestore';

export function Register() {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  function handleNewOrder() {
    if(!patrimony || !description) {
      Alert.alert('Registrar', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    firestore().collection('orders')
    .add({
      patrimony: patrimony,
      description: description,
      status: 'open',
      createdAt: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      Alert.alert('Solicitação', 'Falha ao registrar a solicitação.')
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} p={6} bg="gray.600">
          <Header title='Nova solicitação' />

          <Input
              placeholder='Número do patrimônio'
              mt={5}
              value={patrimony}
              onChangeText={text => setPatrimony(text)}
          />

          <Input 
              placeholder='Descrição do problema'
              mt={5}
              flex={1}
              multiline
              textAlignVertical='top'
              value={description}
              onChangeText={text => setDescription(text)}
          />

          <Button
              title='Cadastrar'
              mt={5}
              onPress={handleNewOrder}
              isLoading={loading}
          />

      </VStack>
    </TouchableWithoutFeedback>
  );
}