import { useEffect, useState } from 'react';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// components
import { Button } from '../Components/Button';
import { Filter } from '../Components/Filter';
import { Order, OrderProps } from '../Components/Order';
import Loading from '../Components/Loading';
// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// icons e svg
import Logo from '../assets/logo_secondary.svg';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
// utils
import dateFormat from '../utils/firestoreDateFormate';

export function Home() {
    
    const navigation = useNavigation();
    const {colors} = useTheme();

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [loading, setLoading] = useState(false);

    function handleOpenDetails(orderId: string) {
        navigation.navigate('Details', {orderId});
    }

    function handleLogout() {
        auth().signOut()
        .catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possível sair.')
        })
    }

    useEffect(() => {
        setLoading(true);
        
        const response = firestore().collection('orders')
        .where('status', '==', statusSelected)
        .onSnapshot((snapShot) => {
            const data = snapShot.docs.map(doc => {
                const {patrimony, description, status, createdAt} = doc.data();

                return {
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    when: dateFormat(createdAt)
                }
            })

            setOrders(data);
            setLoading(false);
        });
        
        return response;
    }, [statusSelected])


  return (
    <VStack flex={1} pb={6} bg='gray.700'>

        <HStack
            w="full"
            justifyContent="space-between"
            alignItems='center'
            bg="gray.600"
            pt={12}
            pb={5}
            px={6}
        >
            <Logo/> 

            <IconButton
                icon={<SignOut size={26} color={colors.gray[300]} />}
                onPress={handleLogout}
            />
        </HStack>

        <VStack flex={1} px={6}>

            <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
                <Heading color='gray.100'>
                    Solicitações
                </Heading>
                <Text color='gray.200'>
                    {orders.length}
                </Text>
            </HStack>

            <HStack space={3} mb={8}>
                <Filter 
                    title='em andamento'
                    type='open'
                    onPress={() => setStatusSelected('open')}
                    isActive={statusSelected === 'open'}
                />

                <Filter 
                    title='finalizados'
                    type='closed'
                    onPress={() => setStatusSelected('closed')}
                    isActive={statusSelected === 'closed'}
                />
            </HStack>

            {loading
             ? <Loading /> 
             : <FlatList 
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100,}}
                ListEmptyComponent={() => (
                    <Center>
                        <ChatTeardropText size={40} color={colors.gray[300]} />
                        <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                            Você ainda não possui {'\n'}
                            solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                        </Text>
                    </Center>
                )}
            />}
            

            <Button
                title='Nova Solicitação'
                onPress={() => navigation.navigate('Register')}
            />


        </VStack>
    </VStack>
  );
}