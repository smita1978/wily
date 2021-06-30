import React from 'react';
import { Text, View , TouchableOpacity, StyleSheet , TextInput,Image} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scanBookID:'',
      buttonState:'normal',
      scanStudentID:''
    }
  }

  getCameraPermissions=async(ID)=>{
    const {status}= await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status==="granted",
      scanned:false, 
      buttonState:ID
    });
  }

  handleBarcodeScanned=async({type,data})=>{
const {buttonState} = this .state

if(buttonState==="BookId"){
  this.setState({
    scanned: true,
    scanBookId: data,
    buttonState: 'normal'
  });
}
else if(buttonState==="StudentId"){
  this.setState({
    scanned: true,
    scanStudentId: data,
    buttonState: 'normal'
  });

    }
  }

    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==='clicked' && hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}/>
        )
      }else if(buttonState==='normal'){
        return(
          <View style={styles.container}>
            <View>
              <Image source={require('../assets/book.png')} 
              style={{width:200,height:200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
            
            </View>
            
            <View style={styles.inputView}>
              <TextInput style={styles.inputBox}
              placeholder="Book ID" ></TextInput>
              <TouchableOpacity style={styles.scanButton}
              onPress={()=>{this.getCameraPermissions("bookID")}} >
                <Text style={styles.buttonText}>SCAN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <TextInput style={styles.inputBox}
              placeholder="Student ID" ></TextInput>
              <TouchableOpacity style={styles.scanButton}
              onPress={()=>{this.getCameraPermissions("studentID")}}>
                <Text style={styles.buttonText}>SCAN</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.displayText}>
          {hasCameraPermissions===true?this.state.scanData:"REQUEST CAMERA PERMISSIONS"}
          </Text>
          <TouchableOpacity style={styles.scanButton}
          onPress={this.getCameraPermissions}>
            <Text style={styles.buttonText}>SCAN QR CODE</Text>
          </TouchableOpacity>
        </View>
      );
    }
}
const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    displayText:{ fontSize: 15, textDecorationLine: 'underline' }, 
    scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 },
    buttonText:{ fontSize: 20, },
    inputView:{ flexDirection: 'row', margin: 20 },
    inputBox:{ width: 200, height: 40, borderWidth: 1.5, borderRightWidth: 0, fontSize: 20 },
    scanButton:{ backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0 }
});