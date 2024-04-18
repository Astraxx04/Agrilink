import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';



export default function ViewDetails(){
  const navigation=useNavigation();
       
    
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
                <View style={styles.table}>
                    <Text style={styles.text}>Details of Banker</Text>
                    <DataTable>
                    
                        <DataTable.Row>
                            <DataTable.Cell>Banker Name :</DataTable.Cell> 
                            <DataTable.Cell>Ashish Gangwar</DataTable.Cell>
                        </DataTable.Row> 
                         <DataTable.Row style={{borderWidth:2,borderStyle:'solid',borderColor:'tomato',padding:2}}> 
                            <DataTable.Cell>Phone Number :</DataTable.Cell> 
                            <DataTable.Cell>7665174766 </DataTable.Cell>
                        </DataTable.Row>
                         <DataTable.Row> 
                            <DataTable.Cell>Email :</DataTable.Cell> 
                            <DataTable.Cell>erbhardwajanjali27@gmail.com</DataTable.Cell>
                        </DataTable.Row> 
                        <DataTable.Row> 
                            <DataTable.Cell>Location :</DataTable.Cell> 
                            <DataTable.Cell>Bengaluru</DataTable.Cell>
                        </DataTable.Row>
                       <DataTable.Row> 
                            <DataTable.Cell>Bank Name :</DataTable.Cell> 
                            <DataTable.Cell>Indian Bank</DataTable.Cell>
                        </DataTable.Row> 
                    
                        <DataTable.Row> 
                            <DataTable.Cell>Bank Location :</DataTable.Cell> 
                            <DataTable.Cell>Kundalahalli</DataTable.Cell>
                        </DataTable.Row> 
                        
                         
                        
                       
                    </DataTable> 
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('FarmersList')}}>
                <Text style={styles.buttonText}>See List of Farmers applied for Loan</Text>
            </TouchableOpacity>
            
        </View>
        
        
        
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        marginTop: 2,
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom:30
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    data: {
        fontSize: 16,
        marginBottom: 5,
        flex: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    table: {
        marginBottom: 20,
        marginTop: 60,
        
    },
    button: {
        backgroundColor: 'tomato',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        width: 200,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain' ,
        alignSelf: 'center',
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    tableHeader: { 
        backgroundColor: '#DCDCDC', 
    }, 
    price:{
        marginTop:10,
        borderWidth:3,
        borderColor:'tomato',
        borderStyle:'solid',
        padding:5
    }
});