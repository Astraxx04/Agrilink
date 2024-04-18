import { View ,Text, TouchableOpacity} from "react-native";
import { useState,useEffect } from "react";
import {Image,StyleSheet ,SafeAreaView,ScrollView,TextInput} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// import { image } from "../../../backend/utils/cloudinary";


export default function SubmitDocument(){

    const [hasGalleryPermission,setHasGalleryPermission]=useState(null);
    const[aadhar,setAadhar]=useState(null);
    const[pan,setPan]=useState(null);
    const[profile,setProfile]=useState(null);
    const[name,setName]=useState('');
    const[address,setAddress]=useState('');
    const[phone,setPhone]=useState('');
    const navigation=useNavigation();
    
    useEffect(()=>{
        (async ()=>{
            const galleryStatus=await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status==='granted');
        })();
    },[]);

    function handleNameChange(name){
        setName(name);
    }

    function handlePhoneChange(phone){
        setPhone(phone);
    }
    function handleAddress(address){
        setAddress(address);
    }

    const AadharImage=async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        })

        if(!result.canceled){
            setAadhar(result.assets[0].uri);
           
        }
    };
    const PanImage=async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        })

        

        if(!result.canceled){
            setPan(result.assets[0].uri);
            
        }

        
    };
    const ProfileImage=async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        })

        

        if(!result.canceled){
            setProfile(result.assets[0].uri);
           
            
        }
    };

    async function PostDetail() {
        const formData = new FormData();
        formData.append('aadhar',{
            name:'aadhar',
            uri:aadhar,
            type:'image/jpg'
        });
        formData.append('pan',{
            name:'pan',
            uri:pan,
            type:'image/jpg'
        });
        formData.append('profile', {
            name:'profile',
            uri:profile,
            type:'image/jpg'
        });
        formData.append('name', name);
        formData.append('address', address);
        formData.append('phone', phone);

        console.log(formData);
    
        try {
            const res = await axios.post('http://172.16.50.43:5000/storeUserDetail', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);

            navigation.navigate('ViewDetails')
        } catch (err) {
            console.log(err);
        }


    }
    
    
    
    
        

    
    if(hasGalleryPermission===false){
        return <Text>No Access to Internal Storage</Text>
    }
   
    
 
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View>
            <Text style={styles.titleText}>Upload the Details</Text>
        </View>
        <View>
        <Text style={styles.label}>Name : </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={handleNameChange}
                    inputMode='text'
                />

       </View>    
       <View>
        <Text style={styles.label}>Address : </Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={handleAddress}
                    inputMode='text'
                />

       </View>    
       <View>
        <Text style={styles.label}>Phone : </Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={handlePhoneChange}
                    inputMode='text'
                />

       </View>       
        <View>
        
       <TouchableOpacity style={styles.button}
          onPress={() => {AadharImage()}}
        >
          <Text style={{color:'white'}}>Upload Aadhar </Text>
        </TouchableOpacity>

        {aadhar && <Image source={{uri:aadhar}} style={{width: '100%', height: 300}}/>}

        </View>


        <View>
        <TouchableOpacity style={styles.button}
          onPress={() => {PanImage()}}
        >
          <Text style={{color:'white',marginTop:'20px'}}>Upload Pan </Text>
        </TouchableOpacity>

        {pan && <Image source={{uri:pan}} style={{width: '100%', height: 300}}/>}
        </View>

        <View>
        <TouchableOpacity style={styles.button}
          onPress={() => {ProfileImage()}}
        >
          <Text style={{color:'white',marginTop:'20px'}}>Upload Profile </Text>
        </TouchableOpacity>

        {profile && <Image source={{uri:profile}} style={{width: '100%', height: 300}}/>}
        </View>

        <TouchableOpacity style={styles.button} onPress={PostDetail}>
                    <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding:20
    },
    formContainer: {
        width: '80%',
        marginBottom: 100
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 40,
        marginTop:40
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
    },
    modalButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        width: 100,
    },
    closeButton: {
        backgroundColor: 'red',
        width: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft:50
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100%',
        paddingHorizontal: 40,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        height: '50%',
    },
    modalText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    responseText: {
        fontSize: 24,
        paddingTop: 60,
        textTransform: 'capitalize',
    },
});

