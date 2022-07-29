import React, {useState} from 'react';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { VStack, Heading, Icon, useTheme, KeyboardAvoidingView, Text, HStack, } from 'native-base';
// components
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
// icons e svg
import Logo from '../assets/logo_primary.svg';
import {Envelope, Key, User} from 'phosphor-react-native';
// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignIn() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [login, setLogin] = useState(true);
    const {colors} = useTheme();

    function handleSignIn() {
        if (email === '' || password === '') {
            Alert.alert('Entrar', 'Informe email e senha.');
            return;
        }
        setLoading(true);
        setWrongPassword(false);

        auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.code);
            if (error.code === 'auth/user-not-found' ) {
                setWrongPassword(true);
                Keyboard.dismiss();
            };

            if (error.code === 'auth/invalid-email' ) {
               Alert.alert('Erro', 'Email ou senha inválido.');
            };

            if (error.code === 'auth/wrong-password' ) {
                setWrongPassword(true);
                Keyboard.dismiss();
            };

            setLoading(false);
        });
    }

    function handleSignUp(name, email, password) {
        if (email === '' || name === '' || password === '') {
             Alert.alert("Entrar", 'Preencha todos os campos corretamente',);
             return;
        }
        setLoading(true);

        auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid)
            .set({
                name,
                email,
                createdAt: new Date(),
            })
            .then(() => {
                return;
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
        })
        .catch(error => {
                console.log(error);
                setLoading(false);
        })
    }

    if(login) {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                h={{base: "400px",lg: "auto"}} 
                behavior={Platform.OS === "ios" ? "padding" : "height"} flex={1}  bg="gray.600" 
                >
                    <VStack  alignItems="center" px={8} pt={24} bg="gray.600">
                        
                        <Logo />

                        <Heading color="gray.100" fontSize='xl' mt={20} mb={6}>
                            Acesse sua conta 
                        </Heading>

                        <Input
                            placeholder='E-mail'
                            onChangeText={setEmail}
                            mb={4}
                            InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                        />

                        <Input 
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Senha'
                            InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                            secureTextEntry
                            mb={8}
                        />

                        <HStack w='full'>
                        {wrongPassword && <Text color='red.400' fontSize='sm' mt={-6} mb={6} >Email ou senha inválido</Text>}
                        </HStack>

                        <Button 
                            title='Entrar'
                            w='full'
                            onPress={handleSignIn}
                            isLoading={loading}
                        />

                        <Text fontSize='sm' color='coolGray.300' mt={6} onPress={() => setLogin(false)}>
                            Quero criar uma conta
                        </Text>
                        
                    </VStack>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
    return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                h={{base: "400px",lg: "auto"}} 
                behavior={Platform.OS === "ios" ? "padding" : "height"} flex={1}  bg="gray.600" 
                >
                        <VStack  alignItems="center" px={8} pt={24} bg="gray.600">
                        
                        <Logo />

                        <Heading color="gray.100" fontSize='xl' mt={20} mb={6}>
                            Acesse sua conta 
                        </Heading>

                        <Input
                            placeholder='Nome'
                            onChangeText={setName}
                            mb={4}
                            InputLeftElement={<Icon as={<User color={colors.gray[300]} />} ml={4} />}
                        />

                        <Input
                            placeholder='E-mail'
                            onChangeText={setEmail}
                            mb={4}
                            InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                        />

                        <Input 
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Senha'
                            InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                            secureTextEntry
                            mb={8}
                        />

                        <HStack w='full'>
                        {wrongPassword && <Text color='red.400' fontSize='sm' mt={-6} mb={6} >Email ou senha inválido</Text>}
                        </HStack>

                        <Button 
                            title='Cadastrar'
                            w='full'
                            onPress={() => handleSignUp(name, email, password)}
                            isLoading={loading}
                        />

                        <Text fontSize='sm' color='coolGray.300' mt={6} onPress={() => setLogin(true)}>
                            Já tenho uma conta
                        </Text>
                        
                        </VStack>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    
  
} 