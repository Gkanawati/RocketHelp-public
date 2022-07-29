import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VStack , Text, HStack, useTheme, ScrollView, Box } from 'native-base';
// components
import { Header } from '../Components/Header';
import { OrderProps } from '../Components/Order';
// firebase
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
// utils
import dateFormat from '../utils/firestoreDateFormate';
import Loading from '../Components/Loading';
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from 'phosphor-react-native';
import { CardDetails } from '../Components/CardDetails';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

type RouteParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {

    const navigation = useNavigation();

    const route = useRoute();
    const { orderId } = route.params as RouteParams;
    const { colors } = useTheme();

    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
    const [loading, setLoading] = useState(true);
    const [solution, setSolution] = useState('');

    function handleOrderClose() {
      if(!solution) {
        return Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação.');
      }

      firestore().collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closedAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada.')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação.')
      })

    }

    useEffect(() => {

      firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, createdAt, closedAt, solution } = doc.data();

        const closed = closedAt ? dateFormat(closedAt) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(createdAt),
          closed
        })
        
        console.log({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(createdAt),
          closed
        })

        setLoading(false);

      })

    }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} bg="gray.700" >

          <Box px={6} bg='gray.600' pt={0}>
           <Header title='Solicitação' />
          </Box>

          {loading 
          ? <Loading />
          : 
          <>
            <HStack bg='gray.500' justifyContent='center' p={4}>
              {
                order.status === 'closed'
                ? <CircleWavyCheck size={22} color={colors.green[300]} />
                : <Hourglass size={22} color={colors.secondary[700]} />
              }

              <Text
                fontSize='sm'
                color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                ml={2}
                textTransform='uppercase'
              >
                {
                  order.status === 'closed' 
                  ? 'Finalizado' 
                  : ' Em andamento'
                }
              </Text>

            </HStack>
          

            <ScrollView 
              mx={5}
              showsVerticalScrollIndicator={false}
            >
              <CardDetails 
                title='Equipamento'
                description={`Patrimônio ${order.patrimony}`}
                icon={DesktopTower}
              />

              <CardDetails 
                title='Descrição do problema'
                description={order.description}
                icon={ClipboardText}
                footer={`Registrado em ${order.when}`}
              />

              <CardDetails 
                title='Solução'
                description={order.solution}
                icon={CircleWavyCheck}
                footer={order.closed && `Encerrado em ${order.closed}`}
              >
                {
                  order.status === 'open' && 
                    <Input
                    bg='gray.500'
                    placeholder='Descrição da solução'
                    onChangeText={setSolution}
                    textAlignVertical="top"
                    multiline
                    h={24}
                />
                }
                
              </CardDetails>
            </ScrollView>

            {
              order.status === 'open' && 
              <Button 
                title='Encerrar solicitação'
                onPress={handleOrderClose}
                m={5}
              />
            }
          </>
        }

      </VStack>
    </TouchableWithoutFeedback>
  );
}