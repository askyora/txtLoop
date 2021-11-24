package com.loop_message;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class DirectSmsModule extends ReactContextBaseJavaModule {

    public DirectSmsModule(ReactApplicationContext reactContext) {
        super(reactContext); // required by React Native
    }

    @Override
    // getName is required to define the name of the module represented in
    // JavaScript
    public String getName() {
        return "DirectSms";
    }

    @ReactMethod
    public void sendDirectSms(String phoneNumber, String msg) {
        try {
            android.telephony.SmsManager smsManager = android.telephony.SmsManager.getDefault();
            smsManager.sendTextMessage(phoneNumber, null, msg, null, null);
        } catch (Exception ex) {
            System.out.println("couldn't send message.");
        }
    }
}