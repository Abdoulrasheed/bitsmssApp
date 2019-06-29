import * as React from 'react';
import { WebView } from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import { 
	ActivityIndicator, 
	StyleSheet, 
	View, 
	Text, 
	Platform,
	BackHandler
} from 'react-native';


export default class App extends React.Component {
	webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  MissingConnection() {
  	return (
	  	<View style={[styles.container]}>
	        <Text> No internet connection !</Text>
	    </View>
	    )
  }

  ActivityIndicatorLoadingView(){
  	return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  render() {
    return (
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}

        renderError={ this.MissingConnection }

        renderLoading={
        	() =>  <ActivityIndicator 
        				size="large" 
        				color="#0000ff" 
        				style={styles.ActivityIndicatorStyle} 
        			/>
        }

        startInLoadingState={true}

        source={{uri: 'http://demo.bitsmss.com/signin/index'}}

        ref={(webView) => { this.webView.ref = webView; }}

        onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}

       style={styles.WebViewStyle} 
      />
    );
  }
}

const styles = StyleSheet.create(
{

WebViewStyle:
{
   justifyContent: 'center',
   alignItems: 'center',
   flex:1,
   marginTop: (Platform.OS) === 'ios' ? 20 : 0
},

ActivityIndicatorStyle:{
	zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  
}
});